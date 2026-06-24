// @ts-nocheck
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useAuth } from "@/lib/AuthContext";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkUserAuth } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get("access_token") || searchParams.get("token");
    const fromUrl = searchParams.get("from_url") || "/";

    if (accessToken) {
      base44.auth.setToken(accessToken);
    }

    const finishLogin = async () => {
      try {
        if (accessToken) {
          await checkUserAuth();
        }
      } finally {
        const target = new URL(fromUrl, window.location.origin);
        const sameOrigin = target.origin === window.location.origin;
        navigate(sameOrigin ? `${target.pathname}${target.search}${target.hash}` : "/", { replace: true });
      }
    };

    finishLogin();
  }, [checkUserAuth, navigate, searchParams]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
    </div>
  );
}
