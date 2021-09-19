import Image from "next/image";

export default function Login(): JSX.Element {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50">
      <div className="flex flex-col justify-center sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/workflow-logo.svg"
          alt="Logo"
          width={54}
          height={48}
          className="mx-auto"
        />
        <h2 className="mt-6 text-3xl font-extrabold leading-9 text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <div>
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in with GitHub
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
