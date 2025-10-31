import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import logo from "@/assets/logo.svg";
import logoMin from "@/assets/logoMin.svg";
import { Menu } from "./Menu";
import { Avatar } from "../Avatar";

export function NavBar() {
  const [hiddenNav, setHiddenNav] = useState(false);

  function handleHiddenShowNavbar() {
    setHiddenNav(!hiddenNav);
  }

  return (
    <nav
      className={`fixed right-0 bottom-0 left-0 z-10 flex h-auto w-full bg-neutral-800 text-neutral-50 transition-all duration-500 md:relative md:mr-4 md:h-full md:rounded-2xl md:pb-8 ${hiddenNav ? "md:w-20" : "w-[14vw] md:w-[38vw] lg:w-[24vw] 2xl:w-[20vw]"}`}
    >
      <div className="absolute flex w-full justify-end p-2">
        <button
          onClick={handleHiddenShowNavbar}
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
              className={`hidden pt-10 md:block ${!hiddenNav && "animate-fade-in md:w-[18vw] lg:w-[14vw]"}`}
            />

            <img
              src={logoMin}
              alt="4inventory"
              className="block pt-10 md:hidden"
            />
          </Link>

          <span className="animate-fade-in mt-px text-xs font-thin text-neutral-200">
            1.21.4
          </span>
        </div>

        <Menu hiddenNav={hiddenNav} />

        <Avatar hiddenNav={hiddenNav} />
      </div>
    </nav>
  );
}
