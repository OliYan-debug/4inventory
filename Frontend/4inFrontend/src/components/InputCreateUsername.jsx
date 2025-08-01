import { useTranslation } from "react-i18next";
import { InputField, InputLabel, InputRoot } from "./Input";

export function InputCreateUserName({ register, errors, isSubmitting }) {
  const { t } = useTranslation("input_create_username");

  const reservedWords = ["admin", "root", "superuser", "superadmin", "user"];

  return (
    <div className="w-full">
      <InputLabel htmlFor="username" error={!!errors.username}>
        {t("username_label")}
      </InputLabel>

      <InputRoot disabled={isSubmitting} error={!!errors.username}>
        <InputField
          {...register("username", {
            required: t("username_required"),
            maxLength: {
              value: 20,
              message: t("username_max_length"),
            },
            minLength: {
              value: 3,
              message: t("username_min_length"),
            },
            validate: {
              validate: (value) => {
                if (reservedWords.includes(value.toLowerCase())) {
                  return t("username_reserved");
                }
                const regex = /^[a-zA-Z0-9._-]+$/;
                if (!value.match(regex)) {
                  return t("username_invalid");
                }

                return true;
              },
            },
          })}
          aria-invalid={errors.username ? "true" : "false"}
          type="text"
          id="username"
          disabled={isSubmitting}
          placeholder={t("username_placeholder")}
        />
      </InputRoot>
    </div>
  );
}
