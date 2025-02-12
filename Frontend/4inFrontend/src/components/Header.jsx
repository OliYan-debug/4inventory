import { useEffect, useState } from "react";
import { FolderSearch, SearchIcon } from "lucide-react";
import { Search } from "./SearchModal";

export function Header({ title, subtitle, children }) {
  const [openSearch, setOpenSearch] = useState(false);

  //open search shortcut key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setOpenSearch(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex max-w-full flex-col items-center justify-between rounded-2xl bg-neutral-50 p-4 md:flex-row">
      <div className="mb-1 flex items-center gap-3">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="w-full text-3xl font-bold text-neutral-800">
            {title}
          </h1>
          {subtitle}
        </div>
        {children}
      </div>

      <form className="mt-0 flex gap-2 sm:mt-2">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute ml-2">
            <SearchIcon size={20} color="#a3a3a3" />
          </div>
          <input
            type="text"
            placeholder="Search"
            onClick={() => setOpenSearch(true)}
            className="h-5 w-full rounded-lg border border-neutral-400 py-4 pl-8 pr-4 outline-none transition-all hover:border-neutral-600 focus-visible:border-neutral-600 lg:w-72"
          />
          <kbd className="absolute right-1 hidden rounded-lg border border-neutral-400 bg-neutral-500 px-1.5 py-1 text-xs font-semibold text-neutral-200 md:block">
            Ctrl + K
          </kbd>
        </div>

        <button
          type="button"
          onClick={() => setOpenSearch(true)}
          className="flex items-center justify-center rounded-lg bg-sky-400 px-4 font-semibold text-neutral-50 transition hover:bg-sky-500"
        >
          <span className="hidden md:block">Search</span>
          <FolderSearch size={20} color="#fafafa" className="ms-0 md:ms-2" />
        </button>
      </form>

      {openSearch && <Search setOpenSearch={setOpenSearch} />}
    </div>
  );
}
