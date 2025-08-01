import { twMerge } from "tailwind-merge";

export function Button({ className, ...props }) {
  return (
    <button
      className={twMerge(
        "flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg bg-neutral-400 py-3 text-sm font-bold text-neutral-50 transition duration-300 hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
