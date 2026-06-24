import Link from "next/link";
import Image from "next/image";

export default function BookCard({ book, badge }) {
  return (
    <div className="card bg-base-200 border border-base-300 hover:border-primary/40 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] transition-all duration-300 group overflow-hidden">
      {/* Image with overlay gradient */}
      <figure className="relative h-60 overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {badge && (
          <span className="absolute top-3 right-3 badge bg-red-500 border-red-500 text-white gap-1 font-bold text-xs px-3 py-2 shadow-lg">
            {badge}
          </span>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="badge badge-sm bg-white/15 backdrop-blur-md border-white/20 text-white font-medium">
            {book.category}
          </span>
          <span className="text-xs text-white/70">
            {book.available_quantity} copies
          </span>
        </div>
      </figure>

      {/* Content */}
      <div className="card-body p-5 gap-1">
        <h3 className="card-title text-base font-bold line-clamp-1 group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-sm text-base-content/50 mb-3">{book.author}</p>
        <div className="card-actions justify-end">
          <Link
            href={`/all-books/${book.id}`}
            className="btn btn-primary btn-sm rounded-lg shadow-md shadow-primary/20 group-hover:shadow-primary/30"
          >
            View Details
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
