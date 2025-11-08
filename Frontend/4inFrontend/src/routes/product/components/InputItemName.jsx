import { useTranslation } from "react-i18next";
import {
  InputField,
  InputLabel,
  InputRoot,
  InputErrors,
} from "@/components/Input";

export function InputItemName({ register, errors, isSubmitting }) {
  const { t } = useTranslation("input_item_name");

  return (
    <div className="w-full">
      <InputLabel htmlFor="item" error={!!errors.item}>
        {t("item_label")}
      </InputLabel>

      <InputRoot disabled={isSubmitting} error={!!errors.item}>
        <InputField
          {...register("item", {
            required: t("item_required"),
            maxLength: {
              value: 50,
              message: t("item_max_length"),
            },
          })}
          disabled={isSubmitting}
          aria-invalid={errors.item ? "true" : "false"}
          type="text"
          id="item"
          placeholder={t("item_placeholder")}
        />
      </InputRoot>

      {errors.item && <InputErrors message={errors.item?.message} />}
    </div>
  );
}
