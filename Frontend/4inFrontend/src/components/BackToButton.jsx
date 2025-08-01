import { Undo2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function BackToButton({ itemId, from, disabled = false }) {
  const { t } = useTranslation("update_item");
  const navigate = useNavigate();

  const handleBack = () => {
    if (from === "item") {
      navigate(`/products/item/${itemId}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      disabled={disabled}
      className="flex cursor-pointer items-center font-semibold text-neutral-400 hover:underline hover:opacity-80 disabled:cursor-not-allowed disabled:no-underline disabled:hover:opacity-100"
    >
      {from === "item" ? t("buttons.backToItem") : t("buttons.backToProducts")}
      <Undo2 className="ms-1 size-5 text-neutral-400" />
    </button>
  );
}
