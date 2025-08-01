import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import { InputField, InputIcon, InputLabel, InputRoot } from "./Input";

export function InputPassword({ register, errors, isSubmitting }) {
  const { t } = useTranslation("input_password");

  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div>
      <div className="w-full">
        <InputLabel htmlFor="password" error={!!errors.password}>
          {t("password_label")}
        </InputLabel>

        <InputRoot disabled={isSubmitting} error={!!errors.password}>
          <InputField
            {...register("password", {
              required: t("password_required"),
              maxLength: {
                value: 20,
                message: t("password_max_length"),
              },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            type={showPassword ? "text" : "password"}
            id="password"
            disabled={isSubmitting}
            placeholder={t("password_placeholder")}
          />

          <InputIcon>
            <button
              type="button"
              className="flex cursor-pointer hover:opacity-80"
              onClick={handleEyeClick}
              aria-label={t("toggle_password_visibility")}
              disabled={isSubmitting}
            >
              {!showPassword ? (
                <Eye className="size-5 text-neutral-500" />
              ) : (
                <EyeOff className="size-5 text-neutral-500" />
              )}
            </button>
          </InputIcon>
        </InputRoot>
      </div>
    </div>
  );
}
