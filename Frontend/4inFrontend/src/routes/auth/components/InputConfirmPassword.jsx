import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  InputField,
  InputIcon,
  InputLabel,
  InputRoot,
} from "@/components/Input";

export function InputConfirmPassword({
  register,
  getValues,
  errors,
  invalidPassword,
  isSubmitting,
}) {
  const { t } = useTranslation("input_confirm_password");

  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div
      className={`${
        invalidPassword
          ? "hidden"
          : "md:grid-cols-form-md lg:grid-cols-form-lg animate-fade-in flex flex-col md:grid md:items-center"
      }`}
    >
      <div className="w-full">
        <InputLabel htmlFor="confirmPass" error={!!errors.confirmPass}>
          {t("confirm_password_label")}
        </InputLabel>

        <InputRoot disabled={isSubmitting} error={!!errors.confirmPass}>
          <InputField
            {...register("confirmPass", {
              required: t("confirm_password_required"),
              maxLength: {
                value: 64,
                message: t("confirm_password_max_length"),
              },
              validate: {
                validatePassword: (value) => {
                  if (value !== getValues("createPassword")) {
                    return t("confirm_password_mismatch");
                  }

                  return true;
                },
              },
            })}
            aria-invalid={errors.confirmPass ? "true" : "false"}
            type={showPassword ? "text" : "password"}
            id="confirmPass"
            disabled={isSubmitting}
            placeholder={t("confirm_password_placeholder")}
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
