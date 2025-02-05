import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronUp, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

export function MenuDropdownButton({
  label,
  Icon,
  links,
  hiddenNav,
  pathname,
}) {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const ref = useRef(null);

  const { user } = useAuth();

  const handleOpenDropdown = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      return setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  //Verify if the url pathname is the same as the label name
  useEffect(() => {
    switch (label) {
      case "Products":
        setActiveLink(pathname.startsWith("/products"));
        break;
      case "Categories":
        setActiveLink(pathname.startsWith("/categories"));
        break;
      case "Administration":
        setActiveLink(pathname.startsWith("/admin"));
        break;
      case "User":
        setActiveLink(pathname.startsWith("/user"));
        break;
      default:
        setActiveLink(false);
    }
  }, [label, pathname]);

  const filteredLinks = links.filter((link) => {
    if (user?.role === "ADMIN") {
      return true;
    }
    return link.role !== "ADMIN";
  });

  return (
    <>
      <li
        className={`group/item relative flex cursor-pointer justify-center px-4 font-medium transition hover:bg-neutral-500 hover:font-bold md:rounded-s-lg md:px-0 md:py-4 ${open && "bg-neutral-500"} ${activeLink && "bg-neutral-600 font-bold"}`}
      >
        <button
          type="button"
          onClick={() => {
            handleOpenDropdown();
          }}
          className="flex w-full flex-col-reverse md:flex-row"
        >
          <span
            className={`mt-auto h-1 w-6 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 md:me-4 md:h-6 md:w-1 ${open && "opacity-100"} ${activeLink && "opacity-100"}`}
          ></span>
          <div className="flex flex-col items-center md:w-full md:flex-row md:gap-2">
            <ChevronUp
              size={16}
              className={`block text-neutral-50 transition-all md:hidden ${open && "rotate-180"}`}
            />

            <Icon size={24} className="mt-1 text-neutral-50" />

            {!hiddenNav && (
              <p className="hidden text-xs md:mt-1 md:block md:text-base">
                {label}
              </p>
            )}

            <ChevronRight
              size={20}
              className={`hidden text-neutral-50 transition-all group-hover/item:translate-x-1 md:ml-auto md:mr-2 md:block ${open && "rotate-180"}`}
            />
          </div>
        </button>

        {/* Desktop submenu */}
        <div
          ref={ref}
          className={`absolute bottom-14 z-20 hidden rounded-lg bg-neutral-500 shadow-lg transition-all duration-150 ease-in md:-right-48 md:bottom-auto md:top-3 md:flex md:min-h-16 md:w-48 md:-translate-y-3 md:rounded-none md:rounded-bl-lg md:rounded-br-lg md:rounded-tr-lg md:group-hover/item:translate-x-0 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        >
          <ul className="w-full">
            {filteredLinks.map((link, index) => (
              <li
                key={index}
                onClick={() => {
                  setOpen(false);
                }}
                className={`group/subitem flex w-full cursor-pointer justify-center rounded-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold md:justify-start ${!link.active ? "pointer-events-none opacity-75" : ""}`}
              >
                <span className="me-4 ms-1 hidden h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100 md:block"></span>
                <Link to={link.path} className="flex items-center">
                  <link.Icon size={20} className="me-2 text-neutral-50" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>

      {/* Mobile submenu */}
      <div
        ref={ref}
        className={`absolute bottom-14 z-20 block w-full rounded-t-lg bg-neutral-500 pb-2 pt-4 shadow-lg transition-all duration-150 ease-in md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <button
          onClick={() => {
            handleOpenDropdown();
          }}
          type="button"
          className="absolute right-3 top-2 z-10 rounded-lg p-px transition hover:bg-neutral-400/70"
        >
          <X size={22} className="text-neutral-50 hover:opacity-90" />
        </button>
        <ul>
          {filteredLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                setOpen(false);
              }}
              className={`group/subitem flex w-full cursor-pointer justify-center rounded-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold md:justify-start ${!link.active ? "pointer-events-none opacity-75" : ""}`}
            >
              <span className="me-4 ms-1 hidden h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100 md:block"></span>
              <Link to={link.path} className="flex items-center">
                <link.Icon size={20} className="me-2 text-neutral-50" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
