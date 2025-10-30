import { useEffect, useState } from "react";
import { LogOut, SearchIcon } from "lucide-react";

import { Search } from "@/routes/product/components/SearchModal";
import { Button } from "../Button";
import { LogoutButton } from "../LogoutButton";
import { ButtonChooseLanguage } from "../ButtonChooseLanguage";

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
    <div className="z-30 flex max-w-full flex-col items-center justify-between rounded-2xl bg-neutral-50 p-4 md:flex-row">
      <div className="mb-1 flex items-center gap-3">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="w-full text-3xl font-bold text-neutral-800">
            {title}
          </h1>
          {subtitle}
        </div>

        {children}
      </div>

      <div className="mt-0 flex items-center gap-2 px-2 sm:mt-2">
        <button
          onClick={() => setOpenSearch(true)}
          className="relative flex h-8 w-24 cursor-pointer items-center rounded-lg border border-neutral-400 md:w-22"
        >
          <div className="pointer-events-none absolute ml-2">
            <SearchIcon className="size-4 text-neutral-500" />
          </div>

          <kbd className="absolute right-1 hidden rounded-full border border-neutral-400 bg-neutral-500 px-1.5 py-px text-xs font-semibold text-neutral-200 md:block">
            Ctrl K
          </kbd>
        </button>

        <div className="h-8 w-14 rounded-lg bg-neutral-500">
          <ButtonChooseLanguage />
        </div>

        <div className="w-24">
          <LogoutButton>
            <Button className="h-8">
              Logout <LogOut className="size-4" />
            </Button>
          </LogoutButton>
        </div>
      </div>

      {openSearch && <Search setOpenSearch={setOpenSearch} />}
    </div>
  );
}
