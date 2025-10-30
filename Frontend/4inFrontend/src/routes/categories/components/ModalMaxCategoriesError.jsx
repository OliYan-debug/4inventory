import { Link } from "react-router-dom";
import { TextSearch, Undo2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ModalMaxCategoriesError() {
  const { t } = useTranslation("modal_max_categories");

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 px-4">
      <div className="flex w-full flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[30vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-orange-600/60">
          <TextSearch className="size-5.5 text-orange-600" />
        </span>

        <h1 className="my-2 text-3xl font-bold text-neutral-800">
          {t("modal.title")}
        </h1>

        <p className="text-sm text-neutral-500">{t("modal.text")}</p>

        <Link
          to={"/categories"}
          className="mt-6 flex items-center justify-center rounded-lg bg-orange-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-orange-500 disabled:cursor-no-drop disabled:opacity-70"
        >
          {t("button.back")}
          <Undo2 className="ms-2 size-5" />
        </Link>
      </div>
    </div>
  );
}
