import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { SelectSize } from "./PaginationSelectSize";

export function Pagination({
  totalElements,
  totalPages,
  pageNumber,
  first,
  last,
  size,
}) {
  const { t } = useTranslation("pagination");

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const path = location.pathname;

  const [hiddenMoreNumbers, setHiddenMoreNumbers] = useState(true);
  const maxLimit = 4;
  const minLimit = 0;

  useEffect(() => {
    totalPages - pageNumber < 3
      ? setHiddenMoreNumbers(false)
      : setHiddenMoreNumbers(true);
  }, [totalPages, pageNumber]);

  const PageNumbers = () => {
    if (totalPages <= 1) {
      return;
    }

    const pages = [];

    let current = false;

    let startPage = Math.max(pageNumber - Math.floor(maxLimit / 2), minLimit);
    let endPage = Math.min(startPage + maxLimit - 1, totalPages);

    for (let i = startPage + 1; i <= endPage; i++) {
      current = pageNumber === i;

      pages.push(
        <button
          onClick={() => {
            searchParams.set("page", i);
            navigate(`${path}?${searchParams.toString()}`);
          }}
          type="button"
          key={i}
          aria-current="page"
          className={`${current ? "relative z-10 inline-flex items-center bg-neutral-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0"}`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => {
            searchParams.set("page", pageNumber - 1);
            navigate(`${path}?${searchParams.toString()}`);
          }}
          type="button"
          className={`relative inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 ${first && "pointer-events-none opacity-70"}`}
        >
          {t("buttons.previous")}
        </button>

        <SelectSize size={size} />

        <button
          onClick={() => {
            searchParams.set("page", pageNumber + 1);
            navigate(`${path}?${searchParams.toString()}`);
          }}
          type="button"
          className={`relative ml-3 inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 ${last && "pointer-events-none opacity-70"}`}
        >
          {t("buttons.next")}
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex gap-1 text-sm text-neutral-700">
          <SelectSize size={size} />

          <p>
            {t("totalItems.of")}
            <span className="font-medium"> {totalElements} </span>
            {t("totalItems.results")}
          </p>
        </div>

        {totalPages !== 1 && (
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-lg shadow-xs"
            >
              <button
                onClick={() => {
                  searchParams.set("page", 1);
                  navigate(`${path}?${searchParams.toString()}`);
                }}
                type="button"
                className={`relative inline-flex items-center rounded-l-lg px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${first && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only">{t("totalItems.first")}</span>
                <ChevronsLeft aria-hidden="true" className="h-5 w-5" />
              </button>

              <button
                onClick={() => {
                  searchParams.set("page", pageNumber - 1);
                  navigate(`${path}?${searchParams.toString()}`);
                }}
                type="button"
                className={`relative inline-flex items-center px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${first && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only"> {t("totalItems.previous")}</span>
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>

              {PageNumbers()}

              {totalPages > maxLimit && (
                <>
                  {hiddenMoreNumbers && (
                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-700 ring-1 ring-inset ring-neutral-300 focus:outline-offset-0">
                      ...
                    </span>
                  )}
                </>
              )}

              <button
                onClick={() => {
                  searchParams.set("page", pageNumber + 1);
                  navigate(`${path}?${searchParams.toString()}`);
                }}
                type="button"
                className={`relative inline-flex items-center px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${last && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only"> {t("totalItems.next")}</span>
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>

              <button
                onClick={() => {
                  searchParams.set("page", totalPages);
                  navigate(`${path}?${searchParams.toString()}`);
                }}
                type="button"
                className={`relative inline-flex items-center rounded-r-lg px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${last && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only">{t("totalItems.last")}</span>
                <ChevronsRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
