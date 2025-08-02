import { Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { InputErrors } from "./Input";

export function InputCategoryColor({
  register,
  errors,
  isSubmitting,
  getValues,
  setValue,
  maxCategories,
  updateRandomColor,
  updateColor,
}) {
  const { t } = useTranslation("new_category");

  const [previewColor, setPreviewColor] = useState(getValues("color"));

  useEffect(() => {
    function setRandomColor() {
      let min = 0;
      let max = 255;

      const array = [];

      for (let i = 0; i < 3; i++) {
        array[i] = getRandomIntInclusive(min, max)
          .toString(16)
          .padStart(2, "0");
      }

      let hexColor = `#` + array.toString().replaceAll(",", "");

      if (hexColor.length === 7) {
        setValue("color", hexColor);
        setPreviewColor(hexColor);
      }
    }

    setRandomColor();
  }, [updateColor]);

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="w-full">
      <label htmlFor="color" className="text-sm text-neutral-500">
        {t("form.labels.color")}
      </label>

      <div className="relative flex gap-2">
        <label
          htmlFor="color"
          style={{ backgroundColor: previewColor }}
          data-disabled={isSubmitting || maxCategories}
          className={`z-10 h-10 w-full cursor-pointer rounded-lg border border-neutral-400 bg-red-500 transition hover:border-neutral-500 hover:opacity-70 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 ${
            errors.color &&
            "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
          }`}
        ></label>

        <input
          defaultValue="#ffffff"
          {...register("color")}
          onChange={(e) => {
            setPreviewColor(e.target.value);
          }}
          aria-invalid={errors.color ? "true" : "false"}
          type="color"
          id="color"
          disabled={isSubmitting || maxCategories}
          className="absolute w-32 opacity-0"
        />

        <button
          type="button"
          onClick={updateRandomColor}
          disabled={isSubmitting}
          className="cursor-pointer rounded-lg border border-neutral-400 px-3 outline-hidden transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-neutral-50"
        >
          <Shuffle className="size-5 text-neutral-600" />
        </button>
      </div>

      {errors.color && <InputErrors message={errors.color?.message} />}
    </div>
  );
}
