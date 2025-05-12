import { useEffect, useRef } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";

export function QuantityIncrementDecrement({
  watch,
  setValue,
  clearErrors,
  disable = false,
}) {
  const intervalRef = useRef(null);

  const quantity = Number(watch("quantity"));

  const decrementQtd = () => {
    setValue("quantity", Number(watch("quantity")) - 1);

    intervalRef.current = setInterval(() => {
      if (watch("quantity") <= 0) {
        return;
      }

      setValue("quantity", Number(watch("quantity") - 1));
    }, 100);
  };

  const incrementQtd = () => {
    if (Number(watch("quantity")) < 0) {
      setValue("quantity", 0);
      clearErrors("quantity");
    }

    setValue("quantity", Number(watch("quantity")) + 1);

    intervalRef.current = setInterval(() => {
      setValue("quantity", Number(watch("quantity")) + 1);
    }, 100);
  };

  useEffect(() => {
    if (disable) {
      stopIncrement();
    }
  }, [disable]);

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
        disabled={quantity <= 0 || disable}
        className="ml-2 rounded-lg border border-neutral-400 px-3 outline-none transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-neutral-50"
      >
        <CircleMinus className="size-5 text-neutral-600" />
      </button>

      <button
        type="button"
        onMouseDown={incrementQtd}
        onMouseUp={stopIncrement}
        onMouseLeave={stopIncrement}
        disabled={disable}
        className="rounded-lg border border-neutral-400 px-3 outline-none transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-neutral-50"
      >
        <CirclePlus className="size-5 text-neutral-600" />
      </button>
    </>
  );
}
