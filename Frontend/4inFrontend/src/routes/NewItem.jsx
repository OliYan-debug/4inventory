import { Link } from "react-router-dom"
import Header from "../components/Header"
import {
  ChevronDown,
  ChevronRight,
  CirclePlus,
  ListRestart,
  PlusIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

export default function NewItem() {
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
        <span className="font-semibold">New Item</span>
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Header title={"New Product"} subtitle={subtitle()} />

      <div className="max-w-full min-h-screen p-4 bg-neutral-50 rounded-2xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col pt-8 px-32 items-center gap-2"
        >
          <div className="w-full">
            <label htmlFor="itemName" className="text-sm text-neutral-500">
              Item Name*
            </label>
            <input
              defaultValue=""
              {...register("itemName", {
                required: "Item name is required",
                maxLength: {
                  value: 20,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.itemName ? "true" : "false"}
              type="text"
              id="itemName"
              className={`w-full rounded-lg border border-neutral-400 px-4 py-2
            text-neutral-500 outline-none hover:border-neutral-500 focus-visible::border-neutral-500
              disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400
              ${
                errors.itemName &&
                "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible::border-red-600"
              }`}
            />
            {errors.itemName && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.itemName?.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="category" className="text-sm text-neutral-500">
              Category
            </label>
            <div className="relative mt-1 flex items-center">
              <ChevronDown
                color="#a3a3a3"
                size={22}
                className="absolute right-14"
              />
              <select
                {...register("category")}
                name="category"
                id="category"
                className="z-10 w-full appearance-none rounded-l-lg border border-neutral-400 
                bg-transparent py-2 px-4 text-neutral-500 outline-none
                hover:border-neutral-500 focus:border-neutral-500"
              >
                <option value="">Select</option>
                <option value=""></option>
                <option value=""></option>
              </select>
              <Link
                to="/categories/new"
                className="w-12 h-[42px] bg-neutral-400 rounded-r-lg flex items-center justify-center hover:bg-neutral-500 transition"
              >
                <PlusIcon size={18} color="#fafafa" />
              </Link>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="description" className="text-sm text-neutral-500">
              Description
            </label>
            <textarea
              defaultValue=""
              {...register("description", {
                maxLength: {
                  value: 255,
                  message: "Maximum character value exceeded",
                },
              })}
              aria-invalid={errors.description ? "true" : "false"}
              type="text"
              id="description"
              className={`w-full h-26 resize-none rounded-lg border border-neutral-400 px-4 py-2
            text-neutral-500 outline-none hover:border-neutral-500 focus-visible::border-neutral-500
              disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400
              ${
                errors.description &&
                "border-red-600 bg-red-100 text-red-600 hover:border-red-600 focus-visible::border-red-600"
              }`}
            ></textarea>
            {errors.description && (
              <p role="alert" className="mt-1 text-center text-xs text-red-600">
                {errors.description?.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="quantity" className="text-sm text-neutral-500">
              Quantity
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
            Add new item
          </button>
          <button
            type="reset"
            className="font-semibold text-neutral-400 hover:underline hover:opacity-80 flex items-center"
          >
            Cancel item
            <ListRestart size={20} color="#a3a3a3" className="ms-1" />
          </button>
        </form>
      </div>
    </div>
  )
}
