import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ChevronRight, CircleMinus, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { BackToButton } from "@/components/BackToButton";
import { Button } from "@/components/Button";
import { InputSearchItems } from "./components/InputSearchItems";
import { InputRemove } from "./components/InputRemove";
import { InputJustification } from "./components/InputJustification";

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
                <span className="text-xs opacity-80">{data.message}</span>
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
    <div className="flex h-full flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      <div className="flex max-w-full flex-1 justify-center rounded-2xl bg-neutral-50 p-4">
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
            isSearchable={from === "item"}
          />

          <InputRemove
            errors={errors}
            isSubmitting={isSubmitting}
            selectedItem={selectedItem}
            control={control}
            setValue={setValue}
            watch={watch}
            clearErrors={clearErrors}
          />

          <InputJustification
            register={register}
            errors={errors}
            isSubmitting={isSubmitting}
            selectedItem={selectedItem}
            watch={watch}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-orange-400"
          >
            <span>{t("buttons.submit")}</span>
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="size-5 animate-spin" />
              </span>
            ) : (
              <CircleMinus className="size-5" />
            )}
          </Button>

          <BackToButton itemId={itemId} from={from} disabled={isSubmitting} />
        </form>
      </div>
    </div>
  );
}
