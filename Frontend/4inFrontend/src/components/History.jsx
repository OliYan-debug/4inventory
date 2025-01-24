import { FolderSync, HistoryIcon, Link, Rat, Undo2 } from "lucide-react";
import { Registry } from "./Registry";
import { TableHeader } from "./TableHeader";
import { LoadingSkeleton } from "./LoadingSkeleton";

export function History({ registers, setSort, loading, updateData }) {
  const registersColumns = [
    {
      label: "ID",
      orderBy: "id",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Name",
      orderBy: "item",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Type",
      orderBy: "label",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Justification",
      orderBy: "justification",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: true,
    },
    {
      label: "Author",
      orderBy: "quantity",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Created At",
      orderBy: "createdAt",
      sorting: true,
      order: "desc",
      isOrderable: true,
      extendedColumn: false,
    },
  ];

  let count = 0;
  return (
    <div>
      <div className="flex w-full items-center justify-center gap-1 border-b border-dashed border-neutral-300 pb-2">
        <h2 className="text-center text-xl font-bold text-neutral-800">
          History
        </h2>
        <HistoryIcon size={16} />
      </div>

      <div>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {registers.length <= 0 ? (
              <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                <Rat size={100} className="text-neutral-700" />
                <p className="font-medium text-neutral-600">
                  No items found...
                </p>
                <Link
                  to={"/products"}
                  className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
                >
                  Back to products <Undo2 size={16} />
                </Link>

                <p className="text-neutral-600">or</p>

                <button
                  type="button"
                  onClick={() => {
                    updateData();
                  }}
                  className="flex items-center gap-1 rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                >
                  Try again <FolderSync size={16} />
                </button>
              </div>
            ) : (
              <>
                <TableHeader
                  setSort={setSort}
                  columnsDefault={registersColumns}
                />

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
          </>
        )}
      </div>
    </div>
  );
}
