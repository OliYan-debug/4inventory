import {
  ChartColumnBig,
  ChevronRight,
  Layers,
  PackageIcon,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  PackageX,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NormalNav() {
  return (
    <>
      <ul className="mt-2 flex w-full flex-col gap-3 py-4">
        <li className="group/item flex cursor-pointer rounded-lg py-1 font-medium transition hover:bg-neutral-500 hover:font-bold">
          <span className="me-6 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100"></span>
          <Link to={`products`} className="flex items-center">
            <ChartColumnBig size={20} color="#fafafa" className="me-2" />
            Dashboard
          </Link>
        </li>

        {/* Products group */}
        <li className="group/item relative flex cursor-pointer rounded-s-lg py-1 font-medium transition hover:bg-neutral-500 hover:font-bold">
          <span className="me-6 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100"></span>
          <Link to={`products`} className="flex w-full items-center">
            <PackageOpen size={20} color="#fafafa" className="me-2" />
            Products
            <ChevronRight
              size={20}
              color="#fafafa"
              className="me-2 ms-auto transition-all group-hover/item:translate-x-2"
            />
          </Link>
          <div className="invisible absolute -right-48 top-0 z-20 w-48 -translate-x-2 rounded-bl-lg rounded-br-lg rounded-tr-lg bg-neutral-500 opacity-0 shadow-lg transition-all duration-150 ease-in group-hover/item:visible group-hover/item:translate-x-0 group-hover/item:opacity-100">
            <ul>
              <li className="group/subProduct flex cursor-pointer rounded-tr-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100"></span>
                <Link to={`products/new`} className="flex items-center">
                  <PackageIcon size={20} color="#fafafa" className="me-2" />
                  New Item
                </Link>
              </li>

              <li className="group/subProduct flex cursor-pointer py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100"></span>
                <Link to={`products/delete`} className="flex items-center">
                  <PackageX size={20} color="#fafafa" className="me-2" />
                  Delete Item
                </Link>
              </li>

              <li className="group/subProduct flex cursor-pointer rounded-b-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100"></span>
                <Link to={`products/search`} className="flex items-center">
                  <PackageSearch size={20} color="#fafafa" className="me-2" />
                  Search Item
                </Link>
              </li>

              <li className="group/subProduct flex cursor-pointer rounded-b-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100"></span>
                <Link to={`products/entry`} className="flex items-center">
                  <PackagePlus size={20} color="#fafafa" className="me-2" />
                  Item Entry
                </Link>
              </li>

              <li className="group/subProduct flex cursor-pointer rounded-b-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100"></span>
                <Link to={`products/exit`} className="flex items-center">
                  <PackageMinus size={20} color="#fafafa" className="me-2" />
                  Item Exit
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {/* Products group */}

        {/* Categories group */}
        <li className="group/item relative flex cursor-pointer rounded-s-lg py-1 font-medium transition hover:bg-neutral-500 hover:font-bold">
          <span className="me-6 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100"></span>
          <Link to={`categories`} className="flex w-full items-center">
            <Layers size={20} color="#fafafa" className="me-2" />
            Categories
            <ChevronRight
              size={20}
              color="#fafafa"
              className="me-2 ms-auto transition-all group-hover/item:translate-x-2"
            />
          </Link>

          <div className="invisible absolute -right-48 top-0 z-20 w-48 -translate-x-2 rounded-bl-lg rounded-br-lg rounded-tr-lg bg-neutral-500 opacity-0 shadow-lg transition-all duration-150 ease-in group-hover/item:visible group-hover/item:translate-x-0 group-hover/item:opacity-100">
            <ul>
              <li className="group/subCategory flex cursor-pointer rounded-tr-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subCategory:opacity-100"></span>
                <Link to={`categories/new`} className="flex items-center">
                  <PackageIcon size={20} color="#fafafa" className="me-2" />
                  New Category
                </Link>
              </li>

              <li className="group/subCategory flex cursor-pointer rounded-b-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subCategory:opacity-100"></span>
                <Link to={`categories/search`} className="flex items-center">
                  <PackageSearch size={20} color="#fafafa" className="me-2" />
                  Search Category
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {/* Categories group */}

        <li className="group/item flex cursor-pointer rounded-lg py-1 font-medium transition hover:bg-neutral-500 hover:font-bold">
          <span className="me-6 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100"></span>
          <Link to={`products`} className="flex items-center">
            <Settings size={20} color="#fafafa" className="me-2" />
            Configurations
          </Link>
        </li>
      </ul>
    </>
  );
}
