import { X } from "lucide-react";

export function InputRoot({ error = false, disabled = false, ...props }) {
  return (
    <div
      data-error={error}
      data-disabled={disabled}
      className="group flex h-10 w-full items-center gap-2 rounded-lg border border-neutral-400 px-4 text-neutral-500 transition duration-300 focus-within:border-neutral-500 hover:border-neutral-500 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-neutral-100/50 data-[disabled=true]:hover:border-neutral-400 data-[error=true]:border-red-600 data-[error=true]:bg-red-200/40"
      {...props}
    />
  );
}

export function InputField(props) {
  return (
    <input
      className="w-full flex-1 outline-0 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:cursor-not-allowed group-data-[disabled=true]:text-neutral-400 group-data-[error=true]:text-red-400 placeholder:text-sm placeholder:text-neutral-400 group-data-[error=true]:placeholder:text-red-400 data-[error=true]:text-red-400"
      {...props}
    />
  );
}

export function InputLabel({ error = false, ...props }) {
  return (
    <label
      data-error={error}
      className="pb-1.5 text-sm text-neutral-500 data-[error=true]:text-red-400"
      {...props}
    />
  );
}

export function InputIcon(props) {
  return (
    <span
      className="text-neutral-400 group-focus-within:text-neutral-500 group-data-[error=true]:text-red-400 group-[&:not(:has(input:placeholder-shown))]:text-neutral-400"
      {...props}
    />
  );
}

export function InputErrors({ message, ...props }) {
  return (
    <div
      className="animate-fade-in flex w-full items-center gap-1.5 py-1 text-xs font-semibold"
      {...props}
    >
      <span className="flex size-4 items-center justify-center rounded-full bg-red-400">
        <X className="size-3 text-neutral-50" />
      </span>
      <p className="text-sm font-normal text-red-400">{message}</p>
    </div>
  );
}
