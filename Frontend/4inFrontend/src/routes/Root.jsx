import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.svg"
import {
  Boxes,
  ChartColumnBig,
  ChevronRight,
  Layers,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  Settings,
} from "lucide-react"

function root() {
  return (
    <div className="bg-neutral-300 max-w-full p-4 flex flex-row gap-4">
      <nav className="bg-neutral-800 w-[36vw] h-auto rounded-2xl flex flex-col items-center text-neutral-50">
        <Link to={"/"}>
          <img src={logo} alt="4inventory" className="w-52 px-4 pt-6" />
        </Link>

        <ul className="w-full mt-4 flex flex-col gap-3 py-4">
          <li className="hover:bg-neutral-500 py-1 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
            <span className="group-hover/item:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6"></span>
            <Link to={`products`} className="flex items-center">
              <ChartColumnBig size={20} color="#fafafa" className="me-2" />
              Dashboard
            </Link>
          </li>

          {/* Products group */}
          <li className="hover:bg-neutral-500 py-1 flex font-medium hover:font-bold rounded-s-lg transition cursor-pointer group/item relative">
            <span className="group-hover/item:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6"></span>
            <Link to={`products`} className="w-full flex items-center">
              <PackageOpen size={20} color="#fafafa" className="me-2" />
              Products
              <ChevronRight
                size={20}
                color="#fafafa"
                className="ms-auto me-2 group-hover/item:translate-x-2 transition-all"
              />
            </Link>
            <div className="w-48 opacity-0 rounded-tr-lg rounded-br-lg rounded-bl-lg bg-neutral-500 absolute top-0 -right-48 invisible -translate-x-2 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 ease-in">
              <ul>
                <li className="hover:bg-neutral-400 py-1 rounded-tr-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                  <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                  <Link to={`products`} className="flex items-center">
                    <Boxes size={20} color="#fafafa" className="me-2" />
                    List Products
                  </Link>
                </li>

                <li className="hover:bg-neutral-400 py-1 rounded-tr-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                  <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                  <Link to={`products/new`} className="flex items-center">
                    <PackagePlus size={20} color="#fafafa" className="me-2" />
                    New Item
                  </Link>
                </li>

                <li className="hover:bg-neutral-400 py-1 flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                  <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                  <Link to={`products`} className="flex items-center">
                    <PackageMinus size={20} color="#fafafa" className="me-2" />
                    Delete Item
                  </Link>
                </li>

                <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                  <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                  <Link to={`products`} className="flex items-center">
                    <PackageSearch size={20} color="#fafafa" className="me-2" />
                    Search Item
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* Products group */}

          <li className="hover:bg-neutral-500 py-1 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
            <span className="group-hover/item:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6"></span>
            <Link to={`products`} className="flex items-center">
              <Layers size={20} color="#fafafa" className="me-2" />
              Categories
            </Link>
          </li>

          <li className="hover:bg-neutral-500 py-1 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
            <span className="group-hover/item:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6"></span>
            <Link to={`products`} className="flex items-center">
              <Settings size={20} color="#fafafa" className="me-2" />
              Configurations
            </Link>
          </li>
        </ul>
      </nav>

      <div id="content" className="w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default root
