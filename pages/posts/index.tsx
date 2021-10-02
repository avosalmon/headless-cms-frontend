import React, { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { NextPageWithLayout } from "../_app";
import { Dashboard, Protected } from "../../layouts";
import usePostCollection from "../../hooks/usePostCollection";
import { formatDate } from "../../libs/helper";

const Posts: NextPageWithLayout = () => {
  const { posts, loading } = usePostCollection();

  if (loading) {
    // TODO: render loading animation
    return <div>Loading posts...</div>;
  }

  if (!posts) {
    // TODO: render proper error
    return <div>Failed to load posts.</div>;
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
