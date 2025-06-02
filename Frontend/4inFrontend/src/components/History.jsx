import { FolderSync, HistoryIcon, Rat } from "lucide-react";
import { Registry } from "./Registry";
import { TableHeader } from "./TableHeader";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useTranslation } from "react-i18next";

export function History({ registers, loading, updateData }) {
  const { t } = useTranslation("history");

  const registersColumns = [
    {
      label: t("columns.id"),
      orderBy: "id",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.name"),
      orderBy: "item",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.type"),
      orderBy: "label",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.justification"),
      orderBy: "justification",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: true,
    },
    {
      label: t("columns.author"),
      orderBy: "author",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.createdAt"),
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
          {t("title")}
        </h2>
        <HistoryIcon size={16} />
      </div>

      <div>
        <TableHeader columnsDefault={registersColumns} />

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {registers.length <= 0 ? (
              <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                <Rat size={100} className="text-neutral-700" />
                <p className="font-medium text-neutral-600">{t("noItems")}</p>

                <button
                  type="button"
                  onClick={() => {
                    updateData();
                  }}
                  className="flex items-center gap-1 rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                >
                  {t("buttons.retry")} <FolderSync size={16} />
                </button>
              </div>
            ) : (
              <>
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
