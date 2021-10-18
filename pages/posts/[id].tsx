import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { Protected } from "../../layouts";
import { NextPageWithLayout } from "../_app";
import usePost from "../../hooks/usePost";
import Overlay from "../../components/overlay";
import LoadingSpinner from "../../components/loadingSpinner";

const PostEdit: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const { post, loading } = usePost(id as string);

  if (loading) {
    return (
      <Overlay>
        <LoadingSpinner />
        <div className="mt-4 text-white">Loading post...</div>
      </Overlay>
    );
  }

  if (!post) {
    // TODO: render proper error
    return <div>Failed to load post.</div>;
  }

  return <p>Post Edit: {post.title}</p>;
};

PostEdit.getLayout = (page: ReactElement): ReactNode => {
  return <Protected>{page}</Protected>;
};

export default PostEdit;
