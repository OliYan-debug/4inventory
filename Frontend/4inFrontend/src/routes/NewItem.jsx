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
import { InputQuantity } from "../components/InputQuantity";
import { useTranslation } from "react-i18next";

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
                <span className="text-xs opacity-80">
                  {data.response.data.message}
                </span>
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
          <p className="mb-4 mt-2 text-sm text-neutral-500">
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

            <InputDescription
              register={register}
              errors={errors}
              watch={watch}
            />

            <InputQuantity
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-10 flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 disabled:cursor-no-drop disabled:opacity-70 md:w-2/5"
            >
              <CirclePlus size={20} color="#fafafa" className="me-2" />
              {t("buttons.submit")}
            </button>

            <Link
              to={"/products"}
              className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
            >
              {t("buttons.back")}
              <Undo2 size={20} color="#a3a3a3" className="ms-1" />
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
