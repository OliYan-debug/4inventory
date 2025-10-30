import { useEffect, useRef } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";

export function QuantityIncrementDecrement({
  watch,
  setValue,
  clearErrors,
  disable = false,
  disableMinusBtn = false,
  disablePlusBtn = false,
}) {
  const intervalRef = useRef(null);

  let newQuantity = Number(watch("quantity"));
  let quantity = !Number.isNaN(newQuantity) ? newQuantity : 0;

  const decrementQtd = () => {
    let newQuantity = Number(watch("quantity"));

    if (Number.isNaN(newQuantity)) {
      return;
    }

    setValue("quantity", Number(watch("quantity")) - 1);

    intervalRef.current = setInterval(() => {
      if (watch("quantity") <= 0) {
        return;
      }

      setValue("quantity", Number(watch("quantity") - 1));
    }, 100);
  };

  const incrementQtd = () => {
    let newQuantity = Number(watch("quantity"));

    if (Number.isNaN(newQuantity) || newQuantity < 0) {
      setValue("quantity", 0);
      clearErrors("quantity");
    }

    setValue("quantity", Number(watch("quantity")) + 1);

    intervalRef.current = setInterval(() => {
      setValue("quantity", Number(watch("quantity")) + 1);
    }, 100);
  };

  useEffect(() => {
    if (disable || disableMinusBtn || disablePlusBtn) {
      stopIncrement();
    }
  }, [disable, disableMinusBtn, disablePlusBtn]);

  const stopIncrement = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <button
        type="button"
        onMouseDown={decrementQtd}
        onMouseUp={stopIncrement}
        onMouseLeave={stopIncrement}
        disabled={quantity <= 0 || disable || disableMinusBtn}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-neutral-400 px-3 outline-hidden transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100/50 disabled:opacity-60 disabled:hover:bg-neutral-100/50"
      >
        <CircleMinus className="size-5 text-neutral-600" />
      </button>

      <button
        type="button"
        onMouseDown={incrementQtd}
        onMouseUp={stopIncrement}
        onMouseLeave={stopIncrement}
        disabled={disable || disablePlusBtn}
        className="flex w-full cursor-pointer items-center justify-center rounded-lg border border-neutral-400 px-3 outline-hidden transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100/50 disabled:opacity-60 disabled:hover:bg-neutral-100/50"
      >
        <CirclePlus className="size-5 text-neutral-600" />
      </button>
    </>
  );
}
