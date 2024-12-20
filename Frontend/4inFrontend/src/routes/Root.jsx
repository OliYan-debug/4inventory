import { Outlet } from "react-router-dom";
import { Logo } from "../components/Logo";
import { NavBar } from "../components/NavBar";

function root() {
  return (
    <div className="m-0 flex max-w-full flex-row bg-neutral-300 p-4">
      <NavBar />

      <div id="content" className="h-full w-full">
        <Logo />
        <Outlet />
      </div>
    </div>
  );
}

export default root;
