import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Ellipsis,
  PackageX,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { ItemMenu } from "./ItemMenu";
import { getContrastingTextColor } from "@/utils/getContrast";

export function Item({
  id,
  item,
  description,
  categories,
  quantity,
  createdAt,
  count,
}) {
  const { i18n } = useTranslation("item");
  const currentLanguage = i18n.language;

  const [itemMenuOpen, setItemMenuOpen] = useState(false);

  function handleOpenItemMenu() {
    setItemMenuOpen(true);
  }

  const formatDate = (value) => value.toString().padStart(2, "0");

  return (
    <div
      className={`animate-fade-in relative grid min-h-12 min-w-[840px] grid-cols-7 items-center justify-items-center text-wrap text-neutral-500 ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="absolute left-4 py-2">
        <button
          type="button"
          onClick={() => handleOpenItemMenu()}
          disabled={itemMenuOpen}
          className="transition hover:opacity-60 disabled:cursor-no-drop disabled:opacity-60"
        >
          <Ellipsis className="size-5 text-neutral-500" />
        </button>

        {itemMenuOpen && (
          <ItemMenu
            id={id}
            quantity={quantity}
            setItemMenuOpen={setItemMenuOpen}
          />
        )}
      </div>

      <div className="col-auto flex items-center py-2">
        <p>{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <Link to={`item/${id}`}>
          <p className="group flex items-center gap-1 underline transition hover:font-semibold">
            {item}
            <SquareArrowOutUpRight
              size={12}
              className="-translate-x-4 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
            />
          </p>
        </Link>
      </div>

      <div className="group/description relative col-span-2 flex items-center justify-center py-2">
        <p>
          {description.length > 20
            ? `${description.substring(0, 24)}...`
            : description}
        </p>

        {description.length > 20 && (
          <div className="animate-fade-in absolute top-10 z-10 hidden max-w-72 justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 text-wrap break-all shadow-md group-hover/description:flex">
            <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-t border-l border-neutral-500 bg-neutral-400"></span>
            <p className="text-justify text-xs text-neutral-50">
              {description}
            </p>
          </div>
        )}
      </div>

      <div className="col-auto flex flex-col items-center gap-0.5 py-2">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              style={{ backgroundColor: category.color }}
              className="w-32 max-w-32 truncate rounded-2xl px-2 py-0.5 text-center text-xs"
            >
              <p
                className={`getContrastingTextColor truncate drop-shadow-xs ${getContrastingTextColor(category.color)}`}
              >
                {category.name}
              </p>
            </div>
          );
        })}
      </div>

      <div className="col-auto flex items-center py-2">
        <p
          className={`flex items-center gap-0.5 ${quantity <= 0 ? "font-semibold text-red-700" : "text-neutral-500"}`}
        >
          {quantity}
          {quantity <= 0 && <PackageX className="size-5" />}
        </p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="flex items-center gap-0.5">
          <>
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
            )}
          </>
          <Calendar className="size-4" />
        </p>
      </div>
    </div>
  );
}
