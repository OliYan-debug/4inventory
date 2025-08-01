import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { Loader2, X } from "lucide-react";
import { ItemSearch } from "./ItemSearch";
import { useTranslation } from "react-i18next";
import {
  InputErrors,
  InputField,
  InputIcon,
  InputLabel,
  InputRoot,
} from "./Input";
import { toast } from "react-toastify";

export function InputSearchItems({
  register,
  errors,
  isSubmitting,
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setItems("");
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSearchProduct = async (event) => {
    let search = event.target.value;

    errors && clearErrors();

    if (search === "") {
      return;
    }

    try {
      setLoading(true);
      const response = await api.get(`/search?s=${search}`);
      setItems(response.data);
    } catch (error) {
      toast.warn(t("loading.error"), { toastId: "searchItemError" });
      console.error(error);
    } finally {
      setLoading(false);
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
      <InputLabel htmlFor="item" error={!!errors.item}>
        {t("item_label")}
      </InputLabel>

      <InputRoot disabled={isSubmitting} error={!!errors.item}>
        <InputField
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
          disabled={isSearchable || isSubmitting}
          placeholder={t("update_item_placeholder")}
        />

        <InputIcon>
          {loading ? (
            <span className="animate-fade-in">
              <Loader2 className="size-5 animate-spin text-neutral-500" />
            </span>
          ) : (
            <>
              {!Array.isArray(selectedItem) && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="flex cursor-pointer hover:opacity-50 disabled:pointer-events-none"
                  onClick={() => {
                    handleClearSearch();
                  }}
                >
                  <X className="size-5 text-neutral-500" />
                </button>
              )}
            </>
          )}
        </InputIcon>
      </InputRoot>

      {errors.item && <InputErrors message={errors.item?.message} />}

      {items.length > 0 && (
        <div
          ref={ref}
          className="absolute z-10 max-h-44 w-full overflow-y-auto rounded-lg border border-neutral-400 bg-neutral-50 py-2 text-neutral-500 shadow-md transition"
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
