import { ChevronRight, RouteIcon } from "lucide-react";
import { Link } from "react-router";

export function RouteFound({ name, path, setOpenSearch }) {
  return (
    <Link
      to={path}
      onClick={() => {
        setOpenSearch(false);
      }}
      className="group rounded-lg focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
    >
      <li className="group flex h-16 w-full animate-fadeIn cursor-pointer flex-row items-center gap-3 rounded-lg bg-neutral-300 px-2 transition hover:bg-emerald-400 group-focus-visible:bg-emerald-400">
        <span className="flex size-8 items-center justify-center rounded-lg border border-neutral-500 group-hover:border-neutral-50 group-focus-visible:border-neutral-50">
          <RouteIcon
            className={
              "text-neutral-700 group-hover:text-neutral-50 group-focus-visible:text-neutral-50"
            }
            size={16}
          />
        </span>

        <div className="flex flex-col items-start">
          <span className="text-xs text-neutral-600 group-hover:text-neutral-50 group-focus-visible:text-neutral-50">
            Go to
          </span>

          <p className="font-medium text-neutral-700 group-hover:text-neutral-50 group-focus-visible:text-neutral-50">
            {name}
          </p>
        </div>

        <ChevronRight
          className={
            "ml-auto text-neutral-700 group-hover:text-neutral-50 group-focus-visible:text-neutral-50"
          }
          size={22}
        />
      </li>
    </Link>
  );
}
