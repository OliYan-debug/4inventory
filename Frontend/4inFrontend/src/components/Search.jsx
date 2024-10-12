import { SearchIcon } from "lucide-react";
import { api } from "../services/api";
import ItemFound from "./ItemFound";
import { useEffect, useRef, useState } from "react";

export default function Search({ setOpenSearch }) {
  const [items, setItems] = useState([]);
  const ref = useRef(null);

  //close search shortcut key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenSearch(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpenSearch]);

  //click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setOpenSearch]);

  const onSubmit = (data) => {
    console.log(data);
    api
      .get(`/search/${data}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <form
        ref={ref}
        className="flex w-[50vw] flex-col items-center rounded-2xl bg-neutral-50 py-4 text-center"
      >
        <div className="relative flex w-full items-center px-4">
          <button
            type="button"
            onClick={() => {
              setOpenSearch(false);
            }}
            className="absolute right-4 flex items-center transition hover:opacity-80"
          >
            <kbd className="rounded-lg border border-neutral-400 bg-neutral-500 px-2 py-1.5 text-xs font-semibold text-neutral-200">
              ESC
            </kbd>
          </button>
          <label htmlFor="search">
            <SearchIcon color="#525252" size={20} className="mt-px" />
          </label>
          <input
            type="text"
            id="search"
            autoFocus
            autoComplete="off"
            onKeyDown={(e) => {
              onSubmit(e.target.value);
            }}
            className="h-8 w-full bg-transparent pl-1 pr-11 text-neutral-500 outline-none"
            placeholder="Search products"
          />
        </div>

        <div className="mt-2 w-full border border-x-0 border-neutral-300">
          <ul className="flex flex-col gap-2 p-2">
            {items.length > 0 &&
              items.map((item) => {
                return (
                  <ItemFound
                    key={item.id}
                    id={item.id}
                    item={item.item}
                    category={item.category[0].name}
                  />
                );
              })}
          </ul>
        </div>
      </form>
    </div>
  );
}
