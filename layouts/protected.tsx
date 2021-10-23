import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../hooks/useAuthContext";
import Overlay from "../components/overlay";
import LoadingSpinner from "../components/loadingSpinner";

interface Props {
  children: ReactNode;
}

export default function Protected({ children }: Props): JSX.Element {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!(loading || user)) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Overlay>
        <LoadingSpinner />
        <div className="mt-4 text-white">Booting app...</div>
      </Overlay>
    );
  }

  return <>{children}</>;
}
