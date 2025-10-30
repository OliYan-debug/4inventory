import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { QuantityIncrementDecrement } from "./QuantityIncrementDecrement";
import {
  InputErrors,
  InputField,
  InputLabel,
  InputRoot,
} from "@/components/Input";

export function InputQuantity({
  control,
  watch,
  setValue,
  clearErrors,
  errors,
  isSubmitting,
}) {
  const { t } = useTranslation("input_quantity");

  return (
    <div className="w-full">
      <InputLabel htmlFor="quantity" error={!!errors.quantity}>
        {t("quantity_label")}
      </InputLabel>

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
              value: 0,
              message: t("invalid_value"),
            },
          }}
          render={({ field }) => (
            <div className="w-full">
              <InputRoot disabled={isSubmitting} error={!!errors.quantity}>
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
            disable={isSubmitting}
          />
        </div>
      </div>

      {errors.quantity && <InputErrors message={errors.quantity?.message} />}
    </div>
  );
}
