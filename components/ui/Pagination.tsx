import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });
    params.set("page", page.toString());
    return `${basePath}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8">
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-surface"
        >
          ← Précédent
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted cursor-not-allowed">
          ← Précédent
        </span>
      )}

      <div className="flex gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-muted">...</span>
          ) : (
            <Link
              key={page}
              href={buildUrl(page as number)}
              className={`px-4 py-2 rounded-md ${
                currentPage === page
                  ? "bg-primary text-gray-900"
                  : "border border-border text-foreground hover:bg-surface"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-surface"
        >
          Suivant →
        </Link>
      ) : (
        <span className="px-4 py-2 border border-border rounded-md text-muted cursor-not-allowed">
          Suivant →
        </span>
      )}
    </nav>
  );
}