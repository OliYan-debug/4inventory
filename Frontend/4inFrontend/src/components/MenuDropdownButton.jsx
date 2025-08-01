import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronUp } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { MobileSubmenu } from "./MobileSubmenu";
import { DesktopSubmenu } from "./DesktopSubmenu";

export function MenuDropdownButton({
  label,
  Icon,
  links,
  hiddenNav,
  pathname,
}) {
  const { t } = useTranslation("menu");

  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const ref = useRef(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  //Verify if the url pathname is the same as the label name
  useEffect(() => {
    switch (label) {
      case t("products"):
        setActiveLink(pathname.startsWith("/products"));
        break;
      case t("categories"):
        setActiveLink(pathname.startsWith("/categories"));
        break;
      case t("administration"):
        setActiveLink(pathname.startsWith("/admin"));
        break;
      case t("user"):
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

  const handleOpenDropdown = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      return setOpen(false);
    }
  };

  return (
    <>
      <li
        onClick={handleOpenDropdown}
        data-isOpen={open}
        data-isActive={activeLink}
        className="group/item relative flex cursor-pointer justify-center font-medium transition hover:bg-neutral-500 hover:font-bold data-[isActive=true]:bg-neutral-600 data-[isActive=true]:font-bold data-[isOpen=true]:bg-neutral-500 md:rounded-s-lg"
      >
        {/* Desktop Button*/}
        <button
          onClick={() => {
            navigate(links[0].path);
          }}
          type="button"
          className="hidden w-full cursor-pointer py-4 md:flex"
        >
          <span
            data-isActive={activeLink}
            className="mt-auto h-1 w-6 rounded-md bg-neutral-50 opacity-0 group-hover:opacity-100 data-[isActive=true]:opacity-100 md:me-4 md:h-6 md:w-1"
          ></span>

          <div className="flex flex-col items-center md:w-full md:flex-row md:gap-2">
            <ChevronUp className="block size-4 text-neutral-50 transition-all group-hover/item:rotate-180 md:hidden" />

            <Icon className="mt-1 size-6 text-neutral-50" />

            {!hiddenNav && (
              <p className="hidden text-xs md:mt-1 md:block md:text-base">
                {label}
              </p>
            )}

            <ChevronRight className="hidden size-5 text-neutral-50 transition-all group-hover/item:translate-x-1 md:mr-2 md:ml-auto md:block" />
          </div>
        </button>

        {/* Mobile Button*/}
        <button
          onClick={handleOpenDropdown}
          type="button"
          className="flex w-full flex-col-reverse px-4 md:hidden md:flex-row"
        >
          <span
            data-isActive={activeLink}
            className="mt-auto h-1 w-6 rounded-md bg-neutral-50 opacity-0 group-hover:opacity-100 data-[isActive=true]:opacity-100 md:me-4 md:h-6 md:w-1"
          ></span>

          <div className="flex flex-col items-center md:w-full md:flex-row md:gap-2">
            <ChevronUp className="block size-4 text-neutral-50 transition-all group-hover/item:rotate-180 md:hidden" />

            <Icon className="mt-1 size-6 text-neutral-50" />

            {!hiddenNav && (
              <p className="hidden text-xs md:mt-1 md:block md:text-base">
                {label}
              </p>
            )}

            <ChevronRight
              className={`hidden size-5 text-neutral-50 transition-all group-hover/item:translate-x-1 md:mr-2 md:ml-auto md:block ${open && "rotate-180"}`}
            />
          </div>
        </button>

        <DesktopSubmenu ref={ref} filteredLinks={filteredLinks} />
      </li>

      <MobileSubmenu
        ref={ref}
        open={open}
        setOpen={setOpen}
        handleOpenDropdown={handleOpenDropdown}
        filteredLinks={filteredLinks}
      />
    </>
  );
}
