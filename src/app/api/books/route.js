import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let filtered = [...books];

  if (category && category !== "All") {
    filtered = filtered.filter(
      (book) => book.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );
  }

  return NextResponse.json(filtered);
}
