import { Rat, X } from "lucide-react";
import { ItemFound } from "./ItemFound";
import { useEffect, useRef, useState } from "react";
import { RouteFound } from "./RouteFound";
import { useTranslation } from "react-i18next";
import { InputSearch } from "./InputSearch";
import { api } from "../services/api";
import { useForm } from "react-hook-form";
import { Button } from "./Button";

export function Search({ setOpenSearch }) {
  const { t, i18n } = useTranslation("search");
  const currentLanguage = i18n.language;

  const [items, setItems] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  const { register, handleSubmit, reset, setFocus } = useForm({
    mode: "onChange",
  });

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

  const handleResetSearch = () => {
    reset();
    setSearch("");
    setItems([]);
    setFilteredRoutes([]);
  };

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

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
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
            className="absolute right-4 flex cursor-pointer items-center transition hover:opacity-80"
          >
            <kbd className="hidden rounded-lg border border-neutral-400 bg-neutral-500 px-2 py-1.5 text-xs font-semibold text-neutral-200 md:block">
              ESC
            </kbd>
            <X size={24} className="block text-neutral-500 md:hidden" />
          </button>

          <InputSearch
            register={register}
            setFocus={setFocus}
            onSubmit={onSubmit}
            search={search}
            setSearch={setSearch}
            setItems={setItems}
            setFilteredRoutes={setFilteredRoutes}
            handleResetSearch={handleResetSearch}
          />
        </div>

        <div className="mt-2 max-h-96 w-full overflow-y-scroll border-t border-neutral-300">
          {items.length === 0 && filteredRoutes.length === 0 ? (
            <>
              {search !== "" && (
                <div className="animate-fade-in flex flex-col items-center gap-2 text-center text-neutral-500">
                  <Rat className="size-25 text-neutral-700" />

                  <p className="w-52 font-medium break-words text-neutral-600">{`${t("no_items.text")}: "${search}"`}</p>

                  <div className="w-full px-20">
                    <Button type="button" onClick={() => handleResetSearch()}>
                      {t("no_items.button.clear_and_try_again")}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              <ul className="flex flex-col gap-2 p-2">
                {items.length > 0 && (
                  <>
                    <h3 className="text-start text-lg font-medium text-neutral-700">
                      {t("items")}
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
                      {t("pages")}
                    </h3>

                    {filteredRoutes.map((route) => {
                      return (
                        <RouteFound
                          key={route.id}
                          name={
                            currentLanguage === "en-US"
                              ? route.name_en
                              : route.name_pt
                          }
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
