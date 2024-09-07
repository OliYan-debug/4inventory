import { Link } from "react-router-dom"
import Header from "../components/Header"
import { ChevronRight, CirclePlus, ListRestart } from "lucide-react"
import { useForm } from "react-hook-form"

export default function ItemEntry() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const onSubmit = (data) => console.log(data)

  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500 mt-1">
        <Link to={`/products`} className="hover:font-semibold">
          Producs
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Item Entry</span>
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Item Entry"} subtitle={subtitle()} />

      <div className="max-w-full min-h-screen p-4 bg-neutral-50 rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pt-8 px-32 items-center gap-2"
        >
          <div className="w-full">
            <label htmlFor="item" className="text-sm text-neutral-500">
              Item Name or ID*
            </label>
            <input
              defaultValue=""
              {...register("item", {
                required: "Item name or ID is required",
                maxLength: {
                  value: 20,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.item ? "true" : "false"}
              type="text"
              id="item"
              className={`w-full rounded-lg border border-neutral-400 px-4 py-2
            text-neutral-500 outline-none hover:border-neutral-500 focus-visible::border-neutral-500
              disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400
              ${
                errors.item &&
                "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible::border-red-600"
              }`}
            />
            {errors.item && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.item?.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="quantity" className="text-sm text-neutral-500">
              Quantity*
            </label>
            <input
              defaultValue="0"
              {...register("quantity", {
                maxLength: {
                  value: 20,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.quantity ? "true" : "false"}
              type="number"
              id="quantity"
              className={`w-full rounded-lg border border-neutral-400 px-4 py-2
            text-neutral-500 outline-none hover:border-neutral-500 focus-visible::border-neutral-500
              disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400
              ${
                errors.quantity &&
                "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible::border-red-600"
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
            className="w-2/5 mt-10 py-2 rounded-lg bg-emerald-400 text-neutral-50 font-semibold flex items-center justify-center px-4 hover:bg-emerald-500 transition"
          >
            <CirclePlus size={20} color="#fafafa" className="me-2" />
            Item entry
          </button>
          <button
            type="reset"
            className="font-semibold text-neutral-400 hover:underline hover:opacity-80 flex items-center"
          >
            Cancel
            <ListRestart size={20} color="#a3a3a3" className="ms-1" />
          </button>
        </form>
      </div>
    </div>
  )
}
