import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoMin from "../assets/logoMin.svg";
import { Menu } from "./Menu";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { Avatar } from "./Avatar";
import { ButtonChooseLanguage } from "./ButtonChooseLanguage";

export function NavBar() {
  const [hiddenNav, setHiddenNav] = useState(false);

  function handleHiddenShowNavbar() {
    hiddenNav ? setHiddenNav(false) : setHiddenNav(true);
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex h-auto w-full bg-neutral-800 text-neutral-50 transition-all duration-500 md:relative md:mr-4 md:rounded-2xl ${hiddenNav ? "md:w-20" : "w-[14vw] md:w-[38vw] lg:w-[24vw] 2xl:w-[20vw]"}`}
    >
      <div className="absolute flex w-full justify-end p-2">
        <button
          type="button"
          className="hidden transition hover:opacity-50 md:block"
        >
          {hiddenNav ? (
            <ChevronsRight
              size={24}
              color="#fafafa"
              onClick={handleHiddenShowNavbar}
            />
          ) : (
            <ChevronsLeft
              size={24}
              color="#fafafa"
              onClick={handleHiddenShowNavbar}
            />
          )}
        </button>
      </div>

      <div className="flex w-full flex-col items-center transition-all">
        <div className="hidden md:flex md:flex-col md:items-center">
          <Link to={"/products"}>
            <img
              src={hiddenNav ? logoMin : logo}
              alt="4inventory"
              className={`hidden pt-10 md:block ${!hiddenNav && "md:w-[18vw] lg:w-[14vw]"}`}
            />
            <img
              src={logoMin}
              alt="4inventory"
              className="block pt-10 md:hidden"
            />
          </Link>
          <span className="mt-px text-xs font-thin text-neutral-200">
            1.14.2
          </span>
        </div>

        <Menu hiddenNav={hiddenNav} />

        <Avatar hiddenNav={hiddenNav} />

        <div className="mt-2 hidden md:block">
          <ButtonChooseLanguage />
        </div>
      </div>
    </nav>
  );
}
