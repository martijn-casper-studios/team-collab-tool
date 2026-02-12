"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { TeamMember, getTeamMemberByEmail } from "@/data/team";

interface AuthUser {
  name: string;
  email: string;
  image?: string;
  teamMember: TeamMember | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  let user: AuthUser | null = null;

  if (session?.user?.email) {
    const teamMember = getTeamMemberByEmail(session.user.email) ?? null;
    user = {
      name: session.user.name ?? "Unknown",
      email: session.user.email,
      image: session.user.image ?? undefined,
      teamMember,
    };
  }

  const login = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const logout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
