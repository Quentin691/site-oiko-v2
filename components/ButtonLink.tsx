import Link from "next/link";

export default function ButtonLink({ href, children }) {
  return (
    <Link
      href={href}
      className="
        px-4 py-2
        text-sm
        border border-gray-300
        rounded
        hover:bg-gray-100
        transition
      "
    >
      {children}
    </Link>
  );
}
