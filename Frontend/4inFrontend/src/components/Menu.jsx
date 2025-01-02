import { useLocation } from "react-router-dom";
import {
  ChartColumnBig,
  Folder,
  FolderInput,
  FolderOpen,
  Lock,
  LogOut,
  PackageCheck,
  PackageIcon,
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  PackageX,
  UserCircle,
  UserPen,
} from "lucide-react";
import { MenuButton } from "./MenuButton";
import { MenuDropdownButton } from "./MenuDropdownButton";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const productsLinks = [
  { path: "/products", label: "See Items", Icon: PackageCheck, active: true },
  { path: "/products/new", label: "New Item", Icon: PackageIcon, active: true },
  {
    path: "/products/update",
    label: "Update Item",
    Icon: PackageOpen,
    active: true,
  },
  {
    path: "/products/delete",
    label: "Delete Item",
    Icon: PackageX,
    active: true,
  },
  {
    path: "/products/search",
    label: "Search Item",
    Icon: PackageSearch,
    active: true,
  },
  {
    path: "/products/checkin",
    label: "Check-in",
    Icon: PackagePlus,
    active: true,
  },
  {
    path: "/products/checkout",
    label: "Check-out",
    Icon: PackageMinus,
    active: true,
  },
];

const categoriesLinks = [
  {
    path: "/categories",
    label: "See Categories",
    Icon: FolderOpen,
    active: true,
  },
  {
    path: "/categories/new",
    label: "New Category",
    Icon: FolderInput,
    active: true,
  },
];

const userLinks = [
  { path: "", label: "My profile", Icon: UserPen, active: false },
  { path: "", label: "Change password", Icon: Lock, active: false },
  { path: "/logout", label: "Logout", Icon: LogOut, active: true },
];

export function Menu({ hiddenNav }) {
  let location = useLocation();

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "ADMIN");
    }
  }, [user]);

  return (
    <>
      <ul
        className={`flex h-14 w-full justify-evenly sm:mt-2 md:mt-4 md:h-auto md:flex-col md:justify-normal md:py-4 ${hiddenNav ? "md:gap-1" : "md:gap-0"}`}
      >
        {isAdmin && (
          <MenuButton
            label={"DashBoard"}
            path={"/dashboard"}
            Icon={ChartColumnBig}
            hiddenNav={hiddenNav}
            active={location.pathname === "/dashboard"}
          />
        )}

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

        <MenuDropdownButton
          label="User"
          Icon={UserCircle}
          links={userLinks}
          hiddenNav={hiddenNav}
          pathname={location.pathname}
        />
      </ul>
    </>
  );
}
