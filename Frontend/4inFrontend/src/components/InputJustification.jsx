import { useTranslation } from "react-i18next";
import { Textarea, TextareaLabel } from "./Textarea";
import { InputErrors } from "./Input";

export function InputJustification({
  register,
  errors,
  isSubmitting,
  selectedItem,
}) {
  const { t } = useTranslation("input_justification");
  const maxLengthValue = 255;

  return (
    <div className="w-full">
      <TextareaLabel htmlFor="justification" error={!!errors.justification}>
        {t("justification_label")}
      </TextareaLabel>

      <Textarea
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
        maxLengthValue={maxLengthValue}
        disabled={isSubmitting || selectedItem.length <= 0}
        error={!!errors.justification}
        placeholder={t("justification_placeholder")}
      />

      {errors.justification && (
        <InputErrors message={errors.justification?.message} />
      )}
    </div>
  );
}
