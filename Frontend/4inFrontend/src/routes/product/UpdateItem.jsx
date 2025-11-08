import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronRight, CircleCheck, Loader2, ServerOff } from "lucide-react";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { BackToButton } from "@/components/BackToButton";
import { Button } from "@/components/Button";
import { ModalCategoriesError } from "./components/ModalCategoriesError";
import { InputSearchItems } from "./components/InputSearchItems";
import { InputCategories } from "./components/InputCategories";
import { InputDescription } from "./components/InputDescription";

export default function UpdateItem() {
  const { t } = useTranslation("update_item");

  const [categories, setCategories] = useState([]);
  const [getCategoriesError, setGetCategoriesError] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  let { itemId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from");

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (itemId) {
      api
        .get(`/inventory/${itemId}`)
        .then((response) => {
          setSelectedItem(response.data);
          setValue("item", selectedItem.item);
          setValue("description", selectedItem.description);
          setSelectedCategories(selectedItem.category || []);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          toast.warning(
            <p>
              <span className="font-bold">{error.response.data.message}</span>{" "}
              {t("fetch_error")}
            </p>,
            {
              toastId: itemId,
            },
          );

          navigate("/products/update");
        });
    } else {
      setSelectedItem([]);
    }
  }, [itemId, navigate, selectedItem.item]);

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
      id: selectedItem.id,
      quantity: selectedItem.quantity,
      category: selectedCategories,
    };

    try {
      await toast.promise(api.put("/inventory", data), {
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

      navigate(`/products/item/${itemId}`);
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

        <ChevronRight className="size-4 text-neutral-500" />

        {from === "item" && (
          <>
            <Link
              to={`/products/item/${itemId}`}
              className="hover:font-semibold"
            >
              Item
            </Link>

            <ChevronRight className="size-4 text-neutral-500" />
          </>
        )}

        <span className="font-semibold">{t("breadcrumb.updateItem")}</span>
      </p>
    );
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      {getCategoriesError !== false ? (
        <div className="flex max-w-full flex-1 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-4 text-center">
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
        <div className="flex max-w-full flex-1 justify-center rounded-2xl bg-neutral-50 p-4">
          {categories.length === 0 ? <ModalCategoriesError /> : ""}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-2 px-10 pt-8 md:w-[40dvw] md:px-0"
          >
            <InputSearchItems
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              clearErrors={clearErrors}
              setValue={setValue}
              reset={reset}
              itemId={itemId}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isSearchable={false}
            />

            <InputCategories
              itemId={itemId}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              resetField={resetField}
              categories={categories}
              selectedItem={selectedItem}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />

            <InputDescription
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              itemId={itemId}
              selectedItem={selectedItem}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 bg-indigo-400"
            >
              <span>{t("buttons.submit")}</span>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="size-5 animate-spin" />
                </span>
              ) : (
                <CircleCheck className="size-5" />
              )}
            </Button>

            <BackToButton itemId={itemId} from={from} disabled={isSubmitting} />
          </form>
        </div>
      )}
    </div>
  );
}
