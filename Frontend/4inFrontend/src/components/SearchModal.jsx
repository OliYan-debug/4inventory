import { Eraser, Rat, SearchIcon } from "lucide-react";
import { api } from "../services/api";
import { ItemFound } from "./ItemFound";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RouteFound } from "./RouteFound";

export function Search({ setOpenSearch }) {
  const [items, setItems] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const { register, handleSubmit, reset, setFocus } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setFocus("item");
  }, [setFocus, search]);

  const routes = [
    { id: 1, name: "Products", path: "/products" },
    { id: 2, name: "New Product", path: "/products/new" },
    { id: 3, name: "Delete Product", path: "/products/delete" },
    { id: 4, name: "Update Product", path: "/products/update" },
    { id: 5, name: "Product CheckIn", path: "/products/checkin" },
    { id: 6, name: "Product CheckOut", path: "/products/checkout" },
    { id: 7, name: "Dashboard", path: "/dashboard" },
    { id: 8, name: "Categories", path: "/categories" },
    { id: 9, name: "New Category", path: "/categories/new" },
    { id: 10, name: "Profile", path: "/user" },
    { id: 11, name: "Users", path: "/admin/users" },
    { id: 12, name: "Logout", path: "/logout" },
  ];

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
    if (data === "") {
      setItems([]);
      return;
    }

    api
      .get(`/search?s=${data}`)
      .then((response) => {
        response.data.length > 0 ? setItems(response.data) : setItems([]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const searchRoutes = (value) => {
    if (value === "") {
      setFilteredRoutes([]);
      return;
    }

    const query = value.toLowerCase();

    const result = routes.filter((route) =>
      route.name.toLowerCase().includes(query),
    );

    setFilteredRoutes(result);
  };

  const handleResetSearch = () => {
    reset();
    setSearch("");
    setItems([]);
    setFilteredRoutes([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        className="mx-4 flex min-h-72 w-full flex-col items-center rounded-2xl bg-neutral-50 py-4 text-center transition-all md:mx-0 md:w-[50vw]"
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
            {...register("item", {
              required: true,
            })}
            type="text"
            id="search"
            autoFocus
            autoComplete="off"
            onKeyUp={(e) => {
              onSubmit(e.target.value);
              setSearch(e.target.value);
              searchRoutes(e.target.value);
            }}
            className="h-8 w-full bg-transparent pl-1 pr-11 text-neutral-500 outline-none"
            placeholder="Search items"
          />

          {search !== "" && (
            <button
              type="button"
              className="absolute right-16 hover:opacity-50"
              onClick={() => handleResetSearch()}
            >
              <Eraser size={20} color="#737373" />
            </button>
          )}
        </div>

        <div className="mt-2 max-h-96 w-full overflow-y-scroll border-t border-neutral-300">
          {items.length === 0 && filteredRoutes.length === 0 ? (
            <>
              {search !== "" && (
                <div className="mt-4 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <p className="font-medium text-neutral-600">{`No items found for "${search}"`}</p>
                  <button
                    type="button"
                    onClick={() => handleResetSearch()}
                    className="flex rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                  >
                    Clear and try again
                  </button>
                </div>
              )}
            </>
          ) : (
            <div>
              <ul className="flex flex-col gap-2 p-2">
                {items.length > 0 && (
                  <>
                    <h3 className="text-start text-lg font-medium text-neutral-700">
                      Items
                    </h3>

                    {items.map((item) => {
                      return (
                        <ItemFound
                          key={item.id}
                          id={item.id}
                          item={item.item}
                          category={item.category}
                          setOpenSearch={setOpenSearch}
                        />
                      );
                    })}
                  </>
                )}
              </ul>
              <ul className="flex flex-col gap-2 p-2">
                {filteredRoutes.length > 0 && (
                  <>
                    <h3 className="text-start text-lg font-medium text-neutral-700">
                      Pages
                    </h3>

                    {filteredRoutes.map((route) => {
                      return (
                        <RouteFound
                          key={route.id}
                          name={route.name}
                          path={route.path}
                          setOpenSearch={setOpenSearch}
                        />
                      );
                    })}
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
