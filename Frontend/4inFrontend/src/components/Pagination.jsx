import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export function Pagination({
  totalElements,
  totalPages,
  pageNumber,
  first,
  last,
  setSize,
  path,
}) {
  const { t } = useTranslation("pagination");

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
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
    let endPage = Math.min(startPage + maxLimit - 1, totalPages - 1);

    for (let i = startPage; i <= endPage; i++) {
      current = pageNumber === i;

      pages.push(
        <Link
          to={`/${path}/${i}`}
          key={i}
          aria-current="page"
          className={`${current ? "relative z-10 inline-flex items-center bg-neutral-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-600" : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0"}`}
        >
          {i + 1}
        </Link>,
      );
    }
    return pages;
  };

  const handleChangeSize = (e) => {
    setCookie("paginationSize", e.target.value, {
      maxAge: 60 * 60 * 24, //1 day
    });
    setSize(e.target.value);
    navigate(`/${path}`);
  };

  const FormSelectSize = () => {
    return (
      <form
        onChange={(e) => {
          handleChangeSize(e);
        }}
        className="flex flex-row gap-1 text-sm text-neutral-700"
      >
        <label className="hidden sm:flex" htmlFor="size">
          {t("totalItems.showing")}
        </label>
        <select
          id="size"
          className="rounded-lg border border-neutral-300 font-medium"
          defaultValue={cookies.paginationSize}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="40">40</option>
          <option value="100">100</option>
        </select>
      </form>
    );
  };

  return (
    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          to={`/${path}/${pageNumber - 1}`}
          className={`relative inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 ${first && "pointer-events-none opacity-70"}`}
        >
          {t("buttons.previous")}
        </Link>

        <FormSelectSize />

        <Link
          to={`/${path}/${pageNumber + 1}`}
          className={`relative ml-3 inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 ${last && "pointer-events-none opacity-70"}`}
        >
          {t("buttons.next")}
        </Link>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex gap-1 text-sm text-neutral-700">
          <FormSelectSize />
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
              className="isolate inline-flex -space-x-px rounded-lg shadow-sm"
            >
              <Link
                to={`/${path}`}
                className={`relative inline-flex items-center rounded-l-lg px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${first && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only">First</span>
                <ChevronsLeft aria-hidden="true" className="h-5 w-5" />
              </Link>
              <Link
                to={`/${path}/${pageNumber - 1}`}
                className={`relative inline-flex items-center px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${first && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only"> {t("totalItems.previous")}</span>
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </Link>

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

              <Link
                to={`/${path}/${pageNumber + 1}`}
                className={`relative inline-flex items-center px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${last && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only"> {t("totalItems.next")}</span>
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </Link>
              <Link
                to={`/${path}/${totalPages - 1}`}
                className={`relative inline-flex items-center rounded-r-lg px-2 py-2 text-neutral-400 ring-1 ring-inset ring-neutral-300 hover:bg-neutral-50 focus:z-20 focus:outline-offset-0 ${last && "pointer-events-none opacity-70"}`}
              >
                <span className="sr-only">{t("totalItems.last")}</span>
                <ChevronsRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
