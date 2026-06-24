import { NextResponse } from "next/server";
import books from "@/data/books.json";

export async function GET(request, { params }) {
  const { id } = await params;
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(book);
}
