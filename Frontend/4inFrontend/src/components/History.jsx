import { FolderSync, HistoryIcon, Rat } from "lucide-react";
import { Registry } from "./Registry";
import { TableHeader } from "./TableHeader";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useTranslation } from "react-i18next";

export function History({ registersColumns, registers, loading, updateData }) {
  const { t } = useTranslation("history");

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
                {registers.map((registry, index) => {
                  return (
                    <Registry
                      key={registry.id}
                      id={registry.id}
                      item={registry.item}
                      type={registry.label}
                      justification={registry.justification}
                      author={registry.author}
                      created={registry.createdAt}
                      count={index}
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
