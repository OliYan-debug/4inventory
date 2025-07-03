import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTranslation } from "react-i18next";

export function InputPassword({ register, errors, isSubmitting }) {
  const { t } = useTranslation("input_password");

  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div>
      <div className="relative flex w-full items-center">
        <label
          htmlFor="password"
          className={`absolute bottom-8 ms-2 bg-neutral-50 px-1 text-sm text-neutral-500 ${
            errors.password && "text-red-600"
          }`}
        >
          {t("password_label")}
        </label>

        <input
          defaultValue=""
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
          className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-hidden hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.password &&
            "border-red-600 text-red-600 hover:border-red-600 focus-visible:border-red-600"
          }`}
        />

        <button
          type="button"
          className="absolute right-2 hover:opacity-80"
          onClick={handleEyeClick}
          aria-label={t("toggle_password_visibility")}
          disabled={isSubmitting}
        >
          {!showPassword ? (
            <Eye className="text-neutral-500" size={19} />
          ) : (
            <EyeOff className="text-neutral-500" size={19} />
          )}
        </button>
      </div>
      {errors.password && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.password?.message}
        </p>
      )}
    </div>
  );
}
