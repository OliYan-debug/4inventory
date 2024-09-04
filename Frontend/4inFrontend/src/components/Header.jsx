import { FolderSearch, Search } from "lucide-react"

export default function Header({ title, subtitle }) {
  return (
    <div className="max-w-full p-4 bg-neutral-50 rounded-2xl flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <h1 className="text-3xl font-bold text-neutral-800">{title}</h1>
        {subtitle}
      </div>

      <form className="flex gap-2">
        <div className="relative flex items-center">
          <div className="absolute pointer-events-none ml-2">
            <Search size={20} color="#a3a3a3" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-72 h-5 pl-8 pr-4 py-4 border rounded-lg border-neutral-400 hover:border-neutral-600 focus-visible:border-neutral-600 outline-none transition-all"
          />
        </div>

        <button className="rounded-lg bg-sky-400 text-neutral-50 font-semibold flex items-center justify-center px-4 hover:bg-sky-500 transition">
          Search
          <FolderSearch size={20} color="#fafafa" className="ms-2" />
        </button>
      </form>
    </div>
  )
}
