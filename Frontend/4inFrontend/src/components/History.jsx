import { HistoryIcon, Rat } from "lucide-react";
import { HistoryHeader } from "./HistoryHeader";
import { Registry } from "./Registry";

export function History({ registers, setSort }) {
  let count = 0;
  return (
    <div>
      <div className="flex w-full items-center justify-center gap-1 border-b border-dashed border-neutral-300 pb-2">
        <h2 className="text-center text-xl font-bold text-neutral-800">
          History
        </h2>
        <HistoryIcon size={16} />
      </div>
      {registers.length <= 0 ? (
        <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
          <Rat size={100} className="text-neutral-700" />
          <p className="font-medium text-neutral-600">No registers found...</p>
        </div>
      ) : (
        <>
          <HistoryHeader setSort={setSort} />

          {registers.map((registry) => {
            count++;
            return (
              <Registry
                key={registry.id}
                id={registry.id}
                item={registry.item}
                type={registry.label}
                justification={registry.justification}
                author={registry.author}
                created={registry.createdAt}
                count={count}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
