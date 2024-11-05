import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../components/Logo";

function root() {
  return (
    <div className="m-0 flex max-w-full flex-row bg-neutral-300 p-4">
      <NavBar />

      <div id="content" className="h-full w-full">
        <Logo />
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default root;
