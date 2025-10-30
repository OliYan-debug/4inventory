import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ChevronRight,
  Loader2,
  LucidePackageSearch,
  Rat,
  Undo2,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { ItemFound } from "./components/ItemFound";
import { RouteFound } from "@/components/RouteFound";
import { InputSearch } from "./components/InputSearch";
import { Button } from "@/components/Button";

export default function Search() {
  const { t, i18n } = useTranslation("search");
  const currentLanguage = i18n.language;

  const [items, setItems] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [search, setSearch] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isSubmitting },
  } = useForm({
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

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          {t("breadcrumb.products")}
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">{t("breadcrumb.search")}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      <div className="flex min-h-screen w-full justify-center rounded-2xl bg-neutral-50 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2 pt-8 md:w-1/2"
        >
          <div className="flex w-full">
            <div className="relative flex w-full items-center px-4">
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 hidden bg-sky-400 md:flex md:w-2/5"
            >
              <span>{t("buttons.submit")}</span>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="size-5 animate-spin" />
                </span>
              ) : (
                <LucidePackageSearch className="size-5" />
              )}
            </Button>
          </div>

          <div className="mt-2 w-full border-t border-neutral-300">
            {items.length === 0 && filteredRoutes.length === 0 ? (
              <>
                {search !== "" && (
                  <div className="animate-fade-in flex flex-col items-center gap-2 text-center text-neutral-500">
                    <Rat className="size-25 text-neutral-700" />

                    <p className="w-52 font-medium break-words text-neutral-600">{`${t("no_items.text")}: "${search}"`}</p>

                    <div className="w-full px-8">
                      <Button type="button" onClick={() => handleResetSearch()}>
                        {t("no_items.button.clear_and_try_again")}
                      </Button>
                    </div>

                    <p>{t("no_items.or")}</p>
                  </div>
                )}
              </>
            ) : (
              <div>
                <ul className="flex flex-col gap-2 p-2">
                  {items.length > 0 && (
                    <>
                      <h3 className="text-lg font-medium text-neutral-700">
                        {t("items")}
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
            {t("buttons.back")}
            <Undo2 size={20} color="#a3a3a3" className="ms-1" />
          </Link>
        </form>
      </div>
    </div>
  );
}
