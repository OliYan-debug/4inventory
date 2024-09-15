import { Pencil, Trash } from "lucide-react";

export default function Category({ id, name, color }) {
  return (
    <div
      className={`grid grid-cols-4 justify-items-center ${
        id % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{name}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <div
          style={{ backgroundColor: color }}
          className="rounded-md px-1 py-px"
        >
          <p className="text-neutral-300 drop-shadow-sm">
            {color.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="col-auto flex items-center gap-2 py-2">
        <button
          type="button"
          disabled="true"
          className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
        >
          <Pencil size={18} color="#262626" />
        </button>
        <button
          type="button"
          disabled="true"
          className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
        >
          <Trash size={18} color="#dc2626" />
        </button>
      </div>
    </div>
  );
}
