import { Link } from "react-router-dom";
import Header from "../components/Header";
import { ChevronRight, CirclePlus, ListRestart } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";

export default function NewCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    api
      .post("/category/add", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const subtitle = () => {
    return (
      <p className="mt-1 flex items-center text-sm text-neutral-500">
        <Link to={`/categories`} className="hover:font-semibold">
          Category
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">New cateogory</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"New Product"} subtitle={subtitle()} />

      <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 px-32 pt-8"
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
              defaultValue=""
              {...register("color")}
              aria-invalid={errors.color ? "true" : "false"}
              type="color"
              id="color"
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
            className="mt-10 flex w-2/5 items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500"
          >
            <CirclePlus size={20} color="#fafafa" className="me-2" />
            Add new category
          </button>
          <button
            type="reset"
            className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
          >
            Cancel category
            <ListRestart size={20} color="#a3a3a3" className="ms-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
