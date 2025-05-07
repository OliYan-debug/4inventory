import { ArrowUp, Plus } from "lucide-react";
import { Timeline } from "./TimelineItem";
import { useState } from "react";
import { TimelineSkeleton } from "./TimelineSkeleton";
import { useTranslation } from "react-i18next";

export function ItemTimeline({ registers, loading }) {
  const { t } = useTranslation("timeline");

  const [visibleCount, setVisibleCount] = useState(5);
  const visibleQuantity = 5;

  const reversedRegisters = [...registers].reverse();

  const handleShowMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + visibleQuantity, registers.length),
    );
  };

  const visibleRegisters = reversedRegisters.slice(0, visibleCount);

  return (
    <>
      {loading ? (
        <TimelineSkeleton />
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-8">
          {visibleRegisters.map((registry, index) => {
            return (
              <Timeline
                key={registry.id}
                label={registry.label}
                justification={registry.justification}
                author={registry.author}
                createdAt={registry.createdAt}
                isLast={index === 0}
              />
            );
          })}

          {visibleCount < registers.length ? (
            <button
              onClick={handleShowMore}
              className="flex items-center gap-1 rounded-lg bg-neutral-400 px-4 py-1 font-semibold text-neutral-50 transition hover:opacity-80"
            >
              {t("buttons.show_more")}
              <Plus className="size-5" />
            </button>
          ) : (
            <>
              {registers.length > visibleQuantity && (
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-1 rounded-lg border border-neutral-400 px-4 py-1 font-semibold text-neutral-400 transition hover:opacity-80"
                >
                  {t("buttons.back_top")}
                  <ArrowUp className="size-5" />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
