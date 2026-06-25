"use client";

import type React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import UserNotRegisteredError from "@/components/UserNotRegisteredError";
import PrivacyConsent from "@/components/pilistura/PrivacyConsent";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { queryClientInstance } from "@/lib/query-client";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoadingAuth, isLoadingPublicSettings, authError } = useAuth() as any;

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
      </div>
    );
  }

  if (authError?.type === "user_not_registered") {
    return <UserNotRegisteredError />;
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <ScrollToTop />
        <AuthGate>{children}</AuthGate>
        <PrivacyConsent />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}
