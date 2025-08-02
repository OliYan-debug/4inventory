import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ChevronRight, CirclePlus, Undo2 } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ModalMaxCategoriesError } from "../components/ModalMaxCategoriesError";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";
import { InputCategoryName } from "../components/InputCategoryName";
import { InputCategoryColor } from "../components/InputCategoryColor";

export default function NewCategory() {
  const { t } = useTranslation("new_category");

  const [categories, setCategories] = useState([]);
  const [maxCategories, setMaxCategories] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updateColor, setUpdateColor] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setUpdate(false);
    api
      .get("/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setMaxCategories(categories.length >= 10);
  }, [categories.length, update]);

  function updateRandomColor() {
    setUpdateColor(!updateColor);
  }

  const onSubmit = async (data) => {
    try {
      await toast.promise(api.post("/category", data), {
        pending: t("loading.pending"),
        success: {
          render() {
            return (
              <p>
                {t("loading.success")}{" "}
                <span className="font-bold">{data.name}</span>
              </p>
            );
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                {t("loading.error")} <br />
                <span className="text-xs opacity-80">
                  {data?.response?.data?.message}
                </span>
              </p>
            );
          },
        },
      });
      reset();
      setUpdate(true);
      updateRandomColor();
    } catch (error) {
      console.error(error);
    }
  };

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/categories`} className="hover:font-semibold">
          {t("breadcrumb.category")}
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">{t("breadcrumb.newCategory")}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      {maxCategories && <ModalMaxCategoriesError />}

      <div className="flex min-h-screen max-w-full justify-center rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center gap-2 px-10 pt-8 md:w-[40dvw] md:px-0"
        >
          <InputCategoryName
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            maxCategories={maxCategories}
          />

          <InputCategoryColor
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            getValues={getValues}
            setValue={setValue}
            maxCategories={maxCategories}
            updateRandomColor={updateRandomColor}
            updateColor={updateColor}
          />

          <Button
            type="submit"
            disabled={isSubmitting || maxCategories}
            className="mt-2 bg-emerald-400"
          >
            {t("buttons.submit")}
            <CirclePlus className="size-5" />
          </Button>

          <Link
            to={"/categories"}
            data-disabled={isSubmitting}
            className="flex cursor-pointer items-center font-semibold text-neutral-400 hover:underline hover:opacity-80 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-70"
          >
            {t("buttons.back")}
            <Undo2 className="ms-1 size-5 text-neutral-400" />
          </Link>
        </form>
      </div>
    </div>
  );
}
