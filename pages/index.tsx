import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../hooks/useAuthContext";
import Overlay from "../components/overlay";
import LoadingSpinner from "../components/loadingSpinner";

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

  return (
    <Overlay>
      <LoadingSpinner />
      <div className="mt-4 text-white">Booting app...</div>
    </Overlay>
  );
};

export default Home;
