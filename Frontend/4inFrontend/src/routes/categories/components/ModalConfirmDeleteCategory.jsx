import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";

export function ModalConfirmDeleteCategory({
  setCheckDeleteOpen,
  handleDelete,
}) {
  const { t } = useTranslation("category");

  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCheckDeleteOpen(false);
    }
  };

  return (
    <div
      ref={ref}
      className="animate-fade-in absolute top-4 right-4 z-30 flex flex-col items-center rounded-lg rounded-tr-none border-red-500 bg-neutral-50 p-4 shadow-lg"
    >
      <span className="absolute -top-1 -right-1 size-3 animate-ping rounded-full bg-red-500 opacity-75"></span>
      <span className="absolute -top-1 -right-1 size-3 rounded-full bg-red-500"></span>

      <h2 className="font-medium text-neutral-600">
        {t("confirmDelete.title")}
      </h2>
      <p className="text-sm text-neutral-400">{t("confirmDelete.warning")}</p>
      <div className="mt-4 flex h-10 w-48 gap-1">
        <Button
          type="button"
          onClick={() => setCheckDeleteOpen(false)}
          className="w-32"
        >
          {t("confirmDelete.buttons.cancel")}
        </Button>

        <Button type="button" onClick={handleDelete} className="bg-red-500">
          {t("confirmDelete.buttons.confirm")}
        </Button>
      </div>
    </div>
  );
}
