import { ReactNode, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../hooks/useAuthContext";

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

  // TODO: show loading animation while loading
  return <>{children}</>;
}
