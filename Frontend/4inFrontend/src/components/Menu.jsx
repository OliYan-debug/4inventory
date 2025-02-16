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
  Shield,
  UserCircle,
  UserPen,
} from "lucide-react";
import { MenuButton } from "./MenuButton";
import { MenuDropdownButton } from "./MenuDropdownButton";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function Menu({ hiddenNav }) {
  const { t } = useTranslation("menu");

  const productsLinks = [
    {
      path: "/products",
      label: t("links.seeItems"),
      Icon: PackageCheck,
      active: true,
      role: "USER",
    },
    {
      path: "/products/new",
      label: t("links.newItem"),
      Icon: PackageIcon,
      active: true,
      role: "USER",
    },
    {
      path: "/products/update",
      label: t("links.updateItem"),
      Icon: PackageOpen,
      active: true,
      role: "USER",
    },
    {
      path: "/products/delete",
      label: t("links.deleteItem"),
      Icon: PackageX,
      active: true,
      role: "ADMIN",
    },
    {
      path: "/products/search",
      label: t("links.search"),
      Icon: PackageSearch,
      active: true,
      role: "USER",
    },
    {
      path: "/products/checkin",
      label: t("links.checkin"),
      Icon: PackagePlus,
      active: true,
      role: "USER",
    },
    {
      path: "/products/checkout",
      label: t("links.checkout"),
      Icon: PackageMinus,
      active: true,
      role: "USER",
    },
  ];

  const categoriesLinks = [
    {
      path: "/categories",
      label: t("links.seeCategories"),
      Icon: FolderOpen,
      active: true,
      role: "USER",
    },
    {
      path: "/categories/new",
      label: t("links.newCategory"),
      Icon: FolderInput,
      active: true,
      role: "USER",
    },
  ];

  const userLinks = [
    {
      path: "/user/profile",
      label: t("links.myProfile"),
      Icon: UserPen,
      active: true,
      role: "USER",
    },
    {
      path: "/user/password",
      label: t("links.changePassword"),
      Icon: Lock,
      active: true,
      role: "USER",
    },
    {
      path: "/logout",
      label: t("links.logout"),
      Icon: LogOut,
      active: true,
      role: "USER",
    },
  ];

  const adminLinks = [
    {
      path: "/admin/users",
      label: t("links.users"),
      Icon: UserPen,
      active: true,
      role: "ADMIN",
    },
  ];

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
        <MenuButton
          label={t("dashboard")}
          path={"/dashboard"}
          Icon={ChartColumnBig}
          hiddenNav={hiddenNav}
          active={location.pathname === "/dashboard"}
        />

        <MenuDropdownButton
          label={t("products")}
          Icon={PackageOpen}
          links={productsLinks}
          hiddenNav={hiddenNav}
          pathname={location.pathname}
        />

        <MenuDropdownButton
          label={t("categories")}
          Icon={Folder}
          links={categoriesLinks}
          hiddenNav={hiddenNav}
          pathname={location.pathname}
        />

        {isAdmin && (
          <MenuDropdownButton
            label={t("administration")}
            Icon={Shield}
            links={adminLinks}
            hiddenNav={hiddenNav}
            pathname={location.pathname}
          />
        )}

        <MenuDropdownButton
          label={t("user")}
          Icon={UserCircle}
          links={userLinks}
          hiddenNav={hiddenNav}
          pathname={location.pathname}
        />
      </ul>
    </>
  );
}
