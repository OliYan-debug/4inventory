import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ChevronRight, CircleMinus } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { InputRemove } from "../components/InputRemove";
import { InputJustification } from "../components/InputJustification";
import { InputSearchItems } from "../components/InputSearchItems";
import { useTranslation } from "react-i18next";
import { BackToButton } from "../components/BackToButton";

export default function CheckOut() {
  const { t } = useTranslation("checkout");

  let { itemId } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    control,
    formState: { errors },
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

          navigate("/products/checkout");
        });
    } else {
      setSelectedItem([]);
    }
  }, [itemId, navigate, selectedItem.item]);

  const onSubmit = async (data) => {
    data.quantity = Number(data.quantity);

    if (Number.isNaN(data.quantity)) {
      return toast.error(t("quantity_invalid"));
    }

    if (data.quantity > selectedItem.quantity) {
      return toast.warning(t("quantity_higher"));
    }

    data.quantity = selectedItem.quantity - data.quantity;

    data.id = selectedItem.id;
    delete data.item;

    try {
      await toast.promise(api.patch("/inventory", data), {
        pending: t("loading.pending"),
        success: t("loading.success"),
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

      selectedItem.quantity = data.quantity;
      setValue("quantity", 0);
      setValue("justification", "");
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

        <span className="font-semibold">{t("breadcrumb.checkIn")}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      <div className="flex min-h-screen max-w-full justify-center rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 pt-8 md:w-1/2"
        >
          <InputSearchItems
            register={register}
            errors={errors}
            clearErrors={clearErrors}
            setValue={setValue}
            reset={reset}
            itemId={itemId}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            isSearchable={from === "item"}
          />

          <InputRemove
            errors={errors}
            selectedItem={selectedItem}
            control={control}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
          />

          <InputJustification
            register={register}
            errors={errors}
            selectedItem={selectedItem}
            watch={watch}
          />

          <button
            type="submit"
            className="mt-10 flex items-center justify-center rounded-lg bg-orange-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-orange-500 md:w-2/5"
          >
            <CircleMinus size={20} color="#fafafa" className="me-2" />
            {t("buttons.submit")}
          </button>

          <BackToButton itemId={itemId} from={from} />
        </form>
      </div>
    </div>
  );
}
