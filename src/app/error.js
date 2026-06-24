"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-4">
      <h1 className="text-5xl font-bold text-error">Oops!</h1>
      <p className="text-lg text-base-content/60 text-center max-w-md">
        {error?.message || "Something went wrong. Please try again."}
      </p>
      <button onClick={reset} className="btn btn-primary">
        Try Again
      </button>
    </div>
  );
}
