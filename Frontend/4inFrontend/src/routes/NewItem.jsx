import { Link } from "react-router-dom";
import Header from "../components/Header";
import {
  ChevronDown,
  ChevronRight,
  CirclePlus,
  PlusIcon,
  ServerOff,
  Undo2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import ModalCategoriesError from "../components/ModalCategoriesError";

export default function NewItem() {
  const [categories, setCategories] = useState([]);
  const [getCategoriesError, setGetCategoriesError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        toast.error("Error getting categories, try again");
        setGetCategoriesError(error);
        console.error(error);
      });
  }, []);

  const onSubmit = async (data) => {
    const categoryFind = categories.find(
      (category) => category.id === Number(data.category),
    );

    data = {
      ...data,
      category: [
        {
          id: data.category,
          name: categoryFind.name,
          color: categoryFind.color,
        },
      ],
    };

    try {
      await toast.promise(api.post("/inventory/add", data), {
        pending: "Adding item",
        success: {
          render() {
            return (
              <p>
                Item <span className="font-bold">{data.item}</span> added!
              </p>
            );
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                Error when adding:
                <span className="font-bold">{data.response.data.message}</span>.
                Try again.
              </p>
            );
          },
        },
      });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const subtitle = () => {
    return (
      <p className="mt-1 flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">New Item</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"New Product"} subtitle={subtitle()} />

      {getCategoriesError !== false ? (
        <div className="flex min-h-screen max-w-full flex-col items-center rounded-2xl bg-neutral-50 px-8 py-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-800">Oops!</h1>
          <p className="mb-4 mt-2 text-sm text-neutral-500">
            Sorry, an unexpected error has occurred:
          </p>
          <span className="mb-6 font-medium text-neutral-600">
            {getCategoriesError.statusText || getCategoriesError.message}
          </span>
          <ServerOff size={84} color="#262626" />
        </div>
      ) : (
        <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 p-4">
          {categories.length === 0 ? <ModalCategoriesError /> : ""}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-2 px-32 pt-8"
          >
            <div className="w-full">
              <label htmlFor="item" className="text-sm text-neutral-500">
                Item Name*
              </label>
              <input
                defaultValue=""
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
                disabled={isSubmitting}
                className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                  errors.item &&
                  "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible:border-red-600"
                }`}
              />
              {errors.item && (
                <p
                  role="alert"
                  className="mt-1 text-center text-xs text-red-600"
                >
                  {errors.item?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="category" className="text-sm text-neutral-500">
                Category*
              </label>
              <div className="relative mt-1 flex items-center">
                <ChevronDown
                  color="#a3a3a3"
                  size={22}
                  className="absolute right-14"
                />
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  name="category"
                  id="category"
                  disabled={isSubmitting}
                  className={`z-10 w-full appearance-none rounded-l-lg border border-neutral-400 bg-transparent px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 focus:border-neutral-500 ${
                    errors.category &&
                    "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible:border-red-600"
                  }`}
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Link
                  to="/categories/new"
                  title="Add new categories"
                  className="flex h-[42px] w-12 items-center justify-center rounded-r-lg bg-sky-400 transition hover:bg-sky-500"
                >
                  <PlusIcon size={18} color="#fafafa" />
                </Link>
              </div>
              {errors.category && (
                <p
                  role="alert"
                  className="mt-1 text-center text-xs text-red-600"
                >
                  {errors.category?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="description" className="text-sm text-neutral-500">
                Description
              </label>
              <textarea
                defaultValue=""
                {...register("description", {
                  maxLength: {
                    value: 255,
                    message: "Maximum character value exceeded",
                  },
                })}
                aria-invalid={errors.description ? "true" : "false"}
                type="text"
                id="description"
                disabled={isSubmitting}
                className={`h-26 focus-visible::border-neutral-500 w-full resize-none rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                  errors.description &&
                  "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
                }`}
              ></textarea>
              {errors.description && (
                <p
                  role="alert"
                  className="mt-1 text-center text-xs text-red-600"
                >
                  {errors.description?.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="quantity" className="text-sm text-neutral-500">
                Quantity
              </label>
              <input
                defaultValue="0"
                {...register("quantity", {
                  maxLength: {
                    value: 20,
                    message: "Maximum character value exceeded",
                  },
                })}
                aria-invalid={errors.quantity ? "true" : "false"}
                type="number"
                id="quantity"
                disabled={isSubmitting}
                className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                  errors.quantity &&
                  "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
                }`}
              />
              {errors.quantity && (
                <p
                  role="alert"
                  className="mt-1 text-center text-xs text-red-600"
                >
                  {errors.quantity?.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-10 flex w-2/5 items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 disabled:cursor-no-drop disabled:opacity-70"
            >
              <CirclePlus size={20} color="#fafafa" className="me-2" />
              Add new item
            </button>

            <Link
              to={"/products"}
              className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
            >
              Back to products
              <Undo2 size={20} color="#a3a3a3" className="ms-1" />
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
