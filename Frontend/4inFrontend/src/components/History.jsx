import { FolderSync, HistoryIcon, Rat } from "lucide-react";
import { Registry } from "./Registry";
import { TableHeader } from "./TableHeader";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

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
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {registers.length <= 0 ? (
              <div className="animate-fade-in mt-10 flex flex-col items-center gap-2">
                <div className="flex w-64 flex-col items-center gap-2 text-neutral-600">
                  <Rat className="size-25 text-neutral-700" />

                  <span className="font-medium">{t("noItems")}</span>

                  <Button
                    type="button"
                    onClick={() => {
                      updateData();
                    }}
                    className="h-8"
                  >
                    {t("buttons.retry")} <FolderSync size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <TableHeader columnsDefault={registersColumns} />

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
