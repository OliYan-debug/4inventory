import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { X } from "lucide-react";
import { ItemSearch } from "./ItemSearch";
import { useTranslation } from "react-i18next";

export function InputSearchItems({
  register,
  errors,
  setValue,
  clearErrors,
  reset,
  itemId,
  selectedItem,
  setSelectedItem,
  isSearchable,
}) {
  const { t } = useTranslation("input_item_name");

  let location = useLocation();
  let pathname = location.pathname;

  const ref = useRef(null);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setItems("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleSearchProduct = async (event) => {
    let search = event.target.value;

    errors && clearErrors();

    if (search === "") {
      return;
    }

    try {
      const response = await api.get(`/search?s=${search}`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleSelect(id) {
    const pathnameParts = pathname.split("/");

    if (pathnameParts.length === 4) {
      let lastSlashIndex = pathname.lastIndexOf("/");
      let newPath = pathname.slice(0, lastSlashIndex);

      navigate(`${newPath}/${id}`);
    } else {
      navigate(`${pathname}/${id}`);
    }

    const itemFind = items.find((item) => item.id === Number(id));

    setValue("item", itemFind.item);
    setValue("description", itemFind.description);

    setItems("");
    setSelectedItem(itemFind);
  }

  const handleClearSearch = () => {
    setSelectedItem([]);
    errors && clearErrors();
    reset();

    const pathnameParts = pathname.split("/");

    if (pathnameParts.length === 4) {
      let lastSlashIndex = pathname.lastIndexOf("/");
      let newPath = pathname.slice(0, lastSlashIndex);

      navigate(`${newPath}`);
    }
  };

  return (
    <div className="relative w-full">
      <label htmlFor="item" className="text-sm text-neutral-500">
        {t("item_label")}
      </label>

      <div className="relative flex items-center">
        <input
          defaultValue={itemId ? selectedItem.item : ""}
          {...register("item", {
            required: t("item_required"),
            maxLength: {
              value: 20,
              message: t("item_max_length"),
            },
          })}
          aria-invalid={errors.item ? "true" : "false"}
          type="text"
          id="item"
          onChange={handleSearchProduct}
          disabled={isSearchable}
          placeholder={t("update_item_placeholder")}
          className={`focus-visible::border-neutral-500 ${items.length > 0 ? "rounded-t-lg border-b-0" : "rounded-lg"} w-full border border-neutral-400 px-4 py-2 text-neutral-500 outline-hidden hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.item &&
            "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
          }`}
        />

        {!Array.isArray(selectedItem) && (
          <button
            type="button"
            className="absolute right-2 hover:opacity-50"
            onClick={() => {
              handleClearSearch();
            }}
          >
            <X size={20} color="#737373" />
          </button>
        )}
      </div>

      {errors.item && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.item?.message}
        </p>
      )}

      {items.length > 0 && (
        <div
          ref={ref}
          className="absolute z-50 max-h-44 w-full overflow-y-auto rounded-b-lg border border-neutral-400 bg-neutral-50 py-2 text-neutral-500 shadow-md transition"
        >
          {items.length && (
            <ul className="flex w-full flex-col justify-items-center gap-px">
              {items.map((item) => {
                return (
                  <ItemSearch
                    key={item.id}
                    id={item.id}
                    item={item}
                    handleSelect={handleSelect}
                  />
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
