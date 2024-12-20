import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ChevronRight,
  LucidePackageSearch,
  Rat,
  SearchIcon,
  Undo2,
} from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ItemFound } from "../components/ItemFound";

export default function SearchItem() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (data === "") {
      return;
    }

    api
      .get(`/search/${data}`)
      .then((response) => {
        response.data.length > 0 ? setItems(response.data) : setItems([]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Search Item</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Search Item"} subtitle={subtitle()} />

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
              autoFocus
              autoComplete="off"
              onKeyDown={(e) => {
                onSubmit(e.target.value);
                setSearch(e.target.value);
              }}
              className="h-8 w-full bg-transparent pl-1 pr-11 text-neutral-500 outline-none"
              placeholder="Search items"
            />

            <button
              type="submit"
              className="hidden items-center justify-center rounded-lg bg-sky-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-sky-500 md:flex md:w-2/5"
            >
              <LucidePackageSearch size={20} color="#fafafa" className="me-2" />
              Search item
            </button>
          </div>

          <div className="mt-2 w-full border-t border-neutral-300">
            <ul className="flex flex-col gap-2 p-2">
              {items.length === 0 ? (
                <>
                  {search !== "" && (
                    <div className="flex animate-fadeIn flex-col items-center gap-2">
                      <Rat size={100} className="text-neutral-700" />
                      <p className="font-medium text-neutral-600">{`No items found for "${search}"`}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearch("");
                          reset();
                        }}
                        className="flex rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                      >
                        Clear your search and try again
                      </button>
                      <p>or</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {items.map((item) => {
                    return (
                      <ItemFound
                        key={item.id}
                        id={item.id}
                        item={item.item}
                        category={item.category[0].name}
                      />
                    );
                  })}
                </>
              )}
            </ul>
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
