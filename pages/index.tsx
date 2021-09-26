import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const Home: NextPage = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) {
      router.push("/posts");
    } else {
      router.push("/login");
    }
  }, [user, loading, router]);

  return <p>Loading auth state...</p>;
};

export default Home;
