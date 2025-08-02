import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Check, Pencil, PencilOff, Trash } from "lucide-react";
import { api } from "../services/api";
import { useTranslation } from "react-i18next";
import { getContrastingTextColor } from "../utils/getContrast";
import { ModalConfirmDeleteCategory } from "./ModalConfirmDeleteCategory";

export function Category({
  id,
  name,
  color,
  updateData,
  count,
  activeButton,
  handleButtonClick,
}) {
  const { t } = useTranslation("category");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [editable, setEditable] = useState(false);
  const [checkDeleteOpen, setCheckDeleteOpen] = useState(false);

  const [previewColor, setPreviewColor] = useState(color);

  function handleUpdate() {
    setEditable(!editable);
  }

  function handleConfirmDelete() {
    checkDeleteOpen ? setCheckDeleteOpen(false) : setCheckDeleteOpen(true);
    setEditable(false);
  }

  async function handleDelete() {
    try {
      await toast.promise(
        api.delete("/category", { data: { id, name, color } }),
        {
          pending: t("loading.updating"),
          success: {
            render() {
              return (
                <p>
                  {t("loading.success.updated")}{" "}
                  <span className="font-bold">{name}</span>
                </p>
              );
            },
          },
          error: {
            render({ data }) {
              return (
                <p>
                  {t("loading.errors.delete")} <br />
                  <span className="text-xs opacity-80">
                    {data?.response?.data?.message}
                  </span>
                </p>
              );
            },
          },
        },
      );
      updateData();
    } catch (error) {
      handleConfirmDelete();
      console.error(error);
    }
  }

  const onSubmit = async (data) => {
    let currentData = {
      name: name,
      color: color,
    };

    if (JSON.stringify(currentData) === JSON.stringify(data)) {
      handleUpdate();
      handleButtonClick(null);
      return;
    }

    try {
      data.id = id;
      await toast.promise(api.put("/category", data), {
        pending: t("loading.updating"),
        success: {
          render() {
            return (
              <p>
                {t("loading.success.updated")}{" "}
                <span className="font-bold">{data.name}</span>
              </p>
            );
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                {t("loading.errors.update")} <br />
                <span className="text-xs opacity-80">
                  {data?.response?.data?.message}
                </span>
              </p>
            );
          },
        },
      });
      updateData();
      handleUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`animate-fade-in grid h-12 min-w-[400px] grid-cols-4 items-center justify-items-center ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
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
            autoFocus
            className={`disabled:text-opacity-60 w-full rounded-lg border border-neutral-400 bg-transparent px-2 text-neutral-600 outline-hidden hover:border-neutral-500 focus-visible:border-neutral-500 disabled:cursor-no-drop disabled:hover:border-neutral-400 ${
              errors.name &&
              "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible:border-red-600"
            }`}
          />
        ) : (
          <p className="text-neutral-500">{name}</p>
        )}
      </div>

      <div className="col-auto flex items-center py-2">
        {editable ? (
          <div className="relative flex gap-2">
            <label
              htmlFor="color"
              style={{ backgroundColor: previewColor }}
              className={`z-10 h-7 w-24 cursor-pointer rounded-lg border border-neutral-400 bg-red-500 transition hover:border-neutral-500 hover:opacity-70 ${
                errors.color &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            ></label>

            <input
              defaultValue={color}
              {...register("color")}
              onChange={(e) => {
                setPreviewColor(e.target.value);
              }}
              aria-invalid={errors.color ? "true" : "false"}
              type="color"
              id="color"
              className="absolute h-7 w-24 opacity-0"
            />
          </div>
        ) : (
          <div
            style={{ backgroundColor: color }}
            className="flex h-5 w-24 items-center justify-center rounded-2xl px-1 py-px"
          >
            <p
              className={`drop-shadow-xm text-xs opacity-60 ${getContrastingTextColor(color)}`}
            >
              {color.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      <div className="col-auto flex items-center gap-2 py-2">
        <button
          type="submit"
          className={`animate-fade-in cursor-pointer transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60 ${editable ? "block" : "hidden"}`}
        >
          <Check className="size-5 text-neutral-700" />
        </button>

        <button
          onClick={() => {
            handleUpdate();
            activeButton === id
              ? handleButtonClick(null)
              : handleButtonClick(id);
          }}
          type="button"
          disabled={activeButton !== null && activeButton !== id}
          className="cursor-pointer transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
        >
          {editable ? (
            <PencilOff className="size-5 text-neutral-700" />
          ) : (
            <Pencil className="size-5 text-neutral-700" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => handleConfirmDelete()}
            type="button"
            disabled={checkDeleteOpen || activeButton !== null}
            className="cursor-pointer transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <Trash
              className={`size-5 ${!checkDeleteOpen ? "text-red-500" : "text-neutral-700"}`}
            />
          </button>

          {checkDeleteOpen && (
            <ModalConfirmDeleteCategory
              setCheckDeleteOpen={setCheckDeleteOpen}
              handleDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </form>
  );
}
