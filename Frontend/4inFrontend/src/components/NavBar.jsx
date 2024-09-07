import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import logoMin from "../assets/logoMin.svg"
import {
  ChartColumnBig,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Layers,
  PackageIcon,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  PackageX,
  Settings,
} from "lucide-react"
import { useState } from "react"

export default function NavBar() {
  const [hiddenNav, setHiddenNav] = useState(false)

  function handleHiddenShowNavbar() {
    hiddenNav ? setHiddenNav(false) : setHiddenNav(true)
  }

  return (
    <nav
      className={`bg-neutral-800 relative ${
        hiddenNav ? "w-16" : "w-[24vw]"
      } h-auto rounded-2xl  text-neutral-50 transition-all duration-500`}
    >
      <div className="absolute w-full flex justify-end p-2">
        <button type="button" className="hover:opacity-50 transition">
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

      <div className="w-full flex flex-col items-center transition-all">
        <Link to={"/"}>
          <img
            src={hiddenNav ? logoMin : logo}
            alt="4inventory"
            className="pt-10"
          />
        </Link>
        {hiddenNav ? (
          <ul className="w-full mt-4 flex flex-col py-4">
            <li className="hover:bg-neutral-500 py-4 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
              <span className="group-hover/item:opacity-100 bg-neutral-50 me-4 rounded-md w-1 h-6 opacity-0"></span>
              <Link to={`products`}>
                <ChartColumnBig size={26} color="#fafafa" />
                {/* Dashboard */}
              </Link>
            </li>

            {/* Products group */}
            <li className="hover:bg-neutral-500 py-4 flex rounded-s-lg font-medium hover:font-bold transition cursor-pointer group/item relative">
              <span className="group-hover/item:opacity-100 bg-neutral-50 me-4 rounded-md w-1 h-6 opacity-0"></span>
              <Link to={`products`} className="w-full flex items-center">
                <PackageOpen size={24} color="#fafafa" />
                {/* Products */}
                <ChevronRight
                  size={14}
                  color="#fafafa"
                  className="ms-auto group-hover/item:translate-x-1 transition-all"
                />
              </Link>
              <div className="w-48 opacity-0 rounded-tr-lg rounded-br-lg rounded-bl-lg bg-neutral-500 shadow-lg absolute z-20 top-0 -right-48 invisible -translate-x-2 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 ease-in">
                <ul>
                  <li className="hover:bg-neutral-400 py-1 rounded-tr-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/new`} className="flex items-center">
                      <PackageIcon size={20} color="#fafafa" className="me-2" />
                      New Item
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/delete`} className="flex items-center">
                      <PackageX size={20} color="#fafafa" className="me-2" />
                      Delete Item
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/search`} className="flex items-center">
                      <PackageSearch
                        size={20}
                        color="#fafafa"
                        className="me-2"
                      />
                      Search Item
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/entry`} className="flex items-center">
                      <PackagePlus size={20} color="#fafafa" className="me-2" />
                      Item Entry
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/exit`} className="flex items-center">
                      <PackageMinus
                        size={20}
                        color="#fafafa"
                        className="me-2"
                      />
                      Item Exit
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            {/* Products group */}

            <li className="hover:bg-neutral-500 py-4 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
              <span className="group-hover/item:opacity-100 bg-neutral-50 me-4 rounded-md w-1 h-6 opacity-0"></span>
              <Link to={`products`} className="flex items-center">
                <Layers size={24} color="#fafafa" />
                {/* Categories */}
              </Link>
            </li>

            <li className="hover:bg-neutral-500 py-4 flex rounded-lg font-medium hover:font-bold transition cursor-pointer group/item">
              <span className="group-hover/item:opacity-100 bg-neutral-50 me-4 rounded-md w-1 h-6 opacity-0"></span>
              <Link to={`products`} className="flex items-center">
                <Settings size={24} color="#fafafa" />
                {/* Configurations */}
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="w-full mt-2 flex flex-col gap-3 py-4">
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
              <div className="w-48 opacity-0 rounded-tr-lg rounded-br-lg rounded-bl-lg bg-neutral-500 shadow-lg absolute z-20 top-0 -right-48 invisible -translate-x-2 group-hover/item:visible group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-150 ease-in">
                <ul>
                  <li className="hover:bg-neutral-400 py-1 rounded-tr-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/new`} className="flex items-center">
                      <PackageIcon size={20} color="#fafafa" className="me-2" />
                      New Item
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/delete`} className="flex items-center">
                      <PackageX size={20} color="#fafafa" className="me-2" />
                      Delete Item
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/search`} className="flex items-center">
                      <PackageSearch
                        size={20}
                        color="#fafafa"
                        className="me-2"
                      />
                      Search Item
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/entry`} className="flex items-center">
                      <PackagePlus size={20} color="#fafafa" className="me-2" />
                      Item Entry
                    </Link>
                  </li>

                  <li className="hover:bg-neutral-400 py-1 rounded-b-lg flex font-medium hover:font-bold transition cursor-pointer group/subitem">
                    <span className="group-hover/subitem:opacity-100 bg-neutral-50 rounded-md w-2 h-6 opacity-0 me-6 ms-1"></span>
                    <Link to={`products/exit`} className="flex items-center">
                      <PackageMinus
                        size={20}
                        color="#fafafa"
                        className="me-2"
                      />
                      Item Exit
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
        )}
      </div>
    </nav>
  )
}
