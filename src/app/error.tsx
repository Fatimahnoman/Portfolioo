"use client";
import React from "react";

const Error = ({
  reset,
}: {
  error?: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0e0e0e] px-4 text-center">
      <div className="text-6xl mb-6">⚠️</div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        Something went wrong
      </h1>
      <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md">
        An unexpected error occurred. Don&apos;t worry, it&apos;s not you — it&apos;s us.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-semibold hover:from-amber-500 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-amber-500/25"
      >
        Try Again
      </button>
    </div>
  );
};

export default Error;
