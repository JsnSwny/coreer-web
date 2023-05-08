import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const withGuest = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (user && !loading) {
        router.push("/");
      }
    }, [user, router]);

    if (loading) {
      return <h1>Loading GUEST...</h1>;
    }

    if (!user) {
      return <WrappedComponent {...props} />;
    }
  };

  return Wrapper;
};

export default withGuest;
