import { Undo2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export function BackToButton({ itemId, from }) {
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
      className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
    >
      {from === "item" ? t("buttons.backToItem") : t("buttons.backToProducts")}
      <Undo2 size={20} className="ms-1 text-neutral-400" />
    </button>
  );
}
