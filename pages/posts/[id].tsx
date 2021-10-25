import React, { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import { Protected } from "../../layouts";
import { NextPageWithLayout } from "../_app";
import usePost from "../../hooks/usePost";
import Overlay from "../../components/overlay";
import LoadingSpinner from "../../components/loadingSpinner";
import Link from "next/link";

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

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <div className="flex items-center">
          <Link href="/posts">
            <a>
              <svg
                className="w-6 h-6 text-gray-400 transition duration-150 ease-in-out rounded-full hover:text-gray-500 focus:outline-none focus:text-gray-500 focus:bg-gray-100"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          {post.is_published ? (
            <span className="mr-3 rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
                onClick={() => console.log("update clicked")}
              >
                Update
              </button>
            </span>
          ) : (
            <span className="mr-3 rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
                onClick={() => console.log("save and publish clicked")}
              >
                Save and publish
              </button>
            </span>
          )}
        </div>
      </nav>
    </>
  );
};

PostEdit.getLayout = (page: ReactElement): ReactNode => {
  return <Protected>{page}</Protected>;
};

export default PostEdit;
