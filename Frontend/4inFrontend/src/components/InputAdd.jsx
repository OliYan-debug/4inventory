import { useTranslation } from "react-i18next";

export function InputAdd({ register, errors, selectedItem }) {
  const { t } = useTranslation("input_add");

  return (
    <div className="w-full">
      <label htmlFor="quantity" className="text-sm text-neutral-500">
        {t("quantity_label")} ({t("quantity_current")}
        <span className="font-medium"> {selectedItem.quantity}</span>)
      </label>
      <input
        defaultValue="0"
        {...register("quantity", {
          required: "Quantity is required",
          max: {
            value: 9999999999,
            message: t("quantity_max_length"),
          },
          min: {
            value: 1,
            message: t("quantity_min_length"),
          },
          valueAsNumber: true,
        })}
        aria-invalid={errors.quantity ? "true" : "false"}
        type="number"
        id="quantity"
        disabled={selectedItem.length === 0}
        className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
          errors.quantity &&
          "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
        }`}
      />
      {errors.quantity && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.quantity?.message}
        </p>
      )}
    </div>
  );
}
