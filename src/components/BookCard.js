import Link from "next/link";
import Image from "next/image";

export default function BookCard({ book, badge }) {
  return (
    <div className="card bg-base-200 shadow-md border border-base-300 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
      <figure className="relative h-56 overflow-hidden">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <span className="absolute top-2 right-2 badge badge-error gap-1 font-semibold">
            {badge}
          </span>
        )}
        <span className="absolute bottom-2 left-2 badge badge-neutral badge-sm">
          {book.category}
        </span>
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base line-clamp-1">{book.title}</h3>
        <p className="text-sm text-base-content/60">{book.author}</p>
        <div className="card-actions justify-end mt-2">
          <Link
            href={`/all-books/${book.id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
