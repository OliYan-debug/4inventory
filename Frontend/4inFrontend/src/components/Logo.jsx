import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export function Logo() {
  return (
    <div
      className={
        "mb-4 flex w-full rounded-xl bg-neutral-800 text-neutral-50 transition-all md:hidden"
      }
    >
      <div className="flex w-full flex-col items-center py-2 transition-all">
        <div className="flex flex-col items-center">
          <Link to={"/"}>
            <img src={logo} alt="4inventory" />
          </Link>
          <span className="mt-px text-xs font-thin text-neutral-200">
            1.9.0
          </span>
        </div>
      </div>
    </div>
  );
}
