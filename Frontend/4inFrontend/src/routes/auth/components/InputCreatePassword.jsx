import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  InputField,
  InputIcon,
  InputLabel,
  InputRoot,
} from "@/components/Input";

export function InputCreatePassword({
  register,
  errors,
  setInvalidPassword,
  isSubmitting,
}) {
  const { t } = useTranslation("input_create_password");

  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div className="w-full">
      <InputLabel htmlFor="createPassword" error={!!errors.createPassword}>
        {t("password_label")}
      </InputLabel>

      <InputRoot disabled={isSubmitting} error={!!errors.createPassword}>
        <InputField
          {...register("createPassword", {
            required: t("password_required"),
            maxLength: {
              value: 64,
              message: t("password_max_length"),
            },
            minLength: {
              value: 8,
              message: t("password_min_length"),
            },
            validate: {
              validatePassword: (value) => {
                const lowerCaseLetters = /[a-z]/;
                if (!value.match(lowerCaseLetters)) {
                  return t("password_lowercase");
                }

                const upperCaseLetters = /[A-Z]/;
                if (!value.match(upperCaseLetters)) {
                  return t("password_uppercase");
                }

                const numbers = /[0-9]/;
                if (!value.match(numbers)) {
                  return t("password_numbers");
                }

                const specialCharacters = /[!@#$%^&*()-=_+{};':"|,.<>?]/;
                if (!value.match(specialCharacters)) {
                  return t("password_special_characters");
                }

                setInvalidPassword(false);
                return true;
              },
            },
          })}
          aria-invalid={errors.createPassword ? "true" : "false"}
          type={showPassword ? "text" : "password"}
          id="createPassword"
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
  );
}
