import React, { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/solid";
import { NextPageWithLayout } from "../_app";
import { Dashboard, Protected } from "../../layouts";
import usePostCollection from "../../hooks/usePostCollection";
import { formatDate } from "../../libs/helper";

const Posts: NextPageWithLayout = () => {
  const { posts, loading } = usePostCollection();

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <svg
        className="w-12 h-12 mx-auto text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new post.
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
          New Post
        </button>
      </div>
    </div>
  );

  if (loading) {
    // TODO: render loading animation
    return <div>Loading posts...</div>;
  }

  if (!posts) {
    // TODO: render proper error
    return <div>Failed to load posts.</div>;
  }

  if (posts.data.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-col">
      <div className="pt-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-t-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Title
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Published At
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Updated At
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Status
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
              {posts.data.map((post, index) => (
                <tr
                  key={post.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap">
                    {post.published_at && formatDate(post.published_at)}
                  </td>
                  <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-nowrap">
                    {post.updated_at && formatDate(post.updated_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {post.is_published ? (
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-nowrap">
                    <Link href={`/posts/${post.id}`}>
                      <a className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

Posts.getLayout = (page: ReactElement): ReactNode => {
  return (
    <Protected>
      <Dashboard>{page}</Dashboard>
    </Protected>
  );
};

export default Posts;
