import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ChevronRight, CirclePlus, Loader2, ServerOff } from "lucide-react";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { Button } from "@/components/Button";
import { BackToButton } from "@/components/BackToButton";
import { ModalCategoriesError } from "./components/ModalCategoriesError";
import { InputItemName } from "./components/InputItemName";
import { InputCategories } from "./components/InputCategories";
import { InputDescription } from "./components/InputDescription";
import { InputQuantity } from "./components/InputQuantity";

export default function NewItem() {
  const { t } = useTranslation("new_item");

  const [categories, setCategories] = useState([]);
  const [getCategoriesError, setGetCategoriesError] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setError,
    watch,
    control,
    setValue,
    clearErrors,
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
        toast.error(t("categoriesError.toastError"));
        setGetCategoriesError(error);
        console.error(error);
      });
  }, []);

  const onSubmit = async (data) => {
    if (selectedCategories.length === 0) {
      setError(
        "category",
        { type: "required", message: t("form.category_required") },
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
        pending: t("loading.pending"),
        success: {
          render() {
            return (
              <p>
                {t("loading.success")}{" "}
                <span className="font-bold">{data.item}</span>
              </p>
            );
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                {t("loading.error")}
                <br />
                <span className="text-xs opacity-80">{data.message}</span>
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

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          {t("breadcrumb.products")}
        </Link>
        <ChevronRight size={16} className="text-neutral-500" />
        <span className="font-semibold">{t("breadcrumb.newItem")}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      {getCategoriesError !== false ? (
        <div className="flex min-h-screen max-w-full flex-col items-center rounded-2xl bg-neutral-50 px-8 py-4 text-center">
          <h1 className="text-3xl font-bold text-neutral-800">
            {t("categoriesError.title")}
          </h1>
          <p className="mt-2 mb-4 text-sm text-neutral-500">
            {t("categoriesError.text")}
          </p>
          <span className="mb-6 font-medium text-neutral-600">
            {getCategoriesError.statusText || getCategoriesError.message}
          </span>
          <ServerOff size={84} className="text-neutral-800" />
        </div>
      ) : (
        <div className="flex min-h-screen max-w-full justify-center rounded-2xl bg-neutral-50 p-4">
          {categories.length === 0 ? <ModalCategoriesError /> : ""}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-2 px-10 pt-8 md:w-[40dvw] md:px-0"
          >
            <InputItemName
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />

            <InputCategories
              register={register}
              errors={errors}
              resetField={resetField}
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              isSubmitting={isSubmitting}
            />

            <InputDescription
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />

            <InputQuantity
              errors={errors}
              isSubmitting={isSubmitting}
              control={control}
              setValue={setValue}
              watch={watch}
              clearErrors={clearErrors}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-emerald-400"
            >
              <span>{t("buttons.submit")}</span>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="size-5 animate-spin" />
                </span>
              ) : (
                <CirclePlus className="size-5" />
              )}
            </Button>

            <BackToButton disabled={isSubmitting} />
          </form>
        </div>
      )}
    </div>
  );
}
