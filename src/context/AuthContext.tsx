"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { TeamMember } from "@/data/team";

interface AuthUser {
  name: string;
  email: string;
  image?: string;
  teamMember: TeamMember | null;
  hasProfile: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: () => void;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const sessionLoading = status === "loading";
  const [demoUser, setDemoUser] = useState<AuthUser | null>(null);
  const [profileCheck, setProfileCheck] = useState<{
    checked: boolean;
    hasProfile: boolean;
    profile: TeamMember | null;
  }>({ checked: false, hasProfile: false, profile: null });

  // Auto-login as guest in development, or restore existing demo session
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("demo-user") : null;
    if (stored) {
      try {
        setDemoUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("demo-user");
      }
    } else if (process.env.NODE_ENV === "development" && !session?.user?.email && !sessionLoading) {
      // Auto-create guest user in dev mode
      const guest: AuthUser = {
        name: "Guest User",
        email: "guest@demo.local",
        image: undefined,
        teamMember: null,
        hasProfile: false,
      };
      localStorage.setItem("demo-user", JSON.stringify(guest));
      setDemoUser(guest);
    }
  }, [session?.user?.email, sessionLoading]);

  const activeEmail = session?.user?.email ?? demoUser?.email;

  useEffect(() => {
    if (activeEmail) {
      fetch("/api/me-public?email=" + encodeURIComponent(activeEmail))
        .then((res) => res.json())
        .then((data) => {
          setProfileCheck({
            checked: true,
            hasProfile: data.hasProfile ?? false,
            profile: data.profile ?? null,
          });
        })
        .catch(() => {
          setProfileCheck({ checked: true, hasProfile: false, profile: null });
        });
    } else if (!sessionLoading) {
      setProfileCheck({ checked: true, hasProfile: false, profile: null });
    }
  }, [activeEmail, sessionLoading]);

  const isLoading = sessionLoading || (!!activeEmail && !profileCheck.checked);

  let user: AuthUser | null = null;

  if (session?.user?.email && profileCheck.checked) {
    user = {
      name: session.user.name ?? "Unknown",
      email: session.user.email,
      image: session.user.image ?? undefined,
      teamMember: profileCheck.profile,
      hasProfile: profileCheck.hasProfile,
    };
  } else if (demoUser && profileCheck.checked) {
    user = {
      ...demoUser,
      teamMember: profileCheck.profile,
      hasProfile: profileCheck.hasProfile,
    };
  }

  const login = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const loginAsGuest = () => {
    const guest: AuthUser = {
      name: "Guest User",
      email: "guest@demo.local",
      image: undefined,
      teamMember: null,
      hasProfile: false,
    };
    localStorage.setItem("demo-user", JSON.stringify(guest));
    setDemoUser(guest);
  };

  const logout = () => {
    if (demoUser) {
      localStorage.removeItem("demo-user");
      setDemoUser(null);
      setProfileCheck({ checked: true, hasProfile: false, profile: null });
      return;
    }
    signOut({ callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
