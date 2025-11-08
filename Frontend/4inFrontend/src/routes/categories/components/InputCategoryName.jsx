import { useTranslation } from "react-i18next";
import {
  InputErrors,
  InputField,
  InputLabel,
  InputRoot,
} from "@/components/Input";

export function InputCategoryName({
  register,
  errors,
  isSubmitting,
  maxCategories,
}) {
  const { t } = useTranslation("new_category");

  return (
    <div className="w-full">
      <InputLabel htmlFor="name" error={!!errors.item}>
        {t("form.labels.name")}
      </InputLabel>

      <InputRoot disabled={isSubmitting || maxCategories} error={!!errors.name}>
        <InputField
          defaultValue=""
          {...register("name", {
            required: t("form.name_required"),
            maxLength: {
              value: 40,
              message: t("form.maxLength"),
            },
          })}
          aria-invalid={errors.name ? "true" : "false"}
          type="text"
          id="name"
          disabled={isSubmitting || maxCategories}
        />
      </InputRoot>

      {errors.name && <InputErrors message={errors.name?.message} />}
    </div>
  );
}
