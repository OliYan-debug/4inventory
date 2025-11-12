import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import logo from "@/assets/logo.svg";
import logoMin from "@/assets/logoMin.svg";
import { Menu } from "./Menu";
import { Avatar } from "../Avatar";

export function NavBar() {
  const localStorageKey = "4inNavbarHidden";
  const raw = localStorage.getItem(localStorageKey);
  const localNavbarState = JSON.parse(raw);

  const [hiddenNav, setHiddenNav] = useState(localNavbarState || false);

  function handleHiddenNavbar() {
    setHiddenNav(!hiddenNav);
    localStorage.setItem(localStorageKey, JSON.stringify(!hiddenNav));
  }

  return (
    <nav
      className={`fixed right-0 bottom-0 left-0 z-10 flex h-auto w-full bg-neutral-800 text-neutral-50 transition-all duration-500 md:sticky md:top-4 md:mr-4 md:h-full md:rounded-2xl md:pb-8 md:shadow ${hiddenNav ? "md:w-20" : "w-[20vw] md:w-[26vw] 2xl:w-[14vw]"}`}
    >
      <div className="absolute flex w-full justify-end p-2">
        <button
          onClick={handleHiddenNavbar}
          type="button"
          className="hidden size-6 cursor-pointer text-neutral-50 transition hover:opacity-50 md:flex"
        >
          {hiddenNav ? <ChevronsRight /> : <ChevronsLeft />}
        </button>
      </div>

      <div className="flex w-full flex-col items-center transition-all">
        <div className="hidden md:flex md:flex-col md:items-center">
          <Link to={"/products"}>
            <img
              src={hiddenNav ? logoMin : logo}
              alt="4inventory"
              className={`hidden pt-10 md:block ${!hiddenNav && "animate-fade-in md:w-[14vw] lg:w-[14vw] 2xl:w-[8vw]"}`}
            />

            <img
              src={logoMin}
              alt="4inventory"
              className="block pt-10 md:hidden"
            />
          </Link>

          <span className="animate-fade-in mt-px text-xs font-thin text-neutral-200">
            1.23
          </span>
        </div>

        <Menu hiddenNav={hiddenNav} />

        <Avatar hiddenNav={hiddenNav} />
      </div>
    </nav>
  );
}
