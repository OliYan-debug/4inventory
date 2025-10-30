import { Link } from "react-router";

export function DesktopSubmenu({ ref, filteredLinks }) {
  return (
    <div
      ref={ref}
      className={`invisible absolute bottom-14 z-20 w-32 rounded-lg bg-neutral-500 text-xs opacity-0 shadow-lg transition-[opacity] group-hover/item:visible group-hover/item:opacity-100 md:top-3 md:-right-48 md:bottom-auto md:flex md:min-h-16 md:w-48 md:-translate-y-3 md:rounded-none md:rounded-tr-lg md:rounded-br-lg md:rounded-bl-lg md:text-base md:group-hover/item:translate-x-0`}
    >
      <ul className="w-full">
        {filteredLinks.map((link, index) => (
          <li
            key={index}
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
