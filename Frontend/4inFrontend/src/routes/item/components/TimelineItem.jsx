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

export function Timeline({ label, justification, author, createdAt, isLast }) {
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

  const bgColor = bgColorMap[label] ?? "bg-neutral-200";

  const formatDate = (value) => value.toString().padStart(2, "0");

  return (
    <div className="flex w-full animate-fade-in items-center space-x-2 md:w-96">
      <div className="relative flex justify-center">
        {!isLast && (
          <span className="absolute bottom-11 block h-6 border-s-2 border-dashed border-neutral-400" />
        )}

        <div
          className={`flex size-10 items-center justify-center rounded-lg ${bgColor}`}
        >
          {getIcon(label)}
        </div>
      </div>

      <div className="flex max-w-28 flex-col justify-center md:max-w-64">
        <div className="group/justification relative">
          <p className="truncate text-base font-semibold leading-tight text-neutral-800">
            {justification.length > 20
              ? `${justification.substring(0, 24)}...`
              : justification}
          </p>

          {justification.length > 20 && (
            <div className="absolute top-8 z-10 hidden w-64 max-w-64 animate-fade-in justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 shadow-md group-hover/justification:flex">
              <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-l border-t border-neutral-500 bg-neutral-400"></span>
              <p className="text-justify text-xs text-neutral-50">
                {justification}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-0.5 text-xs text-neutral-600">
          <IdCard className="size-4" />
          <span>{author}</span>
        </div>
      </div>

      <div className="flex h-6 items-center gap-1 border-s border-neutral-400 ps-2">
        <CalendarFold className="size-4 text-neutral-800" />
        <span className="text-xs text-neutral-600">
          {currentLanguage === "en-US" ? (
            <>
              {createdAt[0]}/{formatDate(createdAt[1])}/
              {formatDate(createdAt[2])}
            </>
          ) : (
            <>
              {formatDate(createdAt[2])}/{formatDate(createdAt[1])}/
              {createdAt[0]}
            </>
          )}{" "}
          <span className="font-medium">
            {formatDate(createdAt[3])}:{formatDate(createdAt[4])}:
            {formatDate(createdAt[5])}
          </span>
        </span>
      </div>
    </div>
  );
}
