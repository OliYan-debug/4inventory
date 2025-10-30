import { PackageCheck, PackageX } from "lucide-react";

export function ItemSearch({ id, item, handleSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => handleSelect(id)}
        className="w-full cursor-pointer border-b border-neutral-200 px-4 outline-hidden transition focus-within:bg-neutral-300 hover:bg-neutral-100"
      >
        <div className="flex items-center gap-1 py-2 text-neutral-500">
          {item.quantity <= 0 ? (
            <PackageCheck className="size-5 min-w-5" />
          ) : (
            <PackageX className="size-5 min-w-5" />
          )}

          <p className="min-w-20 truncate font-bold">{item.item}</p>
          <p className="truncate text-xs italic">{item.description}</p>
        </div>
      </button>
    </li>
  );
}
