import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Check, Pencil, PencilOff, Trash } from "lucide-react";
import { api } from "../services/api";
import { useTranslation } from "react-i18next";

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

  const [editable, setEditable] = useState(false);
  const [checkDeleteOpen, setCheckDeleteOpen] = useState(false);
  const ref = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setCheckDeleteOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  function handleUpdate() {
    editable ? setEditable(false) : setEditable(true);
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
                    {data.response.data.message}
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
                  {data.response.data.message}
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

  const CheckDeleteOpen = () => {
    return (
      <div
        ref={ref}
        className="absolute right-4 top-4 z-30 flex animate-fadeIn flex-col items-center rounded-lg rounded-tr-none border-red-500 bg-neutral-50 p-4 shadow-lg"
      >
        <span className="absolute -right-1 -top-1 size-3 animate-ping rounded-full bg-red-500 opacity-75"></span>
        <span className="absolute -right-1 -top-1 size-3 rounded-full bg-red-500"></span>

        <h2 className="font-medium text-neutral-600">
          {t("confirmDelete.title")}
        </h2>
        <p className="text-sm text-neutral-400">{t("confirmDelete.warning")}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setCheckDeleteOpen(false)}
            className="flex items-center justify-center rounded-lg border border-neutral-400 px-2 py-1 font-semibold text-neutral-400 transition hover:bg-neutral-200 hover:underline"
          >
            {t("confirmDelete.buttons.cancel")}
          </button>

          <button
            type="button"
            onClick={() => handleDelete()}
            className="flex w-32 items-center justify-center rounded-lg bg-red-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-red-500 hover:underline"
          >
            {t("confirmDelete.buttons.confirm")}
          </button>
        </div>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`grid h-12 min-w-[400px] animate-fadeIn grid-cols-4 items-center justify-items-center ${
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
            className={`w-full rounded-lg border border-neutral-400 bg-transparent px-2 text-neutral-600 outline-none hover:border-neutral-500 focus-visible:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
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
          <div className="rounded-md px-1 py-px">
            <input
              defaultValue={color}
              {...register("color")}
              aria-invalid={errors.color ? "true" : "false"}
              type="color"
              id="color"
            />
          </div>
        ) : (
          <div
            style={{ backgroundColor: color }}
            className="rounded-md px-1 py-px"
          >
            <p className="text-neutral-300 drop-shadow-sm">
              {color.toUpperCase()}
            </p>
          </div>
        )}
      </div>

      <div className="col-auto flex items-center gap-2 py-2">
        <button
          type="submit"
          className={`animate-fadeIn transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60 ${editable ? "block" : "hidden"}`}
        >
          <Check size={18} color="#262626" />
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
          className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
        >
          {editable ? (
            <PencilOff size={18} color="#262626" />
          ) : (
            <Pencil size={18} color="#262626" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => handleConfirmDelete()}
            type="button"
            disabled={checkDeleteOpen || activeButton !== null}
            className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <Trash size={18} color={!checkDeleteOpen ? "#dc2626" : "#737373"} />
          </button>

          {checkDeleteOpen && <CheckDeleteOpen />}
        </div>
      </div>
    </form>
  );
}
