import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ChevronRight, CirclePlus, Undo2 } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { InputSearchItems } from "../components/InputSearchItems";
import { InputJustification } from "../components/InputJustification";
import { InputAdd } from "../components/InputAdd";
import { useTranslation } from "react-i18next";

export default function CheckIn() {
  const { t } = useTranslation("checkin");

  let { itemId } = useParams();
  const [selectedItem, setSelectedItem] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    watch,
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

          navigate("/products/checkin");
        });
    }
  }, [itemId, navigate, selectedItem.item]);

  const onSubmit = async (data) => {
    if (Number.isNaN(data.quantity)) {
      return toast.error(t("quantity_invalid"));
    }

    data.id = selectedItem.id;
    delete data.item;

    data.quantity += selectedItem.quantity;

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
        <ChevronRight size={16} color="#737373" />
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
          />

          <InputAdd
            register={register}
            errors={errors}
            selectedItem={selectedItem}
          />

          <InputJustification
            register={register}
            errors={errors}
            selectedItem={selectedItem}
            watch={watch}
          />

          <button
            type="submit"
            className="mt-10 flex items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500 md:w-2/5"
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
    </div>
  );
}
