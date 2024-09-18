import { Check, Pencil, Trash } from "lucide-react";
import { api } from "../services/api";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Category({ id, name, color, updateCategories }) {
  const [editable, setEditable] = useState(false);

  function handleUpdate() {
    editable ? setEditable(false) : setEditable(true);
  }

  function handleDelete() {
    api
      .delete("/category/remove", { data: { id, name, color } })
      .then((response) => {
        console.log(response.data);
        updateCategories();
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    api
      .put("/category/update", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form
      className={`grid grid-cols-4 justify-items-center ${
        id % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        {editable ? (
          <input
            defaultValue={name}
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
        ) : (
          <p className="text-neutral-500">{id}</p>
        )}
      </div>

      <div className="col-auto flex items-center py-2">
        <div
          style={{ backgroundColor: color }}
          className="rounded-md px-1 py-px"
        >
          {editable ? (
            <input
              defaultValue={color}
              {...register("color", {
                required: "Category color is required",
                maxLength: {
                  value: 20,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.color ? "true" : "false"}
              type="text"
              id="color"
              className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.color &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            />
          ) : (
            <p className="text-neutral-300 drop-shadow-sm">
              {color.toUpperCase()}
            </p>
          )}
        </div>
      </div>

      <div className="col-auto flex items-center gap-2 py-2">
        {editable ? (
          <button
            type="button"
            onClick={handleSubmit(onSubmit())}
            className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <Check size={18} color="#262626" />
          </button>
        ) : (
          <button
            onClick={() => handleUpdate()}
            type="button"
            className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <Pencil size={18} color="#262626" />
          </button>
        )}

        <button
          onClick={() => handleDelete()}
          type="button"
          className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
        >
          <Trash size={18} color="#dc2626" />
        </button>
      </div>
    </form>
  );
}
