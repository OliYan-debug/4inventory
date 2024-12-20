import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Ellipsis,
  PackageMinus,
  PackagePlus,
  PackageX,
  Pencil,
} from "lucide-react";

export function Item({
  id,
  item,
  description,
  categories,
  quantity,
  createdAt,
  count,
}) {
  const [itemMenuOpen, setItemMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setItemMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  function handleOpenItemMenu() {
    setItemMenuOpen(true);
  }

  const ItemMenu = () => {
    return (
      <div
        ref={ref}
        className="absolute left-1 top-5 z-10 animate-fadeIn rounded-lg bg-neutral-50 py-2 shadow-lg"
      >
        <ul className="flex w-36 flex-col gap-1 text-neutral-600">
          <Link
            to={`update/${id}`}
            className="flex h-7 w-full cursor-pointer items-center px-4 transition hover:bg-neutral-400 hover:font-medium"
          >
            <Pencil size={19} className="me-1" />
            Edit Item
          </Link>
          <li className="flex h-7 w-full cursor-pointer items-center px-4 transition hover:bg-neutral-400 hover:font-medium">
            <Link to={`checkin/${id}`} className="flex w-full items-center">
              <PackagePlus size={19} className="me-1" />
              Check-in
            </Link>
          </li>
          <li className="flex h-7 w-full cursor-pointer items-center px-4 transition hover:bg-neutral-400 hover:font-medium">
            <Link to={`checkout/${id}`} className="flex w-full items-center">
              <PackageMinus size={19} className="me-1" />
              Check-out
            </Link>
          </li>
          <li className="flex h-7 w-full cursor-pointer items-center border-t px-4 py-2 text-red-500 transition hover:bg-red-300 hover:font-medium">
            <Link to={`delete/${id}`} className="flex w-full items-center">
              <PackageX size={19} className="me-1" />
              Delete Item
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div
      className={`relative grid min-w-[840px] animate-fadeIn grid-cols-7 justify-items-center text-wrap ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="absolute left-4 top-1 py-2">
        <button
          type="button"
          onClick={() => handleOpenItemMenu()}
          disabled={itemMenuOpen}
          className="transition hover:opacity-60 disabled:cursor-no-drop disabled:opacity-60"
        >
          <Ellipsis color="#737373" size={20} />
        </button>

        {itemMenuOpen && <ItemMenu />}
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{item}</p>
      </div>

      <div className="group/description relative col-span-2 flex items-center justify-center py-2">
        <p className="text-neutral-500">
          {description.length > 20
            ? `${description.substring(0, 24)}...`
            : description}
        </p>

        <div className="absolute top-10 z-10 hidden max-w-72 animate-fadeIn justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 shadow-md group-hover/description:flex">
          <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-l border-t border-neutral-500 bg-neutral-400"></span>
          <p className="text-justify text-xs text-neutral-50">{description}</p>
        </div>
      </div>

      <div className="col-auto flex items-center gap-1 py-2">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              style={{ backgroundColor: category.color }}
              className="rounded-md px-1 py-px text-sm"
            >
              <p className="text-neutral-300 drop-shadow-sm">{category.name}</p>
            </div>
          );
        })}
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{quantity}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">
          {createdAt[0]}-{createdAt[1]}-{createdAt[2]}
        </p>
      </div>
    </div>
  );
}
