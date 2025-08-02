import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getContrastingTextColor } from "../utils/getContrast";
import {
  InputErrors,
  InputField,
  InputIcon,
  InputLabel,
  InputRoot,
} from "./Input";

export function InputCategories({
  register,
  errors,
  isSubmitting,
  resetField,
  categories,
  selectedCategories,
  setSelectedCategories,
  selectedItem,
}) {
  const { t } = useTranslation("input_category");

  const ref = useRef(null);
  const [categoriesSuggestions, setCategoriesSuggestions] = useState([]);
  const [maxTagsLimit, setMaxTagsLimit] = useState(false);
  const tagsLimit = 2;

  //Change input padding when adding/removing tags
  const selectedTagsList = useRef(null);
  const [tagsListWidth, setTagsListWidth] = useState(0);

  useEffect(() => {
    setMaxTagsLimit(selectedCategories.length >= tagsLimit);
  }, [selectedCategories]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setTagsListWidth(0);
      return;
    }

    if (selectedTagsList.current) {
      const { offsetWidth } = selectedTagsList.current;
      setTagsListWidth(offsetWidth);
    }
  }, [selectedCategories]);

  const handleGetCategories = () => {
    const newSuggestions = categories.filter(
      (category) =>
        !selectedCategories.some(
          (selectedCategory) => selectedCategory.id === category.id,
        ),
    );

    setCategoriesSuggestions(newSuggestions);
  };

  const handleSearchCategories = (e) => {
    const value = e.target.value.toLowerCase();

    const newSuggestions = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(value) &&
        value &&
        !selectedCategories.some(
          (selectedCategory) => selectedCategory.id === category.id,
        ),
    );

    setCategoriesSuggestions(newSuggestions);
  };

  const handleSelectCategory = (id) => {
    resetField("category");

    const newCategory = categories.find((category) => category.id === id);

    setSelectedCategories([...selectedCategories, newCategory]);

    setCategoriesSuggestions([]);
  };

  // Add/remove tags using just the keyboard
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSelectCategory(categoriesSuggestions[0].id);
    }

    if (e.key === "Backspace" && e.target.value === "") {
      selectedCategories.length > 0 &&
        handleRemoveCategory(
          selectedCategories[selectedCategories.length - 1].id,
        );
    }
  };

  const handleRemoveCategory = (id) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category.id !== id),
    );
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCategoriesSuggestions([]);
    }
  };

  return (
    <div className="relative w-full">
      <InputLabel htmlFor="item" error={!!errors.category}>
        {t("category_label")}
      </InputLabel>

      <InputRoot
        disabled={isSubmitting || selectedItem?.length <= 0}
        error={!!errors.category}
      >
        <InputField
          {...register("category", {
            maxLength: {
              value: 255,
              message: t("category_max_length"),
            },
          })}
          aria-invalid={errors.category ? "true" : "false"}
          type="text"
          id="category"
          placeholder={
            selectedCategories.length === 0 ? t("category_placeholder") : ""
          }
          onChange={handleSearchCategories}
          onClick={handleGetCategories}
          onKeyDown={handleKeyPress}
          disabled={isSubmitting || maxTagsLimit || selectedItem?.length <= 0}
          autoComplete="off"
          style={{
            paddingInlineStart:
              selectedCategories.length > 0 ? `${tagsListWidth + 4}px` : "",
          }}
        />

        <InputIcon>
          <button
            type="button"
            disabled={isSubmitting || maxTagsLimit || selectedItem?.length <= 0}
            onClick={handleGetCategories}
            className="flex cursor-pointer hover:opacity-60 disabled:cursor-not-allowed disabled:hover:opacity-100"
          >
            <ChevronDown className="size-5" />
          </button>
        </InputIcon>

        {selectedCategories.length > 0 && (
          <ul ref={selectedTagsList} className="absolute flex max-w-1/3 gap-1">
            {selectedCategories.map((category) => {
              return (
                <li
                  key={category.id}
                  style={{ backgroundColor: category.color }}
                  className={`flex max-w-full items-center gap-px rounded-2xl px-2 py-0.5 text-xs drop-shadow-xs ${getContrastingTextColor(category.color)}`}
                >
                  <span className="truncate">{category.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      handleRemoveCategory(category.id);
                    }}
                    disabled={isSubmitting}
                    className="mt-px cursor-pointer transition hover:opacity-80 disabled:pointer-events-none"
                  >
                    <X className="size-3" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </InputRoot>

      {categoriesSuggestions.length > 0 && (
        <div
          ref={ref}
          className="absolute z-50 max-h-36 w-full overflow-y-auto rounded-lg border border-neutral-400 bg-neutral-50 py-2 text-neutral-500 shadow-md transition"
        >
          {categoriesSuggestions.length > 0 && (
            <ul className="flex w-full flex-col justify-items-center gap-px">
              {categoriesSuggestions.map((suggestion, index) => {
                return (
                  <li
                    key={suggestion.id}
                    onClick={() => handleSelectCategory(suggestion.id)}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleSelectCategory(suggestion.id);
                    }}
                    tabIndex={0}
                    className={`cursor-pointer px-4 transition hover:bg-neutral-200 ${index === 0 && "bg-neutral-200"}`}
                  >
                    <div className="py-2">
                      <p className="text-neutral-500">{suggestion.name}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {errors.category && <InputErrors message={errors.category?.message} />}
    </div>
  );
}
