import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronRight, CirclePlus, ServerOff, Undo2 } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ModalCategoriesError } from "../components/ModalCategoriesError";
import { InputCategories } from "../components/InputCategories";
import { InputUpdateItemName } from "../components/InputUpdateItemName";
import { InputDescription } from "../components/InputDescription";

export default function UpdateItem() {
  let { itemId } = useParams();
  const [categories, setCategories] = useState([]);
  const [getCategoriesError, setGetCategoriesError] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    setError,
    clearErrors,
    watch,
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
              search other item{" "}
            </p>,
            {
              toastId: itemId,
            },
          );

          navigate("/products/update");
        });
    }
  }, [itemId, navigate, selectedItem.item]);

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
      id: selectedItem.id,
      quantity: selectedItem.quantity,
      category: selectedCategories,
    };

    try {
      await toast.promise(api.put("/inventory", data), {
        pending: "Updating item",
        success: {
          render() {
            return (
              <p>
                Item <span className="font-bold">{data.item}</span> updated!
              </p>
            );
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                Error when updating:
                <span className="font-bold">{data.response.data.message}</span>.
                Try again.
              </p>
            );
          },
        },
      });
      navigate("/products");
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
        <span className="font-semibold">Update Product</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Update Item"} subtitle={subtitle()} />

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
            <InputUpdateItemName
              register={register}
              errors={errors}
              clearErrors={clearErrors}
              setValue={setValue}
              reset={reset}
              itemId={itemId}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
            />

            <InputCategories
              itemId={itemId}
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
              itemId={itemId}
              selectedItem={selectedItem}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-10 flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 disabled:cursor-no-drop disabled:opacity-70 md:w-2/5"
            >
              <CirclePlus size={20} className="me-2 text-neutral-50" />
              Update item
            </button>

            <Link
              to={"/products"}
              className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
            >
              Back to products
              <Undo2 size={20} className="ms-1 text-neutral-400" />
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
