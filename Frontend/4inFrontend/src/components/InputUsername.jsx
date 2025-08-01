import { useTranslation } from "react-i18next";
import { InputField, InputLabel, InputRoot } from "./Input";

export function InputUserName({
  register,
  errors,
  isSubmitting,
  value,
  isActive,
}) {
  const { t } = useTranslation("input_username");

  return (
    <div className="w-full">
      <InputLabel htmlFor="username" error={!!errors.username}>
        {t("username_label")}
      </InputLabel>

      <InputRoot disabled={isSubmitting} error={!!errors.username}>
        <InputField
          defaultValue={value || ""}
          {...register("username", {
            required: t("username_required"),
            maxLength: {
              value: 20,
              message: t("username_max_length"),
            },
          })}
          aria-invalid={errors.username ? "true" : "false"}
          type="text"
          id="username"
          disabled={isSubmitting || !isActive}
          placeholder={t("username_placeholder")}
        />
      </InputRoot>
    </div>
  );
}
