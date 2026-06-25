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
  const [justBorrowed, setJustBorrowed] = useState(false);

  const book = booksData.find((b) => b.id === parseInt(id));

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending || !session) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-4xl font-bold text-error">Book Not Found</h1>
        <Link href="/all-books" className="btn btn-primary">
          Back to All Books
        </Link>
      </div>
    );
  }

  const borrowed = justBorrowed || isBookBorrowed(book.id);
  const availableQty = borrowed
    ? book.available_quantity - 1
    : book.available_quantity;

  async function handleBorrow() {
    setBorrowing(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    borrowBook(book);
    setJustBorrowed(true);
    toast.success("Book borrowed successfully!");
    setBorrowing(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/all-books" className="inline-flex items-center gap-2 text-sm text-base-content/60 hover:text-primary transition-colors mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to All Books
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/30 border border-white/5">
            <Image
              src={book.image_url}
              alt={book.title}
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge badge-primary">{book.category}</span>
            <span className={`badge ${availableQty > 0 ? "badge-success" : "badge-error"}`}>
              {availableQty > 0 ? `${availableQty} copies available` : "Out of stock"}
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight mb-3">
            {book.title}
          </h1>

          <p className="text-lg text-base-content/50 mb-8">
            by <span className="text-base-content/70 font-medium">{book.author}</span>
          </p>

          <div className="bg-base-200/50 rounded-xl p-6 border border-base-300 mb-8">
            <h3 className="text-sm font-semibold text-base-content/40 uppercase tracking-wider mb-3">Description</h3>
            <p className="text-base-content/80 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleBorrow}
              className={`btn btn-lg w-full sm:w-auto min-w-[220px] ${
                borrowed ? "btn-success" : "btn-primary"
              } shadow-lg`}
              disabled={borrowing || borrowed || availableQty === 0}
            >
              {borrowing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Processing...
                </>
              ) : borrowed ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Borrowed Successfully
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Borrow This Book
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
