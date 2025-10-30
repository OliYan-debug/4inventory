import { useEffect, useState } from "react";
import { Link } from "react-router";
import { PackageMinus, PackagePlus, PackageX, PencilIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import useAuth from "@/hooks/useAuth";

export function ItemViewButtons({ item }) {
  const { t } = useTranslation("item_view");
  const { user } = useAuth();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "ADMIN");
    }
  }, [user]);

  return (
    <div className="top-0 right-48 rounded-lg">
      <ul className="flex w-full flex-row gap-1 text-neutral-600 md:w-36 md:flex-col">
        <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-neutral-200 transition hover:bg-neutral-300 hover:font-medium md:w-full md:px-4">
          <Link
            to={`/products/update/${item.id}?from=item`}
            className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
          >
            <PencilIcon size={19} className="me-1" />
            {t("buttons.edit")}
          </Link>
        </li>

        <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-neutral-200 transition hover:bg-neutral-300 hover:font-medium md:w-full md:px-4">
          <Link
            to={`/products/checkin/${item.id}?from=item`}
            className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
          >
            <PackagePlus size={19} className="me-1" />
            {t("buttons.checkIn")}
          </Link>
        </li>
        <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-neutral-200 transition hover:bg-neutral-300 hover:font-medium md:w-full md:px-4">
          <Link
            to={`/products/checkout/${item.id}?from=item`}
            className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
          >
            <PackageMinus size={19} className="me-1" />
            {t("buttons.checkOut")}
          </Link>
        </li>
        {isAdmin && (
          <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-red-200 text-red-600 transition hover:bg-red-300 hover:font-medium md:w-full md:px-4">
            <Link
              to={`/products/delete/${item.id}?from=item`}
              className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
            >
              <PackageX size={19} className="me-1" />
              {t("buttons.delete")}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
