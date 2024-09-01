import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.svg"
import { ChartColumnBig, PackageOpen } from "lucide-react"

function root() {
  return (
    <div className="bg-neutral-300 w-full h-full p-4 flex flex-col">
      <nav className="bg-neutral-800 w-2/5 rounded-2xl p-4 flex flex-col items-center text-neutral-50">
        <img src={logo} alt="4inventory" className="w-52" />
        <ul className="w-full mt-8 gap-3">
          <li className="hover:bg-neutral-500 py-1 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
            <span className="group-hover/item:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6"></span>
            <Link to={`products`} className="flex items-center">
              <ChartColumnBig size={20} color="#fafafa" className="me-1" />
              Dashboard
            </Link>
          </li>
          <li className="hover:bg-neutral-500 py-1 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
            <span className="group-hover/item:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6"></span>
            <Link to={`products`} className="flex items-top">
              <PackageOpen size={20} color="#fafafa" className="me-1" />
              Products
            </Link>
          </li>
        </ul>
      </nav>

      <div id="content">
        <Outlet />
      </div>
    </div>
  )
}

export default root
