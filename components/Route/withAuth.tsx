import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import React, { ComponentType, useEffect } from "react";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [loading, user, router]);
    if (loading) {
      return <h1>LOADING</h1>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
