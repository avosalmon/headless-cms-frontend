import React, { ReactElement, ReactNode } from "react";
import { NextPageWithLayout } from "../_app";
import { Dashboard, Protected } from "../../layouts";

const Posts: NextPageWithLayout = () => {
  return <div>Posts</div>;
};

Posts.getLayout = (page: ReactElement): ReactNode => {
  return (
    <Protected>
      <Dashboard title="Your posts">{page}</Dashboard>
    </Protected>
  );
};

export default Posts;
