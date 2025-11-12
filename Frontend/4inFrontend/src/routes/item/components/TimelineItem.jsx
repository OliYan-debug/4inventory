import {
  CalendarFold,
  IdCard,
  PackageCheck,
  PackageMinus,
  PackagePlus,
  PackageSearch,
  PackageX,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { formatDate } from "@/utils/formatDate";

export function Timeline({ registry, isLast }) {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const getIcon = (label) => {
    switch (label) {
      case "ADD":
        return <PackageCheck className="size-5 text-green-800" />;
      case "REMOVE":
        return <PackageX className="size-5 text-red-800" />;
      case "UPDATE":
        return <PackageSearch className="size-5 text-indigo-800" />;
      case "CHECK_IN":
        return <PackagePlus className="size-5 text-sky-800" />;
      case "CHECK_OUT":
        return <PackageMinus className="size-5 text-orange-800" />;
      default:
        return "";
    }
  };

  const bgColorMap = {
    ADD: "bg-green-200",
    REMOVE: "bg-red-200",
    UPDATE: "bg-indigo-200",
    CHECK_IN: "bg-sky-200",
    CHECK_OUT: "bg-orange-200",
  };

  const bgColor = bgColorMap[registry.label] ?? "bg-neutral-200";

  return (
    <div className="animate-fade-in flex w-full items-center space-x-2 md:w-96">
      <div className="relative flex justify-center">
        {!isLast && (
          <span className="absolute bottom-11 block h-6 border-s-2 border-dashed border-neutral-400" />
        )}

        <div
          className={`relative flex size-12 items-center justify-center rounded-lg ${bgColor}`}
        >
          {getIcon(registry.label)}

          {registry.label === "CHECK_IN" && (
            <span className="absolute -top-2.5 left-9.5 rounded-md bg-sky-300 px-1 py-px text-[10px] text-sky-800">
              +{registry.actualState - registry.previousState}
            </span>
          )}

          {registry.label === "CHECK_OUT" && (
            <span className="absolute -top-2.5 left-9.5 rounded-md bg-orange-300 px-1 py-px text-[10px] text-orange-800">
              -{registry.previousState - registry.actualState}
            </span>
          )}
        </div>
      </div>

      <div className="flex max-w-28 flex-col justify-center md:max-w-64">
        <div className="group/justification relative">
          <p className="truncate text-base leading-tight font-semibold text-neutral-800">
            {registry.justification.length > 20
              ? `${registry.justification.substring(0, 24)}...`
              : registry.justification}
          </p>

          {registry.justification.length > 20 && (
            <div className="animate-fade-in absolute top-8 z-10 hidden w-64 max-w-64 justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 shadow-md group-hover/justification:flex">
              <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-t border-l border-neutral-500 bg-neutral-400"></span>
              <p className="text-justify text-xs text-neutral-50">
                {registry.justification}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 text-xs text-neutral-600">
          <IdCard className="size-4" />
          <span>{registry.author}</span>
        </div>
      </div>

      <div className="flex h-6 items-center gap-1 border-s border-neutral-400 ps-2">
        <CalendarFold className="size-4 text-neutral-800" />
        <span className="text-xs text-neutral-600">
          {currentLanguage === "en-US" ? (
            <>
              {registry.createdAt[0]}/{formatDate(registry.createdAt[1])}/
              {formatDate(registry.createdAt[2])}
            </>
          ) : (
            <>
              {formatDate(registry.createdAt[2])}/
              {formatDate(registry.createdAt[1])}/{registry.createdAt[0]}
            </>
          )}{" "}
          <span className="font-medium">
            {formatDate(registry.createdAt[3])}:
            {formatDate(registry.createdAt[4])}:
            {formatDate(registry.createdAt[5])}
          </span>
        </span>
      </div>
    </div>
  );
}
