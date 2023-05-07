import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import React, { ComponentType, useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log("WITH AUTH");
      if (!loading && !user) {
        router.push("/login");
      }
    }, [loading, user, router]);
    if (loading) {
      return <h1>LOADING</h1>;
    }
    if (user) {
      console.log(user);
      if (!user.onboarded) {
        router.push("/onboarding/details");
      } else {
        return <WrappedComponent {...props} />;
      }
    }
  };

  return Wrapper;
};

export default withAuth;
