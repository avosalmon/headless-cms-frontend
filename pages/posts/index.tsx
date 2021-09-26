import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useAuthContext } from "../../hooks/useAuthContext";

const Posts: NextPage = () => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!(loading || user)) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return <div>Posts</div>;
};

export default Posts;
