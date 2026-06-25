// @ts-nocheck
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function AuthCallback() {
  const router = useRouter();
  const { checkUserAuth } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const fromUrl = searchParams.get("from_url") || "/";

    const finishLogin = async () => {
      try {
        await checkUserAuth();
      } finally {
        const target = new URL(fromUrl, window.location.origin);
        const sameOrigin = target.origin === window.location.origin;
        router.replace(sameOrigin ? `${target.pathname}${target.search}${target.hash}` : "/");
      }
    };

    finishLogin();
  }, [checkUserAuth, router]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
    </div>
  );
}
