import { useEffect, useRef, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getContrastingTextColor } from "../utils/getContrast";

export function InputCategories({
  register,
  errors,
  resetField,
  categories,
  selectedCategories,
  setSelectedCategories,
}) {
  const { t } = useTranslation("input_category");

  const ref = useRef(null);
  const [categoriesSuggestions, setCategoriesSuggestions] = useState([]);
  const tagsLimit = 2;
  const [maxTagsLimit, setMaxTagsLimit] = useState(false);

  useEffect(() => {
    setMaxTagsLimit(selectedCategories.length >= tagsLimit);
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

  //Change input padding when adding/removing tags
  const selectedTagsList = useRef(null);
  const [tagsListWidth, setTagsListWidth] = useState(0);

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

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCategoriesSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="relative w-full">
      <label htmlFor="item" className="text-sm text-neutral-500">
        {t("category_label")}
      </label>
      <div className="relative flex items-center">
        <ChevronDown
          size={22}
          onClick={handleGetCategories}
          className="absolute right-2 cursor-pointer text-neutral-500 hover:opacity-60"
        />
        <input
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
          disabled={maxTagsLimit}
          autoComplete="off"
          style={{ paddingInlineStart: `${tagsListWidth + 16}px` }}
          className={`focus-visible::border-neutral-500 w-full border border-neutral-400 px-4 py-2 text-neutral-500 outline-hidden hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${categoriesSuggestions.length > 0 ? "rounded-t-lg border-b-0" : "rounded-lg"} ${
            errors.category &&
            "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
          }`}
        />

        {selectedCategories.length > 0 && (
          <ul ref={selectedTagsList} className="absolute mx-2 flex gap-1">
            {selectedCategories.map((category) => {
              return (
                <li
                  key={category.id}
                  style={{ backgroundColor: category.color }}
                  className={`flex items-center gap-px rounded-2xl px-2 py-0.5 text-xs drop-shadow-xs ${getContrastingTextColor(category.color)}`}
                >
                  <span>{category.name}</span>
                  <X
                    onClick={() => {
                      handleRemoveCategory(category.id);
                    }}
                    size={12}
                    className="mt-px cursor-pointer transition hover:opacity-80"
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {categoriesSuggestions.length > 0 && (
        <div
          ref={ref}
          className="absolute z-50 max-h-36 w-full overflow-y-auto rounded-b-lg border border-neutral-400 bg-neutral-50 py-2 text-neutral-500 shadow-md transition"
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

      {errors.category && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.category?.message}
        </p>
      )}
    </div>
  );
}
