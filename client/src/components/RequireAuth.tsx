import type { ReactNode } from "react";
import { Redirect } from "wouter";
import { isAuthenticated } from "@/lib/auth";

export default function RequireAuth({ children }: { children: ReactNode }) {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}
