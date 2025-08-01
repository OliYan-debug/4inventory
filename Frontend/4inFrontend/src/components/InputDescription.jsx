import { useTranslation } from "react-i18next";
import { Textarea, TextareaLabel } from "./Textarea";
import { InputErrors } from "./Input";

export function InputDescription({
  register,
  errors,
  isSubmitting,
  itemId,
  selectedItem,
}) {
  const { t } = useTranslation("input_description");
  const maxLengthValue = 255;

  return (
    <div className="w-full">
      <TextareaLabel htmlFor="description" error={!!errors.description}>
        {t("description_label")}
      </TextareaLabel>

      <Textarea
        defaultValue={itemId ? selectedItem.description : ""}
        {...register("description", {
          maxLength: {
            value: maxLengthValue,
            message: t("description_max_length"),
          },
        })}
        aria-invalid={errors.description ? "true" : "false"}
        id="description"
        maxLengthValue={maxLengthValue}
        disabled={isSubmitting || selectedItem?.length <= 0}
        error={!!errors.description}
        placeholder={t("description_placeholder")}
      />

      {errors.description && (
        <InputErrors message={errors.description?.message} />
      )}
    </div>
  );
}
