import { useEffect, useState } from "react";
import { getPost } from "../libs/api/post";
import { Post } from "../types/post";

interface UsePost {
  post: Post | null;
  loading: boolean;
}

export default function usePost(id: string): UsePost {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPost(id)
      .then((post) => setPost(post))
      .finally(() => setLoading(false));
  }, [id]);

  return {
    post,
    loading,
  };
}
