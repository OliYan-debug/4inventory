import {
  ClipboardCheck,
  ClipboardCopy,
  ClipboardEdit,
  ClipboardMinus,
  ClipboardPaste,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { formatDate } from "@/utils/formatDate";

export function Registry({ registry, count }) {
  const { t, i18n } = useTranslation("dashboard");

  const currentLanguage = i18n.language;

  const getLabel = (label) => {
    switch (label) {
      case "ADD":
        return (
          <>
            <p className="text-neutral-500">{t("labels.add")}</p>
            <ClipboardCheck className="size-4 text-green-400" />
          </>
        );
      case "REMOVE":
        return (
          <>
            <p className="text-neutral-500">{t("labels.remove")}</p>
            <ClipboardMinus className="size-4 text-red-400" />
          </>
        );
      case "UPDATE":
        return (
          <>
            <p className="text-neutral-500">{t("labels.update")}</p>
            <ClipboardEdit className="size-4 text-indigo-400" />
          </>
        );
      case "CHECK_IN":
        return (
          <>
            <p className="text-neutral-500">{t("labels.checkin")}</p>
            <ClipboardCopy className="size-4 text-sky-400" />{" "}
          </>
        );
      case "CHECK_OUT":
        return (
          <>
            <p className="text-neutral-500">{t("labels.checkout")}</p>
            <ClipboardPaste className="size-4 text-orange-400" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`animate-fade-in grid min-w-[840px] grid-cols-6 justify-items-center text-wrap ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="max-w-40 truncate text-neutral-500">{registry.item}</p>
      </div>

      <div className="col-auto flex items-center gap-1 py-2">
        {getLabel(registry.label)}

        {registry.label === "CHECK_IN" && (
          <span className="rounded-md bg-sky-300 px-1 py-px text-xs text-sky-800">
            +{registry.actualState - registry.previousState}
          </span>
        )}

        {registry.label === "CHECK_OUT" && (
          <span className="rounded-md bg-orange-300 px-1 py-px text-xs text-orange-800">
            -{registry.previousState - registry.actualState}
          </span>
        )}
      </div>

      <div className="group/justification relative col-span-2 flex items-center justify-center py-2">
        <p className="text-neutral-500">
          {registry.justification.length > 20
            ? `${registry.justification.substring(0, 24)}...`
            : registry.justification}
        </p>

        {registry.justification.length > 20 && (
          <div className="animate-fade-in absolute top-10 z-10 hidden max-w-72 justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 text-wrap break-all shadow-md group-hover/justification:flex">
            <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-t border-l border-neutral-500 bg-neutral-400"></span>
            <p className="text-justify text-xs text-neutral-50">
              {registry.justification}
            </p>
          </div>
        )}
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="font-medium text-neutral-500">{registry.author}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-xs text-neutral-500">
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
        </p>
      </div>
    </div>
  );
}
