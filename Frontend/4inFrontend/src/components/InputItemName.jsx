import { useTranslation } from "react-i18next";

export function InputItemName({ register, errors }) {
  const { t } = useTranslation("input_item_name");

  return (
    <div className="w-full">
      <label htmlFor="item" className="text-sm text-neutral-500">
        {t("item_label")}
      </label>
      <input
        defaultValue=""
        {...register("item", {
          required: t("item_required"),
          maxLength: {
            value: 20,
            message: t("item_max_length"),
          },
        })}
        aria-invalid={errors.item ? "true" : "false"}
        type="text"
        id="item"
        placeholder={t("item_placeholder")}
        className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
          errors.item &&
          "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible:border-red-600"
        }`}
      />
      {errors.item && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.item?.message}
        </p>
      )}
    </div>
  );
}
