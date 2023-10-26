import Link from "next/link";
import React from "react";

const Failed = () => {
  return (
    <main className="bg-gray-100 h-screen">
      <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="px-4 py-8 sm:px-0">
          <div className="mx-auto max-w-md text-center">
            <svg
              className="h-20 w-20 text-red-500 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
              Your payment was unsuccessful!
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Please check your payment details and try again.
            </p>
            <div className="mt-6">
              <Link href={"/"}>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Go back to payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Failed;
