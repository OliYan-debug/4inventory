import {
  ClipboardCheck,
  ClipboardCopy,
  ClipboardEdit,
  ClipboardMinus,
  ClipboardPaste,
} from "lucide-react";

export function Registry({
  id,
  item,
  type,
  justification,
  author,
  created,
  count,
}) {
  return (
    <div
      className={`animate-fade-in grid min-w-[840px] grid-cols-7 justify-items-center text-wrap ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="max-w-40 truncate text-neutral-500">{item}</p>
      </div>

      <div className="col-auto flex items-center gap-1 py-2">
        <p className="text-neutral-500">{type}</p>
        {type === "ADD" && (
          <ClipboardCheck size={16} className="text-green-400" />
        )}
        {type === "REMOVE" && (
          <ClipboardMinus size={16} className="text-red-400" />
        )}
        {type === "UPDATE" && (
          <ClipboardEdit size={16} className="text-indigo-400" />
        )}
        {type === "CHECK_IN" && (
          <ClipboardCopy size={16} className="text-sky-400" />
        )}
        {type === "CHECK_OUT" && (
          <ClipboardPaste size={16} className="text-yellow-400" />
        )}
      </div>

      <div className="group/justification relative col-span-2 flex items-center justify-center py-2">
        <p className="text-neutral-500">
          {justification.length > 20
            ? `${justification.substring(0, 24)}...`
            : justification}
        </p>

        {justification.length > 20 && (
          <div className="animate-fade-in absolute top-10 z-10 hidden max-w-72 justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 text-wrap break-all shadow-md group-hover/justification:flex">
            <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-t border-l border-neutral-500 bg-neutral-400"></span>
            <p className="text-justify text-xs text-neutral-50">
              {justification}
            </p>
          </div>
        )}
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="font-medium text-neutral-500">{author}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-xs text-neutral-500">
          {created[0]}/{created[1]}/{created[2]}{" "}
          <span className="font-medium">
            {created[3]}:{created[4]}:{created[5]}
          </span>
        </p>
      </div>
    </div>
  );
}
