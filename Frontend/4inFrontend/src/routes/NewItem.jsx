import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ChevronRight, CirclePlus, ServerOff, Undo2 } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ModalCategoriesError } from "../components/ModalCategoriesError";
import { InputDescription } from "../components/InputDescription";
import { InputCategories } from "../components/InputCategories";
import { InputItemName } from "../components/InputItemName";

export default function NewItem() {
  const [categories, setCategories] = useState([]);
  const [getCategoriesError, setGetCategoriesError] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    api
      .get("/category")
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
    if (selectedCategories.length === 0) {
      setError(
        "category",
        { type: "required", message: "Category is required" },
        { shouldFocus: true },
      );
      return;
    }

    data = {
      ...data,
      category: selectedCategories,
    };

    try {
      await toast.promise(api.post("/inventory", data), {
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
      setSelectedCategories([]);
    } catch (error) {
      console.error(error);
    }
  };

  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
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
        <div className="flex min-h-screen max-w-full justify-center rounded-2xl bg-neutral-50 p-4">
          {categories.length === 0 ? <ModalCategoriesError /> : ""}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-2 pt-8 md:w-1/2"
          >
            <InputItemName register={register} errors={errors} />

            <InputCategories
              register={register}
              errors={errors}
              resetField={resetField}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <InputDescription register={register} errors={errors} />

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
              className="mt-10 flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 disabled:cursor-no-drop disabled:opacity-70 md:w-2/5"
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
