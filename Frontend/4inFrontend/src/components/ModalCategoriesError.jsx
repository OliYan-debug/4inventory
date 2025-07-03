import { Link } from "react-router-dom";
import { Plus, TextSearch } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ModalCategoriesError() {
  const { t } = useTranslation("modal_categories_error");

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fade-in items-center justify-center bg-black/50">
      <div className="flex w-[30vw] flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-red-600/60">
          <TextSearch size={22} color="#dc2626" />
        </span>
        <h1 className="my-2 text-3xl font-bold text-neutral-800">
          {t("modal.title")}
        </h1>
        <p className="text-sm text-neutral-500">{t("modal.text")}</p>
        <Link
          to={"/categories/new"}
          className="mt-6 flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 disabled:cursor-no-drop disabled:opacity-70"
        >
          {t("button.add")}
          <Plus size={20} color="#fafafa" className="ms-2" />
        </Link>
      </div>
    </div>
  );
}
