import { Link } from "react-router-dom";
import Header from "../components/Header";
import { ChevronRight, CircleMinus, ListRestart, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useState } from "react";
import ItemSearch from "../components/ItemSearch";

export default function DeleteItem() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => console.log(data);

  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const handleSearchProduct = async (event) => {
    setSearch(event.target.value);
    try {
      const response = await api.get(`/search/${search}`);
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleSelect(id) {
    const itemFind = items.find((item) => item.id === Number(id));
    setValue("item", itemFind.item);
    setItems("");
  }

  const subtitle = () => {
    return (
      <p className="mt-1 flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Producs
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Delete Item</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Delete Item"} subtitle={subtitle()} />

      <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 px-32 pt-8"
        >
          <div className="relative w-full">
            <label htmlFor="item" className="text-sm text-neutral-500">
              Item Name or ID*
            </label>
            <input
              defaultValue=""
              {...register("item", {
                required: "Item name or ID is required",
                maxLength: {
                  value: 20,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.item ? "true" : "false"}
              type="text"
              id="item"
              onChange={handleSearchProduct}
              className={`focus-visible::border-neutral-500 ${items.length > 0 ? "rounded-t-lg border-b-0" : "rounded-lg"} w-full border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.item &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            />
            {errors.item && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.item?.message}
              </p>
            )}

            {items.length > 0 && (
              <div className="absolute w-full rounded-b-lg border border-neutral-400 bg-neutral-50 px-4 py-2 text-neutral-500 shadow-md">
                <button
                  type="button"
                  className="absolute right-2 top-1 hover:opacity-50"
                  onClick={() => setItems("")}
                >
                  <X size={18} color="#737373" />
                </button>
                {items.length <= 0 ? (
                  <>
                    <p className="text-center">No items found</p>
                  </>
                ) : (
                  items.map((item) => {
                    return (
                      <ItemSearch
                        key={item.id}
                        id={item.id}
                        item={item.item}
                        handleSelect={handleSelect}
                      />
                    );
                  })
                )}
              </div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="justification" className="text-sm text-neutral-500">
              Justification*
            </label>
            <textarea
              defaultValue=""
              {...register("justification", {
                required: "Justification is required",
                maxLength: {
                  value: 255,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.justification ? "true" : "false"}
              type="text"
              id="justification"
              className={`h-26 focus-visible::border-neutral-500 w-full resize-none rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.justification &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            ></textarea>
            {errors.justification && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.justification?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 flex w-2/5 items-center justify-center rounded-lg bg-red-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-red-500"
          >
            <CircleMinus size={20} color="#fafafa" className="me-2" />
            Delete item
          </button>
          <button
            type="reset"
            className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
          >
            Cancel
            <ListRestart size={20} color="#a3a3a3" className="ms-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
