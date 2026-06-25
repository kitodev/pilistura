import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const TABLES = {
  UserProfile: "user_profiles",
  TrailCompletion: "trail_completions",
};

const createError = (error) => {
  if (!error) return null;
  const wrapped = new Error(error.message || "Supabase request failed");
  wrapped.status = error.status || error.code;
  wrapped.data = error;
  return wrapped;
};

const createConfigurationError = () => {
  const error = new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local, then restart the dev server.");
  error.status = "missing_supabase_config";
  return error;
};

const ensureSupabaseConfigured = () => {
  if (!isSupabaseConfigured) throw createConfigurationError();
};

const isMissingAuthSession = (error) =>
  error?.name === "AuthSessionMissingError" ||
  error?.message === "Auth session missing!" ||
  error?.code === "session_not_found";

const getUserMetadata = (user) => ({
  id: user.id,
  email: user.email,
  full_name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "",
  avatar_url: user.user_metadata?.avatar_url || null,
  raw_user_meta_data: user.user_metadata || {},
});

const applyQuery = (queryBuilder, query = {}) =>
  Object.entries(query || {}).reduce((builder, [key, value]) => builder.eq(key, value), queryBuilder);

const entityClient = (entityName) => {
  const table = TABLES[entityName] || entityName;

  return {
    async list(sort, limit, skip, fields = "*") {
      ensureSupabaseConfigured();
      let query = supabase.from(table).select(Array.isArray(fields) ? fields.join(",") : fields);
      if (sort) {
        const descending = sort.startsWith("-");
        query = query.order(descending ? sort.slice(1) : sort, { ascending: !descending });
      }
      if (typeof skip === "number" || typeof limit === "number") {
        const from = skip || 0;
        const to = typeof limit === "number" ? from + limit - 1 : undefined;
        if (typeof to === "number") query = query.range(from, to);
      }
      const { data, error } = await query;
      if (error) throw createError(error);
      return data || [];
    },
    async filter(query = {}, sort, limit, skip, fields = "*") {
      ensureSupabaseConfigured();
      let request = applyQuery(supabase.from(table).select(Array.isArray(fields) ? fields.join(",") : fields), query);
      if (sort) {
        const descending = sort.startsWith("-");
        request = request.order(descending ? sort.slice(1) : sort, { ascending: !descending });
      }
      if (typeof skip === "number" || typeof limit === "number") {
        const from = skip || 0;
        const to = typeof limit === "number" ? from + limit - 1 : undefined;
        if (typeof to === "number") request = request.range(from, to);
      }
      const { data, error } = await request;
      if (error) throw createError(error);
      return data || [];
    },
    async get(id) {
      ensureSupabaseConfigured();
      const { data, error } = await supabase.from(table).select("*").eq("id", id).single();
      if (error) throw createError(error);
      return data;
    },
    async create(data) {
      ensureSupabaseConfigured();
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user?.id;
      const payload = userId && !data.created_by_id ? { ...data, created_by_id: userId } : data;
      const { data: created, error } = await supabase.from(table).insert(payload).select("*").single();
      if (error) throw createError(error);
      return created;
    },
    async update(id, data) {
      ensureSupabaseConfigured();
      const { data: updated, error } = await supabase.from(table).update(data).eq("id", id).select("*").single();
      if (error) throw createError(error);
      return updated;
    },
    async delete(id) {
      ensureSupabaseConfigured();
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw createError(error);
      return null;
    },
  };
};

export const supabaseApi = {
  auth: {
    async me() {
      if (!isSupabaseConfigured) return null;
      const { data, error } = await supabase.auth.getUser();
      if (isMissingAuthSession(error)) return null;
      if (error) throw createError(error);
      return data.user ? getUserMetadata(data.user) : null;
    },
    async updateMe(data) {
      ensureSupabaseConfigured();
      const { data: updated, error } = await supabase.auth.updateUser({ data });
      if (error) throw createError(error);
      return updated.user ? getUserMetadata(updated.user) : null;
    },
    async loginViaEmailPassword(email, password) {
      ensureSupabaseConfigured();
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw createError(error);
      return data;
    },
    async loginWithProvider(provider, fromUrl = "/") {
      ensureSupabaseConfigured();
      const redirectTo = new URL("/auth/callback", window.location.origin);
      redirectTo.searchParams.set("from_url", new URL(fromUrl, window.location.origin).toString());
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: redirectTo.toString() },
      });
      if (error) throw createError(error);
    },
    async logout() {
      ensureSupabaseConfigured();
      const { error } = await supabase.auth.signOut();
      if (error) throw createError(error);
    },
    redirectToLogin(nextUrl) {
      const redirectUrl = nextUrl ? new URL(nextUrl, window.location.origin).toString() : window.location.href;
      window.location.href = `/login?from_url=${encodeURIComponent(redirectUrl)}`;
    },
    async register({ email, password, ...metadata }) {
      ensureSupabaseConfigured();
      const redirectTo = new URL("/auth/callback", window.location.origin).toString();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata, emailRedirectTo: redirectTo },
      });
      if (error) throw createError(error);
      return data;
    },
    async verifyOtp({ email, otpCode }) {
      ensureSupabaseConfigured();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: "signup",
      });
      if (error) throw createError(error);
      return data;
    },
    async resendOtp(email) {
      ensureSupabaseConfigured();
      const { data, error } = await supabase.auth.resend({ type: "signup", email });
      if (error) throw createError(error);
      return data;
    },
    async resetPasswordRequest(email) {
      ensureSupabaseConfigured();
      const redirectTo = new URL("/reset-password", window.location.origin).toString();
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw createError(error);
      return data;
    },
    async resetPassword({ newPassword }) {
      ensureSupabaseConfigured();
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw createError(error);
      return data;
    },
  },
  entities: new Proxy(
    {},
    {
      get(_target, entityName) {
        if (typeof entityName !== "string" || entityName === "then") return undefined;
        return entityClient(entityName);
      },
    },
  ),
};
