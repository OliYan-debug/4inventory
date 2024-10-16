import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  ChevronRight,
  CircleMinus,
  ListRestart,
  SearchIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { useEffect, useRef, useState } from "react";
import ItemSearch from "../components/ItemSearch";
import { toast } from "react-toastify";

export default function DeleteItem() {
  let { itemId } = useParams();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const ref = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (itemId) {
      api
        .get(`/inventory/item/${itemId}`)
        .then((response) => {
          setSelectedItem(response.data);
          setValue("item", selectedItem.item);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.warning(
            <p>
              <span className="font-bold">{error.response.data.message}</span>{" "}
              search other item{" "}
            </p>,
            {
              toastId: itemId,
            },
          );

          navigate("/products/delete");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, navigate, selectedItem.item]);

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

  const onSubmit = async (data) => {
    data.id = selectedItem.id;
    delete data.item;

    try {
      await toast.promise(
        api.delete("/inventory/remove", {
          data,
        }),
        {
          pending: "Removing item...",
          success: {
            render() {
              return <p>Item removed!</p>;
            },
          },
          error: {
            render({ data }) {
              return (
                <p>
                  Error when remove:
                  <span className="font-bold">
                    {data.response.data.message}
                  </span>
                  . Try again.
                </p>
              );
            },
          },
        },
      );
      reset();
      navigate("/products/delete");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchProduct = async (event) => {
    errors && clearErrors();

    if (event.target.value === "") {
      return;
    }

    let search = event.target.value;

    try {
      const response = await api.get(`/search/${search}`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleSelect(id) {
    if (itemId) {
      navigate(`/products/delete/${id}`);
    }

    const itemFind = items.find((item) => item.id === Number(id));
    setValue("item", itemFind.item);
    setItems("");
    setSelectedItem(itemFind);
  }

  async function handleSearch() {
    await api
      .get("/inventory/")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }

  const subtitle = () => {
    return (
      <p className="mt-1 flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
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
              Item Name*
            </label>
            <div className="relative flex items-center">
              <input
                defaultValue={itemId ? selectedItem.item : ""}
                {...register("item", {
                  required: "Item name is required",
                  maxLength: {
                    value: 20,
                    message: "Maximum character value exceeded",
                  },
                })}
                aria-invalid={errors.item ? "true" : "false"}
                type="text"
                id="item"
                onChange={handleSearchProduct}
                placeholder="Search items"
                className={`focus-visible::border-neutral-500 ${items.length > 0 ? "rounded-t-lg border-b-0" : "rounded-lg"} w-full border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                  errors.item &&
                  "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
                }`}
              />

              <button
                type="button"
                className="absolute right-2 hover:opacity-50"
                onClick={() => {
                  errors && clearErrors();
                  handleSearch();
                }}
              >
                <SearchIcon size={20} color="#737373" />
              </button>
            </div>

            {errors.item && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.item?.message}
              </p>
            )}

            {items.length > 0 && (
              <div
                ref={ref}
                className="absolute max-h-36 w-full overflow-y-auto rounded-b-lg border border-neutral-400 bg-neutral-50 py-2 text-neutral-500 shadow-md transition"
              >
                {items.length > 0 && (
                  <ul className="flex w-full flex-col justify-items-center gap-px">
                    {items.map((item) => {
                      return (
                        <ItemSearch
                          key={item.id}
                          id={item.id}
                          item={item.item}
                          handleSelect={handleSelect}
                        />
                      );
                    })}
                  </ul>
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
              disabled={selectedItem.length === 0}
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
