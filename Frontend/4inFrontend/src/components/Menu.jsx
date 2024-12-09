import {
  ChartColumnBig,
  Folder,
  FolderInput,
  FolderOpen,
  PackageCheck,
  PackageIcon,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  PackageX,
  Settings,
} from "lucide-react";
import MenuButton from "./MenuButton";
import MenuDropdownButton from "./MenuDropdownButton";
import { useLocation } from "react-router-dom";

const productsLinks = [
  { path: "/products", label: "See Items", Icon: PackageCheck },
  { path: "new", label: "New Item", Icon: PackageIcon },
  { path: "update", label: "Update Item", Icon: PackageOpen },
  { path: "delete", label: "Delete Item", Icon: PackageX },
  { path: "search", label: "Search Item", Icon: PackageSearch },
  { path: "checkin", label: "Check-in", Icon: PackagePlus },
  { path: "checkout", label: "Check-out", Icon: PackageMinus },
];

const categoriesLinks = [
  { path: "categories", label: "See Categorys", Icon: FolderOpen },
  { path: "categories/new", label: "New Category", Icon: FolderInput },
];

export default function Menu({ hiddenNav }) {
  let location = useLocation();

  return (
    <>
      <ul
        className={`flex h-14 w-full justify-around sm:mt-2 md:mt-4 md:h-auto md:flex-col md:justify-normal md:py-4 ${hiddenNav ? "md:gap-1" : "md:gap-0"}`}
      >
        <MenuButton
          label={"DashBoard"}
          path={""}
          Icon={ChartColumnBig}
          hiddenNav={hiddenNav}
          active={location.pathname === "/dashboard"}
        />

        <MenuDropdownButton
          label="Products"
          Icon={PackageOpen}
          links={productsLinks}
          hiddenNav={hiddenNav}
          pathname={location.pathname}
        />

        <MenuDropdownButton
          label="Categories"
          Icon={Folder}
          links={categoriesLinks}
          hiddenNav={hiddenNav}
          pathname={location.pathname}
        />

        <MenuButton
          label={"Settings"}
          path={""}
          Icon={Settings}
          hiddenNav={hiddenNav}
          active={location.pathname === "/settings"}
        />
      </ul>
    </>
  );
}
