import { useTranslation } from "react-i18next";

export function InputUserName({
  register,
  errors,
  isSubmitting,
  value,
  isActive,
}) {
  const { t } = useTranslation("input_username");

  return (
    <div>
      <div className="relative flex w-full items-center">
        <label
          htmlFor="name"
          className={`absolute bottom-8 ms-2 bg-neutral-50 px-1 text-sm text-neutral-500 ${
            errors.name && "text-red-600"
          }`}
        >
          {t("username_label")}
        </label>

        <input
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
          className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-hidden hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.username &&
            "border-red-600 text-red-600 hover:border-red-600 focus-visible:border-red-600"
          }`}
        />
      </div>
      {errors.username && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.username?.message}
        </p>
      )}
    </div>
  );
}
