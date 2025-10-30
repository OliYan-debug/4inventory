import { Link } from "react-router";
import { X } from "lucide-react";

export function MobileSubmenu({
  ref,
  open,
  setOpen,
  handleOpenDropdown,
  filteredLinks,
}) {
  return (
    <div
      ref={ref}
      data-open={open}
      className={`absolute bottom-14 z-20 block w-full rounded-t-lg bg-neutral-500 pt-4 pb-2 shadow-lg transition-[opacity] duration-150 ease-in data-[open=false]:invisible data-[open=false]:opacity-0 data-[open=true]:visible data-[open=true]:opacity-100 md:hidden`}
    >
      <button
        onClick={handleOpenDropdown}
        type="button"
        className="absolute top-2 right-3 z-10 rounded-lg p-px transition hover:bg-neutral-400/70"
      >
        <X className="size-5 text-neutral-50 hover:opacity-90" />
      </button>

      <ul>
        {filteredLinks.map((link, index) => (
          <li
            key={index}
            onClick={() => {
              setOpen(false);
            }}
            className={`group/subitem flex w-full cursor-pointer justify-center rounded-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold md:justify-start ${!link.active && "pointer-events-none opacity-75"}`}
          >
            <span className="ms-1 me-4 hidden h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100 md:block" />

            <Link to={link.path} className="flex items-center">
              <link.Icon className="me-2 size-5 text-neutral-50" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
