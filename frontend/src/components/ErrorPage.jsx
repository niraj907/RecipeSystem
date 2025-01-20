import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <main className="flex items-center w-screen h-screen justify-center px-[1rem]">
      <div className="flex text-center flex-col gap-4 p-8">
        <p className="text-base font-semibold  text-orange-600">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">Page not found</h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          >
            Go back home
          </Link>
    
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
