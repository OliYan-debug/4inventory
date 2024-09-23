import { FolderSearch, Search } from "lucide-react";

export default function Header({ title, subtitle }) {
  return (
    <div className="flex max-w-full flex-col items-center justify-between rounded-2xl bg-neutral-50 p-4 md:flex-row">
      <div className="flex items-center gap-2 sm:flex-col sm:items-start">
        <h1 className="w-full text-3xl font-bold text-neutral-800">{title}</h1>
        {subtitle}
      </div>

      <form className="mt-0 flex gap-2 sm:mt-2">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute ml-2">
            <Search size={20} color="#a3a3a3" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="h-5 w-full rounded-lg border border-neutral-400 py-4 pl-8 pr-4 outline-none transition-all hover:border-neutral-600 focus-visible:border-neutral-600 lg:w-72"
          />
        </div>

        <button className="flex items-center justify-center rounded-lg bg-sky-400 px-4 font-semibold text-neutral-50 transition hover:bg-sky-500">
          <span className="hidden md:block">Search</span>
          <FolderSearch size={20} color="#fafafa" className="ms-0 md:ms-2" />
        </button>
      </form>
    </div>
  );
}
