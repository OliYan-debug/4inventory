import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { QuantityIncrementDecrement } from "./QuantityIncrementDecrement";
import { InputErrors, InputField, InputLabel, InputRoot } from "./Input";

export function InputAdd({
  errors,
  isSubmitting,
  selectedItem,
  control,
  watch,
  setValue,
  clearErrors,
}) {
  const { t } = useTranslation("input_add");

  return (
    <div className="w-full">
      <InputLabel htmlFor="quantity" error={!!errors.quantity}>
        {t("quantity_label")} ({t("quantity_current")}{" "}
        <span className="font-medium"> {selectedItem.quantity ?? 0}</span>)
      </InputLabel>

      <div className="flex gap-2">
        <Controller
          name="quantity"
          control={control}
          defaultValue={0}
          rules={{
            required: t("quantity_required"),
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
            <div className="w-full">
              <InputRoot
                disabled={isSubmitting || selectedItem <= 0}
                error={!!errors.quantity}
              >
                <InputField
                  {...field}
                  aria-invalid={errors.quantity ? "true" : "false"}
                  type="number"
                  id="quantity"
                />
              </InputRoot>
            </div>
          )}
        />

        <div className="flex h-10 w-full gap-1 md:w-1/3">
          <QuantityIncrementDecrement
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
            disable={isSubmitting || selectedItem <= 0}
          />
        </div>
      </div>

      {errors.quantity && <InputErrors message={errors.quantity?.message} />}
    </div>
  );
}
