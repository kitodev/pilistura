// @ts-nocheck
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabaseApi } from '@/api/supabaseClient';
import { supabase } from '@/lib/supabaseClient';

const AuthContext = createContext();
const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;
const LAST_ACTIVITY_KEY = "pilistura:last-activity";

const getSessionUser = (session) => {
  const sessionUser = session?.user;
  if (!sessionUser) return null;

  return {
    id: sessionUser.id,
    email: sessionUser.email,
    full_name: sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || sessionUser.email?.split("@")[0] || "",
    avatar_url: sessionUser.user_metadata?.avatar_url || null,
    raw_user_meta_data: sessionUser.user_metadata || {},
  };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  const checkUserAuth = useCallback(async () => {
    try {
      setAuthError(null);
      const currentUser = await supabaseApi.auth.me();
      setUser(currentUser);
      setIsAuthenticated(Boolean(currentUser));
    } catch (error) {
      console.error('User auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  }, []);

  const checkAppState = useCallback(async () => {
    try {
      setAuthError(null);
      setAppPublicSettings({ provider: 'supabase' });
      setIsLoadingPublicSettings(false);
      await checkUserAuth();
    } catch (error) {
      console.error('Unexpected error:', error);
      setAuthError({
        type: 'unknown',
        message: error.message || 'An unexpected error occurred'
      });
      setIsLoadingPublicSettings(false);
      setIsLoadingAuth(false);
      setUser(null);
      setIsAuthenticated(false);
      setAuthChecked(true);
    }
  }, [checkUserAuth]);

  useEffect(() => {
    checkAppState();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        setIsAuthenticated(false);
        setAuthChecked(true);
        return;
      }

      if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        const sessionUser = getSessionUser(session);
        setUser(sessionUser);
        setIsAuthenticated(Boolean(sessionUser));
        setAuthChecked(true);
      }
    });

    return () => subscription.subscription?.unsubscribe();
  }, [checkAppState]);

  const logout = useCallback(async (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(LAST_ACTIVITY_KEY);
    }
    await supabaseApi.auth.logout();
    if (shouldRedirect && typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated || typeof window === "undefined") return;

    let timeoutId;
    let lastRecordedActivity = 0;
    let logoutInProgress = false;

    const readLastActivity = () => {
      const stored = Number(window.localStorage.getItem(LAST_ACTIVITY_KEY));
      return Number.isFinite(stored) && stored > 0 ? stored : Date.now();
    };

    const expireSession = async () => {
      if (Date.now() - readLastActivity() < INACTIVITY_TIMEOUT_MS) {
        scheduleExpiry();
        return;
      }
      if (logoutInProgress) return;

      logoutInProgress = true;
      try {
        await logout(false);
      } finally {
        window.location.replace("/login?reason=inactivity");
      }
    };

    const scheduleExpiry = () => {
      window.clearTimeout(timeoutId);
      const remaining = Math.max(INACTIVITY_TIMEOUT_MS - (Date.now() - readLastActivity()), 0);
      timeoutId = window.setTimeout(expireSession, remaining);
    };

    const recordActivity = () => {
      const now = Date.now();
      if (now - lastRecordedActivity < 1000) return;

      lastRecordedActivity = now;
      window.localStorage.setItem(LAST_ACTIVITY_KEY, String(now));
      scheduleExpiry();
    };

    const handleStorage = (event) => {
      if (event.key === LAST_ACTIVITY_KEY && event.newValue) scheduleExpiry();
    };

    const handleVisibility = () => {
      if (!document.hidden) expireSession();
    };

    recordActivity();
    const activityEvents = ["pointerdown", "pointermove", "keydown", "scroll", "touchstart"];
    activityEvents.forEach((eventName) => window.addEventListener(eventName, recordActivity, { passive: true }));
    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearTimeout(timeoutId);
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, recordActivity));
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isAuthenticated, logout]);

  const navigateToLogin = () => {
    supabaseApi.auth.redirectToLogin(window.location.href);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
