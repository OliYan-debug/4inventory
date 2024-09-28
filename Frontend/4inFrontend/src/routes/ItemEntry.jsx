import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { ChevronRight, CirclePlus, Undo2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";

export default function ItemEntry() {
  let { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    api
      .get("/inventory/")
      .then((response) => {
        let itemFind = response.data.find((item) => item.id === Number(itemId));
        setItem(itemFind);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, [itemId, item, updated]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async ({ quantity }) => {
    console.log({ itemId, quantity });
    if (Number.isNaN(quantity)) {
      toast.error("Quantity is invalid");
      return;
    }

    try {
      const response = await toast.promise(
        api.put("/inventory/update/quantity", { id: itemId, quantity }),
        {
          pending: "Updating quantity...",
          success: {
            render() {
              return <p>Quantity added!</p>;
            },
          },
          error: {
            render({ data }) {
              return (
                <p>
                  Error when adding:
                  <span className="font-bold">{data.response.data.error}</span>.
                  Try again.
                </p>
              );
            },
          },
        },
      );
      setValue("quantity", 0);
      setUpdated(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const subtitle = () => {
    return (
      <p className="mt-1 flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Producs
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Item Entry</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Item Entry"} subtitle={subtitle()} />

      <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 px-32 pt-8"
        >
          <div className="w-full">
            <label htmlFor="item" className="text-sm text-neutral-500">
              Item Name*
            </label>
            <input
              defaultValue={item.item}
              disabled={true}
              {...register("item")}
              type="text"
              id="item"
              className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400`}
            />
          </div>

          <div className="w-full">
            <label htmlFor="quantity" className="text-sm text-neutral-500">
              Add* (Current:
              <span className="font-medium"> {item.quantity}</span>)
            </label>
            <input
              defaultValue="0"
              {...register("quantity", {
                required: "Quantity is required",
                max: {
                  value: 9999999999,
                  message: "Maximum character value exceeded",
                },
                min: {
                  value: 1,
                  message: "Min. quantity to add is 1",
                },
                valueAsNumber: true,
              })}
              aria-invalid={errors.quantity ? "true" : "false"}
              type="number"
              id="quantity"
              className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
                errors.quantity &&
                "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
              }`}
            />
            {errors.quantity && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.quantity?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-10 flex w-2/5 items-center justify-center rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-emerald-500"
          >
            <CirclePlus size={20} color="#fafafa" className="me-2" />
            Item entry
          </button>
          <Link
            to={"/products"}
            className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80"
          >
            Back to products
            <Undo2 size={20} color="#a3a3a3" className="ms-1" />
          </Link>
        </form>
      </div>
    </div>
  );
}
