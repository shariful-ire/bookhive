"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import booksData from "@/data/books.json";
import { borrowBook, isBookBorrowed } from "@/lib/borrow";

export default function BookDetailsPage({ params }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);
  const [borrowed, setBorrowed] = useState(false);

  const book = booksData.find((b) => b.id === parseInt(id));

  useEffect(() => {
    if (book) {
      setBorrowed(isBookBorrowed(book.id));
    }
  }, [book]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-4xl font-bold text-error">Book Not Found</h1>
        <Link href="/all-books" className="btn btn-primary">
          Back to All Books
        </Link>
      </div>
    );
  }

  async function handleBorrow() {
    if (!session) {
      router.push("/login");
      return;
    }

    setBorrowing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    borrowBook(book);
    setBorrowed(true);
    toast.success("Book borrowed successfully!");
    setBorrowing(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link
        href="/all-books"
        className="btn btn-ghost btn-sm gap-1 mb-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to All Books
      </Link>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 shrink-0">
          <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-base-300">
            <Image
              src={book.image_url}
              alt={book.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <span className="badge badge-primary badge-lg mb-3">
            {book.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-base-content/60 mb-6">
            by {book.author}
          </p>

          <p className="text-base-content/80 leading-relaxed mb-8">
            {book.description}
          </p>

          <div className="flex items-center gap-2 mb-8">
            <span
              className={`badge ${
                book.available_quantity > 0
                  ? "badge-success"
                  : "badge-error"
              } badge-lg`}
            >
              {borrowed
                ? `Available: ${book.available_quantity - 1} copies left`
                : `Available: ${book.available_quantity} copies left`}
            </span>
          </div>

          <button
            onClick={handleBorrow}
            className="btn btn-primary btn-lg"
            disabled={borrowing || borrowed || book.available_quantity === 0}
          >
            {borrowing ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : borrowed ? (
              "Borrowed"
            ) : (
              "Borrow This Book"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
