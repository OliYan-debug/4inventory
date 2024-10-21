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
      <ul className="mt-4 flex w-full flex-col py-4 md:mt-2 md:flex-col md:gap-3">
        <li className="group/item flex cursor-pointer rounded-lg py-4 font-medium transition hover:bg-neutral-500 hover:font-bold md:py-1">
          <span className="me-4 h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 md:me-6 md:w-2"></span>
          <Link to={`products`} className="block md:flex md:items-center">
            <ChartColumnBig
              size={20}
              color="#fafafa"
              className="me-0 md:me-2"
            />
            <span className="hidden md:block">Dashboard</span>
          </Link>
        </li>

        {/* Products group */}
        <li className="group/item relative flex cursor-pointer rounded-s-lg py-4 font-medium transition hover:bg-neutral-500 hover:font-bold md:py-1">
          <span className="me-4 h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 md:me-6 md:w-2"></span>
          <Link to={`products`} className="flex w-full items-center">
            <PackageOpen size={20} color="#fafafa" className="me-0 md:me-2" />
            <span className="hidden md:block">Products</span>
            <ChevronRight
              size={20}
              color="#fafafa"
              className="me-0 ms-auto transition-all group-hover/item:translate-x-1 md:me-2 md:group-hover/item:translate-x-2"
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
                <Link to={`products/checkin`} className="flex items-center">
                  <PackagePlus size={20} color="#fafafa" className="me-2" />
                  Check-in
                </Link>
              </li>

              <li className="group/subProduct flex cursor-pointer rounded-b-lg py-1 font-medium transition hover:bg-neutral-400 hover:font-bold">
                <span className="me-6 ms-1 h-6 w-2 rounded-md bg-neutral-50 opacity-0 group-hover/subitem:opacity-100"></span>
                <Link to={`products/checkout`} className="flex items-center">
                  <PackageMinus size={20} color="#fafafa" className="me-2" />
                  Check-out
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {/* Products group */}

        {/* Categories group */}
        <li className="group/item relative flex cursor-pointer rounded-s-lg py-4 font-medium transition hover:bg-neutral-500 hover:font-bold md:py-1">
          <span className="me-4 h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 md:me-6 md:w-2"></span>
          <Link to={`categories`} className="flex w-full items-center">
            <Layers size={20} color="#fafafa" className="me-0 md:me-2" />
            <span className="hidden md:block">Categories</span>
            <ChevronRight
              size={20}
              color="#fafafa"
              className="me-0 ms-auto transition-all group-hover/item:translate-x-1 md:me-2 md:group-hover/item:translate-x-2"
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

        <li className="group/item flex cursor-pointer rounded-lg py-4 font-medium transition hover:bg-neutral-500 hover:font-bold md:py-1">
          <span className="me-4 h-6 w-1 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 md:me-6 md:w-2"></span>
          <Link to={`products`} className="block md:flex md:items-center">
            <Settings size={20} color="#fafafa" className="me-0 md:me-2" />
            <span className="hidden md:block">Configurations</span>
          </Link>
        </li>
      </ul>
    </>
  );
}
