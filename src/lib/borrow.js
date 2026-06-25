"use client";

const STORAGE_KEY = "bookhive_borrowed";

export function getBorrowedBooks() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function borrowBook(book) {
  const borrowed = getBorrowedBooks();
  if (borrowed.some((b) => b.id === book.id)) return borrowed;
  const entry = {
    id: book.id,
    title: book.title,
    author: book.author,
    image_url: book.image_url,
    borrowedAt: new Date().toISOString(),
  };
  const updated = [...borrowed, entry];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function returnBook(bookId) {
  const borrowed = getBorrowedBooks();
  const updated = borrowed.filter((b) => b.id !== bookId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function isBookBorrowed(bookId) {
  return getBorrowedBooks().some((b) => b.id === bookId);
}
