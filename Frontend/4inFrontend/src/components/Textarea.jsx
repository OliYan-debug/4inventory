import { useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

export function Textarea({
  className,
  maxLengthValue = 255,
  error = false,
  ...props
}) {
  const { t } = useTranslation("input_description");
  const [value, setValue] = useState("");

  function handleChangeValue(e) {
    let value = e.target.value;

    if (value === "") {
      setValue("");
    } else {
      setValue(value);
    }
  }

  return (
    <div className="relative flex items-end justify-end">
      <textarea
        data-error={error}
        onInput={(e) => {
          handleChangeValue(e);
        }}
        maxLength={maxLengthValue}
        className={twMerge(
          "flex min-h-36 w-full flex-1 resize-none items-center gap-2 rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-0 transition duration-300 placeholder:text-sm placeholder:text-neutral-400 hover:border-neutral-500 disabled:cursor-not-allowed disabled:bg-neutral-100/50 disabled:hover:border-neutral-400 data-[error=true]:border-red-600 data-[error=true]:bg-red-200/40 data-[error=true]:text-red-400 data-[error=true]:placeholder:text-red-400 disabled:data-[error=true]:hover:border-red-600",
          className,
        )}
        {...props}
      />

      {value !== "" && (
        <span
          className={`animate-fade-in pointer-events-none absolute mr-2 mb-1 text-xs text-neutral-500 italic opacity-85 transition ${maxLengthValue - value.length <= 20 && "font-medium"}`}
        >
          {maxLengthValue - value.length} {t("description_characters_left")}
        </span>
      )}
    </div>
  );
}

export function TextareaLabel({ error = false, ...props }) {
  return (
    <label
      data-error={error}
      className="pb-1.5 text-sm text-neutral-500 data-[error=true]:text-red-400"
      {...props}
    />
  );
}
