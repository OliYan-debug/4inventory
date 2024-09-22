import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function root() {
  return (
    <div className="flex max-w-full flex-row gap-4 bg-neutral-300 p-4">
      <NavBar />

      <div id="content" className="h-full w-full">
        <Outlet />
      </div>
      <ToastContainer />
    </div>
  );
}

export default root;
