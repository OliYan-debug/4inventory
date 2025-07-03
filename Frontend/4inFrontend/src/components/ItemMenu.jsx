import {
  PackageMinus,
  PackageOpen,
  PackagePlus,
  PackageX,
  Pencil,
} from "lucide-react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export function ItemMenu({ id, quantity, setItemMenuOpen }) {
  const { t } = useTranslation("item");

  const ref = useRef(null);

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "ADMIN");
    }
  }, [user]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setItemMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="absolute left-1 top-5 z-10 animate-fade-in rounded-lg bg-neutral-50 py-2 shadow-lg"
    >
      <ul className="flex w-36 flex-col gap-1 text-neutral-600">
        <li className="flex h-7 w-full cursor-pointer items-center px-4 transition hover:bg-neutral-400 hover:font-medium">
          <Link to={`item/${id}`} className="flex w-full items-center">
            <PackageOpen size={19} className="me-1" />
            {t("menu.see")}
          </Link>
        </li>

        <li className="flex h-7 w-full cursor-pointer items-center px-4 transition hover:bg-neutral-400 hover:font-medium">
          <Link to={`update/${id}`} className="flex w-full items-center">
            <Pencil size={19} className="me-1" />
            {t("menu.edit")}
          </Link>
        </li>

        <li className="flex h-7 w-full cursor-pointer items-center px-4 transition hover:bg-neutral-400 hover:font-medium">
          <Link to={`checkin/${id}`} className="flex w-full items-center">
            <PackagePlus size={19} className="me-1" />
            {t("menu.checkin")}
          </Link>
        </li>

        <li
          className={`flex h-7 w-full items-center px-4 transition ${quantity <= 0 ? "cursor-not-allowed opacity-75 hover:bg-neutral-50 hover:font-normal" : "cursor-pointer hover:bg-neutral-400 hover:font-medium"}`}
        >
          <Link
            to={`checkout/${id}`}
            className={`flex w-full items-center ${quantity <= 0 && "pointer-events-none"}`}
          >
            <PackageMinus size={19} className="me-1" />
            {t("menu.checkout")}
          </Link>
        </li>
        {isAdmin && (
          <li className="flex h-7 w-full cursor-pointer items-center border-t px-4 py-2 text-red-500 transition hover:bg-red-300 hover:font-medium">
            <Link to={`delete/${id}`} className="flex w-full items-center">
              <PackageX size={19} className="me-1" />
              {t("menu.delete")}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
