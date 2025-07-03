import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ChevronRight, LucidePackageSearch, Rat, Undo2 } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { ItemFound } from "../components/ItemFound";
import { RouteFound } from "../components/RouteFound";
import { useTranslation } from "react-i18next";
import { InputSearch } from "../components/InputSearch";

export default function Search() {
  const { t, i18n } = useTranslation("search");
  const currentLanguage = i18n.language;

  const [items, setItems] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [search, setSearch] = useState("");

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
            <button
              type="submit"
              className="hidden items-center justify-center rounded-lg bg-sky-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-sky-500 md:flex md:w-2/5"
            >
              <LucidePackageSearch size={20} color="#fafafa" className="me-2" />

              {t("buttons.submit")}
            </button>
          </div>

          <div className="mt-2 w-full border-t border-neutral-300">
            {items.length === 0 && filteredRoutes.length === 0 ? (
              <>
                {search !== "" && (
                  <div className="flex animate-fade-in flex-col items-center gap-2">
                    <Rat size={100} className="text-neutral-700" />
                    <p className="w-52 break-words font-medium text-neutral-600">{`${t("no_items.text")} "${search}"`}</p>
                    <button
                      type="button"
                      onClick={() => handleResetSearch()}
                      className="flex rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                    >
                      {t("no_items.button.clear_and_try_again")}
                    </button>
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
