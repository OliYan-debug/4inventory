import { useTranslation } from "react-i18next";
import { InputField, InputLabel, InputRoot } from "@/components/Input";

export function InputName({ register, errors, isSubmitting, value, isActive }) {
  const { t } = useTranslation("input_name");

  return (
    <div className="w-full">
      <InputLabel htmlFor="name" error={!!errors.name}>
        {t("name_label")}
      </InputLabel>

      <InputRoot disabled={isSubmitting} error={!!errors.name}>
        <InputField
          defaultValue={value || ""}
          {...register("name", {
            required: t("name_required"),
            maxLength: {
              value: 30,
              message: t("name_max_length"),
            },
          })}
          aria-invalid={errors.name ? "true" : "false"}
          type="text"
          id="name"
          disabled={isSubmitting || !isActive}
          placeholder={t("name_placeholder")}
        />
      </InputRoot>
    </div>
  );
}
