import { SearchX } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-50">
      <h1 className="text-8xl font-bold text-neutral-800">404</h1>
      <h3 className="text-2xl">Somethings missing.</h3>
      <p className="mb-4 mt-2 text-neutral-500">
        Sorry, we cant find that page.
      </p>
      <SearchX size={84} color="#262626" />
      <Link
        to={"/"}
        className="my-2 rounded-lg bg-neutral-600 px-3 py-2 font-medium text-neutral-50 transition hover:opacity-80"
      >
        Back to Homepage
      </Link>
    </div>
  );
}
