import { useTranslation } from "react-i18next";

export function InputName({ register, errors, isSubmitting, value, isActive }) {
  const { t } = useTranslation("input_name");

  return (
    <div>
      <div className="relative flex w-full items-center">
        <label
          htmlFor="name"
          className={`absolute bottom-8 ms-2 bg-neutral-50 px-1 text-sm text-neutral-500 ${
            errors.name && "text-red-600"
          }`}
        >
          {t("name_label")}
        </label>

        <input
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
          className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.name &&
            "border-red-600 text-red-600 hover:border-red-600 focus-visible:border-red-600"
          }`}
        />
      </div>
      {errors.name && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.name?.message}
        </p>
      )}
    </div>
  );
}
