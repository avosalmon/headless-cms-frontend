import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { Protected } from "../../layouts";
import { NextPageWithLayout } from "../_app";

const PostEdit: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post Edit: {id}</p>;
};

PostEdit.getLayout = (page: ReactElement): ReactNode => {
  return <Protected>{page}</Protected>;
};

export default PostEdit;
