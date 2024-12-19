import { Link } from "react-router-dom";

export function MenuButton({ label, path, Icon, hiddenNav, active }) {
  return (
    <li
      className={`group/item relative flex cursor-pointer justify-center px-4 font-medium transition hover:bg-neutral-500 hover:font-bold md:rounded-s-lg md:px-0 md:py-4 ${active && "bg-neutral-600 font-bold"}`}
    >
      <Link to={path} className={"flex w-full flex-col-reverse md:flex-row"}>
        <span
          className={`mt-auto h-1 w-6 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 md:me-4 md:h-6 md:w-1 ${active && "opacity-100"}`}
        ></span>
        <div className="flex flex-col items-center md:flex-row md:gap-2">
          <Icon size={24} className="mt-4 text-neutral-50 md:mt-0" />

          {!hiddenNav && (
            <p className="hidden text-xs md:block md:text-base">{label}</p>
          )}
        </div>
      </Link>
    </li>
  );
}
