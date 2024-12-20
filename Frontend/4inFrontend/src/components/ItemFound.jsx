import { Link } from "react-router-dom";
import { Box, ChevronRight } from "lucide-react";

export function ItemFound({ id, item, category, setOpenSearch }) {
  return (
    <Link
      to={`/products/update/${id}`}
      onClick={() => {
        setOpenSearch(false);
      }}
    >
      <li className="group flex h-16 w-full animate-fadeIn cursor-pointer flex-row items-center gap-3 rounded-lg bg-neutral-300 px-2 transition hover:bg-sky-400">
        <span className="flex size-8 items-center justify-center rounded-lg border border-neutral-500 group-hover:border-neutral-50">
          <Box
            className={"text-neutral-700 group-hover:text-neutral-50"}
            size={16}
          />
        </span>

        <div className="flex flex-col items-start">
          <div className="rounded-md bg-neutral-400 px-1 py-px group-hover:bg-neutral-50">
            <p className="text-xs text-neutral-50 drop-shadow-sm group-hover:text-neutral-500">
              {category}
            </p>
          </div>
          <p className="font-medium text-neutral-700 group-hover:text-neutral-50">
            {item}
          </p>
        </div>

        <ChevronRight
          className={"ml-auto text-neutral-700 group-hover:text-neutral-50"}
          size={22}
        />
      </li>
    </Link>
  );
}
