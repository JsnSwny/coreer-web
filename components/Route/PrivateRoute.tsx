import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React from "react";

interface PrivateRouteProps {
  component: React.ElementType;
  fallback: React.ElementType;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  fallback: Fallback,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/login");
    return <Fallback />;
  }

  return <Component />;
};
