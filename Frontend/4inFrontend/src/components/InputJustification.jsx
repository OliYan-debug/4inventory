import { useTranslation } from "react-i18next";

export function InputJustification({ register, errors, selectedItem, watch }) {
  const { t } = useTranslation("input_justification");

  return (
    <div className="w-full">
      <label htmlFor="justification" className="text-sm text-neutral-500">
        {t("justification_label")}
      </label>

      <div className="relative flex items-end justify-end">
        <textarea
          defaultValue=""
          {...register("justification", {
            required: t("justification_required"),
            maxLength: {
              value: 255,
              message: t("justification_max_length"),
            },
          })}
          aria-invalid={errors.justification ? "true" : "false"}
          type="text"
          id="justification"
          maxLength={255}
          placeholder={t("justification_placeholder")}
          disabled={selectedItem.length === 0}
          className={`h-26 focus-visible::border-neutral-500 h-36 w-full resize-none rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.justification &&
            "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
          }`}
        ></textarea>

        <span className="pointer-events-none absolute mb-1 mr-2 text-xs italic text-neutral-500 opacity-85">
          {255 - watch("justification", "").length}{" "}
          {t("justification_characters_left")}
        </span>
      </div>

      {errors.justification && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.justification?.message}
        </p>
      )}
    </div>
  );
}
