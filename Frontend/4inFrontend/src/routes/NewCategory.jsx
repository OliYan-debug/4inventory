import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ChevronRight, CirclePlus, Undo2 } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ModalMaxCategoriesError } from "../components/ModalMaxCategoriesError";

export default function NewCategory() {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [maxCategories, setMaxCategories] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setUpdate(false);
    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setMaxCategories(categories.length >= 10);
  }, [categories.length, update]);

  const onSubmit = async (data) => {
    try {
      await toast.promise(api.post("/category/add", data), {
        pending: "Adding category",
        success: {
          render() {
            return (
              <p>
                Category <span className="font-bold">{data.name}</span> added!
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
      setUpdate(true);
    } catch (error) {
      console.error(error);
    }
  };

  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/categories`} className="hover:font-semibold">
          Category
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">New category</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"New Category"} subtitle={subtitle()} />

      {maxCategories && <ModalMaxCategoriesError />}

      <div className="flex min-h-screen max-w-full justify-center rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 pt-8 md:w-1/2"
        >
          <div className="w-full">
            <label htmlFor="name" className="text-sm text-neutral-500">
              Category Name*
            </label>
            <input
              defaultValue=""
              {...register("name", {
                required: "Category name is required",
                maxLength: {
                  value: 20,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.name ? "true" : "false"}
              type="text"
              id="name"
              disabled={isSubmitting || maxCategories}
              className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.name &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            />
            {errors.name && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="color" className="text-sm text-neutral-500">
              Category color
            </label>
            <input
              defaultValue="#fafafa"
              {...register("color")}
              aria-invalid={errors.color ? "true" : "false"}
              type="color"
              id="color"
              disabled={isSubmitting || maxCategories}
              className={`focus-visible::border-neutral-500 h-10 w-full rounded-lg border border-neutral-400 px-4 py-2 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.color &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            />
            {errors.color && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.color?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || maxCategories}
            className="mt-10 flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 disabled:cursor-no-drop disabled:opacity-70 md:w-2/5"
          >
            <CirclePlus size={20} color="#fafafa" className="me-2" />
            Add new category
          </button>

          <Link
            to={"/categories"}
            disabled={isSubmitting || maxCategories}
            className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80 disabled:cursor-no-drop disabled:opacity-70"
          >
            Back to categories
            <Undo2 size={20} color="#a3a3a3" className="ms-1" />
          </Link>
        </form>
      </div>
    </div>
  );
}
