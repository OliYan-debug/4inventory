import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CalendarPlus,
  ChevronRight,
  CalendarClock,
  Rat,
  PackageOpen,
  Undo2,
  HistoryIcon,
} from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

import { ItemViewHistory } from "../components/ItemViewHistory";
import { useTranslation } from "react-i18next";
import { ItemViewButtons } from "../components/ItemViewButtons";
import { getContrastingTextColor } from "../utils/getContrast";

export default function ItemView() {
  const { t, i18n } = useTranslation("item_view");
  const currentLanguage = i18n.language;

  let { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const response = await toast.promise(
            api.get(`/inventory/${itemId}`),
            {
              pending: t("loading.finding"),
              success: {
                render() {
                  return <p>{t("loading.success")}</p>;
                },
                toastId: itemId,
              },
              error: {
                render({ data }) {
                  if (
                    data.code === "ECONNABORTED" ||
                    data.code === "ERR_NETWORK"
                  ) {
                    return (
                      <p>
                        {t("loading.errors.network")}{" "}
                        <span className="text-xs opacity-80">
                          #timeout exceeded/network error.
                        </span>
                      </p>
                    );
                  }

                  if (data.code === "ERR_BAD_REQUEST") {
                    return <p>{t("loading.errors.badRequest")}</p>;
                  }

                  return <p>{t("loading.errors.generic")}</p>;
                },
              },
            },
          );

          setItem(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);

          if (error.status === 403) {
            navigate("/logout");
          }
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [itemId]);

  const formatDate = (value) => value.toString().padStart(2, "0");

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          {t("subtitle")}
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">{t("title")}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {item.length <= 0 ? (
                <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <p className="font-medium text-neutral-600">{t("noItem")}</p>

                  <Link
                    to={"/products"}
                    className="flex items-center gap-1 rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                  >
                    {t("buttons.backToProducts")} <Undo2 size={16} />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="relative mb-6 flex flex-col items-center justify-center gap-1 md:flex-row">
                    <div className="flex items-center justify-center px-2">
                      <div className="flex w-80 flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-100 px-8 py-4 text-neutral-800">
                        <div className="relative">
                          <div className="">
                            <PackageOpen
                              size={32}
                              className="absolute -left-6 -top-2"
                            />
                          </div>
                          <span className="flex justify-end text-sm">
                            #{item.id}
                          </span>
                          <h1
                            className={`max-w-full truncate text-center font-semibold ${item.item.length >= 20 ? "text-2xl" : "text-3xl"}`}
                          >
                            {item.item}
                          </h1>
                        </div>

                        <div className="group/description relative flex items-center justify-center">
                          <p className="max-w-full break-words text-justify text-neutral-500">
                            {item.description ? (
                              <>
                                {item.description.length > 90
                                  ? `${item.description.substring(0, 100)}...`
                                  : item.description}
                              </>
                            ) : (
                              <span className="italic">
                                {t("noDescription")}
                              </span>
                            )}
                          </p>

                          {item.description.length > 90 && (
                            <div className="absolute top-10 z-10 hidden max-w-72 animate-fadeIn justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 shadow-md group-hover/description:flex">
                              <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-l border-t border-neutral-500 bg-neutral-400"></span>
                              <p className="text-justify text-xs text-neutral-50">
                                {item.description}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center gap-1">
                          {item.category ? (
                            <>
                              {item.category.map((category) => {
                                return (
                                  <div
                                    key={category.id}
                                    style={{ backgroundColor: category.color }}
                                    className="rounded-2xl px-2 py-px text-sm"
                                  >
                                    <p
                                      className={`max-w-32 truncate drop-shadow-sm ${getContrastingTextColor(category.color)}`}
                                    >
                                      {category.name}
                                    </p>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="flex gap-2">
                              <div className="flex h-4 w-20 animate-pulse rounded-lg bg-neutral-300"></div>

                              <div className="flex h-4 w-24 animate-pulse rounded-lg bg-neutral-200"></div>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 flex justify-center gap-1">
                          <p className="font-semibold">{t("quantity")}:</p>
                          <span className="flex items-center">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-col gap-1 border-t border-neutral-200 pt-2">
                          <div className="flex justify-center gap-1 text-xs text-neutral-500">
                            <p className="font-semibold">{t("createdAt")}:</p>
                            <span className="flex items-center gap-1">
                              {item.createdAt ? (
                                <>
                                  {currentLanguage === "en-US" ? (
                                    <>
                                      {item.createdAt[0]}/
                                      {formatDate(item.createdAt[1])}/
                                      {formatDate(item.createdAt[2])}
                                    </>
                                  ) : (
                                    <>
                                      {formatDate(item.createdAt[2])}/
                                      {formatDate(item.createdAt[1])}/
                                      {item.createdAt[0]}
                                    </>
                                  )}
                                </>
                              ) : (
                                <div className="flex h-3 w-20 animate-pulse rounded-lg bg-neutral-300"></div>
                              )}
                              <CalendarPlus size={16} />
                            </span>
                          </div>

                          <div className="flex justify-center gap-1 text-xs text-neutral-500">
                            <p className="font-semibold">{t("lastUpdate")}:</p>
                            <span className="flex items-center gap-1">
                              {item.lastUpdate ? (
                                <>
                                  {currentLanguage === "en-US" ? (
                                    <>
                                      {item.lastUpdate[0]}/
                                      {formatDate(item.lastUpdate[1])}/
                                      {formatDate(item.lastUpdate[2])}
                                    </>
                                  ) : (
                                    <>
                                      {formatDate(item.lastUpdate[2])}/
                                      {formatDate(item.lastUpdate[1])}/
                                      {item.lastUpdate[0]}
                                    </>
                                  )}
                                  <> - </>
                                  {formatDate(item.lastUpdate[3])}:
                                  {formatDate(item.lastUpdate[4])}:
                                  {formatDate(item.lastUpdate[5])}
                                </>
                              ) : (
                                <div className="flex h-3 w-20 animate-pulse rounded-lg bg-neutral-200"></div>
                              )}
                              <CalendarClock size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ItemViewButtons item={item} />
                  </div>

                  <div className="flex flex-col items-center space-y-4">
                    <h2 className="flex items-center gap-1 text-xl font-semibold text-neutral-700">
                      {t("itemHistory")} <HistoryIcon className="size-4" />
                    </h2>

                    <div>
                      <ItemViewHistory itemId={itemId} />
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
