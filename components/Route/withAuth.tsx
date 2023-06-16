import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login");
      }
    }, [loading, user, router]);

    // if (loading) {
    //   return <h1>LOADING</h1>;
    // }
    if (user) {
      if (!user.onboarded) {
        router.push("/onboarding/personal-details");
      } else {
        return <WrappedComponent {...props} />;
      }
    }
  };

  return Wrapper;
};

export default withAuth;
