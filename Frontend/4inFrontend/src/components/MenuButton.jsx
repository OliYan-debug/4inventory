import { Link } from "react-router-dom";

export function MenuButton({ label, path, Icon, hiddenNav, active }) {
  return (
    <li
      data-isActive={active}
      className="group/item relative flex cursor-pointer justify-center font-medium transition hover:bg-neutral-500 hover:font-bold data-[isActive=true]:bg-neutral-600 data-[isActive=true]:font-bold md:rounded-s-lg"
    >
      <Link
        to={path}
        className={
          "flex w-full flex-col-reverse px-4 md:flex-row md:px-0 md:py-4"
        }
      >
        <span
          data-isActive={active}
          className="mt-auto h-1 w-6 rounded-md bg-neutral-50 opacity-0 group-hover/item:opacity-100 data-[isActive=true]:opacity-100 md:me-4 md:h-6 md:w-1"
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
