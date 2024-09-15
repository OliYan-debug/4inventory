import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import logoMin from "../assets/logoMin.svg";
import { useState } from "react";
import HiddenNav from "./HiddenNav";
import NormalNav from "./NormalNav";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function NavBar() {
  const [hiddenNav, setHiddenNav] = useState(false);

  function handleHiddenShowNavbar() {
    hiddenNav ? setHiddenNav(false) : setHiddenNav(true);
  }

  return (
    <nav
      className={`relative bg-neutral-800 ${
        hiddenNav ? "w-16" : "w-[24vw]"
      } h-auto rounded-2xl text-neutral-50 transition-all duration-500`}
    >
      <div className="absolute flex w-full justify-end p-2">
        <button type="button" className="transition hover:opacity-50">
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
        <Link to={"/"}>
          <img
            src={hiddenNav ? logoMin : logo}
            alt="4inventory"
            className="pt-10"
          />
        </Link>
        {hiddenNav ? <HiddenNav /> : <NormalNav />}
      </div>
    </nav>
  );
}
