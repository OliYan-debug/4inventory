import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ChevronRight,
  Eraser,
  LucidePackageSearch,
  Rat,
  SearchIcon,
  Undo2,
} from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ItemFound } from "../components/ItemFound";
import { RouteFound } from "../components/RouteFound";

export default function Search() {
  const [items, setItems] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [search, setSearch] = useState("");

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

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Search</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Search"} subtitle={Subtitle()} />

      <div className="flex min-h-screen w-full justify-center rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 pt-8 md:w-1/2"
        >
          <div className="relative flex w-full items-center px-4">
            <label htmlFor="search">
              <SearchIcon color="#525252" size={20} className="mt-px" />
            </label>
            <input
              {...register("item", {
                required: true,
              })}
              type="text"
              id="search"
              autoComplete="off"
              onKeyUp={(e) => {
                onSubmit(e.target.value);
                setSearch(e.target.value);
                searchRoutes(e.target.value);
              }}
              className="h-8 w-full bg-transparent pl-1 pr-11 text-neutral-500 outline-none"
              placeholder="Search items or pages"
            />

            {search !== "" && (
              <button
                type="button"
                className="absolute right-5 hover:opacity-50 md:right-40"
                onClick={() => handleResetSearch()}
              >
                <Eraser size={20} color="#737373" />
              </button>
            )}

            <button
              type="submit"
              className="hidden items-center justify-center rounded-lg bg-sky-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-sky-500 md:flex md:w-2/5"
            >
              <LucidePackageSearch size={20} color="#fafafa" className="me-2" />
              Search
            </button>
          </div>

          <div className="mt-2 w-full border-t border-neutral-300">
            {items.length === 0 && filteredRoutes.length === 0 ? (
              <>
                {search !== "" && (
                  <div className="flex animate-fadeIn flex-col items-center gap-2">
                    <Rat size={100} className="text-neutral-700" />
                    <p className="w-52 break-words font-medium text-neutral-600">{`No items found for "${search}"`}</p>
                    <button
                      type="button"
                      onClick={() => handleResetSearch()}
                      className="flex rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                    >
                      Clear and try again
                    </button>
                    <p>or</p>
                  </div>
                )}
              </>
            ) : (
              <div>
                <ul className="flex flex-col gap-2 p-2">
                  {items.length > 0 && (
                    <>
                      <h3 className="text-lg font-medium text-neutral-700">
                        Items
                      </h3>

                      {items.map((item) => {
                        return (
                          <ItemFound
                            key={item.id}
                            id={item.id}
                            item={item.item}
                            category={item.category}
                          />
                        );
                      })}
                    </>
                  )}
                </ul>
                <ul className="flex flex-col gap-2 p-2">
                  {filteredRoutes.length > 0 && (
                    <>
                      <h3 className="text-lg font-medium text-neutral-700">
                        Pages
                      </h3>

                      {filteredRoutes.map((route) => {
                        return (
                          <RouteFound
                            key={route.id}
                            name={route.name}
                            path={route.path}
                          />
                        );
                      })}
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          <Link
            to={"/products"}
            className="flex items-center font-semibold text-neutral-400 hover:underline hover:opacity-80 disabled:cursor-no-drop disabled:opacity-70"
          >
            Back to products
            <Undo2 size={20} color="#a3a3a3" className="ms-1" />
          </Link>
        </form>
      </div>
    </div>
  );
}
