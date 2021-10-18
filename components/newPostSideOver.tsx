import React, {
  forwardRef,
  Fragment,
  useImperativeHandle,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TextInput from "./textInput";
import FormLabel from "./formLabel";
import { createPost } from "../libs/api/post";
import LoadingSpinner from "./loadingSpinner";

export interface NewPostSideOverRef {
  open: () => void;
  close: () => void;
}

const NewPostSideOver = forwardRef<NewPostSideOverRef>((props, ref) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open() {
        setOpen(true);
      },
      close() {
        setOpen(false);
      },
    }),
    []
  );

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Post title is required"),
    slug: Yup.string().required("Post slug is required"),
  });

  const onSubmit = async ({ title, slug }: { title: string; slug: string }) => {
    setLoading(true);
    const post = await createPost({
      title,
      slug,
      content: "Let's start writing your blog post with Markdown!",
      excerpt: title,
    });
    setLoading(false);

    router.push(`/posts/${post?.id}`);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <Formik
                  initialValues={{
                    title: "",
                    slug: "",
                  }}
                  onSubmit={onSubmit}
                  validationSchema={validationSchema}
                >
                  <Form className="flex flex-col h-full bg-white divide-y divide-gray-200 shadow-xl">
                    <div className="flex-1 h-0 overflow-y-auto">
                      <div className="px-4 py-6 bg-indigo-700 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-lg font-medium text-white">
                            New Post
                          </Dialog.Title>
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="text-indigo-200 bg-indigo-700 rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XIcon className="w-6 h-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Get started by filling in the information below to
                            write your new post. Don't worry, you can change
                            them any time later.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div className="px-4 divide-y divide-gray-200 sm:px-6">
                          <div className="pt-6 pb-5 space-y-6">
                            <div>
                              <FormLabel htmlFor="title">Post Title</FormLabel>
                              <div className="mt-1">
                                <Field
                                  id="title"
                                  name="title"
                                  type="text"
                                  component={TextInput}
                                />
                              </div>
                            </div>
                            <div>
                              <FormLabel htmlFor="slug">Post Slug</FormLabel>
                              <div className="mt-1">
                                <Field
                                  id="slug"
                                  name="slug"
                                  type="text"
                                  component={TextInput}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end flex-shrink-0 px-4 py-4">
                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <LoadingSpinner />
                            <span className="ml-2">Processing</span>
                          </div>
                        ) : (
                          "Start writing"
                        )}
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});

NewPostSideOver.displayName = "NewPostSideOver";

export default NewPostSideOver;
