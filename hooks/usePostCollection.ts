import { useEffect, useState } from "react";
import { getPosts } from "../libs/api/post";
import { PostCollection } from "../types/post";

interface UsePostCollection {
  posts: PostCollection | null;
  loading: boolean;
}

export default function usePostCollection(): UsePostCollection {
  const [posts, setPosts] = useState<PostCollection | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((posts) => setPosts(posts))
      .finally(() => setLoading(false));
  }, []);

  return {
    posts,
    loading,
  };
}
