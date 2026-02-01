"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { TeamMember, getTeamMemberByEmail } from "@/data/team";

interface AuthContextType {
  user: TeamMember | null;
  isLoading: boolean;
  login: (email: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      const member = getTeamMemberByEmail(storedEmail);
      if (member) {
        setUser(member);
      } else {
        localStorage.removeItem("user_email");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string): { success: boolean; error?: string } => {
    const member = getTeamMemberByEmail(email);
    if (member) {
      setUser(member);
      localStorage.setItem("user_email", email);
      return { success: true };
    }
    return { success: false, error: "Email not found in team directory" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_email");
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
