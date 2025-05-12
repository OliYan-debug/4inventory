import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuantityIncrementDecrement } from "./QuantityIncrementDecrement";

export function InputAdd({
  errors,
  selectedItem,
  control,
  watch,
  setValue,
  clearErrors,
}) {
  const { t } = useTranslation("input_add");

  return (
    <div className="w-full">
      <label htmlFor="quantity" className="text-sm text-neutral-500">
        {t("quantity_label")} ({t("quantity_current")}
        <span className="font-medium"> {selectedItem.quantity}</span>)
      </label>

      <div className="flex gap-2">
        <Controller
          name="quantity"
          control={control}
          defaultValue={0}
          rules={{
            maxLength: {
              value: 20,
              message: t("quantity_max_length"),
            },
            min: {
              value: 1,
              message: t("quantity_min_length"),
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              aria-invalid={errors.quantity ? "true" : "false"}
              type="number"
              id="quantity"
              disabled={selectedItem.length === 0}
              className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.quantity &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            />
          )}
        />

        <QuantityIncrementDecrement
          setValue={setValue}
          watch={watch}
          clearErrors={clearErrors}
          disable={selectedItem.length === 0}
        />
      </div>

      {errors.quantity && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.quantity?.message}
        </p>
      )}
    </div>
  );
}
