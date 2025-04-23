import { SearchX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function NotFound() {
  const { t } = useTranslation("not_found");

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-neutral-50">
      <h1 className="text-8xl font-bold text-neutral-800">404</h1>
      <h3 className="text-2xl font-semibold">{t("title")}</h3>
      <p className="mb-4 mt-2 text-neutral-500">{t("subtitle")}</p>

      <SearchX className="size-24 text-neutral-800" />

      <Link
        to={"/"}
        className="my-2 rounded-lg bg-neutral-600 px-3 py-2 font-medium text-neutral-50 transition hover:opacity-80"
      >
        {t("button.back")}
      </Link>
    </div>
  );
}
