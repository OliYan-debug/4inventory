import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ChevronRight } from "lucide-react";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { Card } from "./components/Card";
import { Pagination } from "@/components/table/Pagination";
import { History } from "./components/History";

export default function Dashboard() {
  const { t } = useTranslation("dashboard");

  const [cookies, removeCookie] = useCookies(["4inUserSettings"]);

  let cookieSettings = {};

  if (cookies["4inUserSettings"]) {
    try {
      cookieSettings = JSON.parse(atob(cookies["4inUserSettings"]));
    } catch (error) {
      console.warn("Invalid cookie:", error);
      removeCookie("4inUserSettings", undefined, { path: "/" });
    }
  }

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const searchParams = new URLSearchParams(location.search);

  const urlSize = Number(searchParams.get("size"));
  const urlSort = searchParams.get("sort")?.replace("-", ",");
  const urlPage = Number(searchParams.get("page"));

  const defaultParams = {
    size: 20,
    sort: "createdAt,desc",
    page: 1,
  };

  const initialSize =
    (urlSize > 0 && urlSize) ||
    cookieSettings?.dashboardSize ||
    defaultParams.size;

  const initialSort =
    urlSort || cookieSettings?.dashboardSort || defaultParams.sort;

  const initialPage = (urlPage > 0 && urlPage) || defaultParams.page;

  const [sort, setSort] = useState(initialSort);
  const [size, setSize] = useState(initialSize);
  const [page, setPage] = useState(initialPage);

  const [registers, setRegisters] = useState([]);
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalRegistries, setTotalRegistries] = useState(0);

  const registersColumns = [
    {
      label: t("columns.id"),
      orderBy: "id",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.name"),
      orderBy: "item",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.type"),
      orderBy: "label",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.justification"),
      orderBy: "justification",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: true,
    },
    {
      label: t("columns.author"),
      orderBy: "author",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.createdAt"),
      orderBy: "createdAt",
      sorting: true,
      order: "desc",
      isOrderable: true,
      extendedColumn: false,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/registry", {
            params: {
              page: page - 1,
              size,
              sort,
            },
          }),
          {
            pending: t("loading.pending"),
            success: {
              render({ data }) {
                return (
                  <p>
                    {t("loading.success")}{" "}
                    <span className="font-semibold">
                      {data.data.totalElements}
                    </span>
                  </p>
                );
              },
              toastId: "getRegister",
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

                return <p>{t("loading.errors.generic")}</p>;
              },
            },
          },
        );

        setRegisters(response.data.content);
        setResponse(response.data);
        setTotalRegistries(response.data.totalElements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [page, sort, size, update]);

  useEffect(() => {
    let errors = 0;

    if (urlSort) {
      const currentSortSplit = urlSort.split(",");
      let currentSortOrderBy = currentSortSplit[0];
      let currentSortOrder = currentSortSplit[1];

      let currentSortIndex = registersColumns.findIndex(
        (element) => element.orderBy === currentSortOrderBy,
      );

      if (
        (currentSortIndex >= 0 && currentSortOrder === "asc") ||
        currentSortOrder === "desc"
      ) {
        setSort(urlSort);
      } else {
        setSort(defaultParams.sort);
        errors++;
      }
    }

    if (urlSize) {
      if (urlSize > 0) {
        setSize(urlSize);
      } else {
        setSize(defaultParams.size);
        errors++;
      }
    }

    if (response?.totalPages == null) return;

    if (urlPage) {
      if (urlPage <= response.totalPages && urlPage > 0) {
        setPage(urlPage);
      } else {
        setPage(defaultParams.page);
        errors++;
      }
    }

    if (errors > 0) {
      toast.warning(t("wrongFilter"));
      navigate(path);
    }
  }, [urlSize, urlSort, urlPage, response.totalPages]);

  useEffect(() => {
    api
      .get("/inventory")
      .then((response) => {
        setTotalItems(response.data.totalElements);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/category")
      .then((response) => {
        setTotalCategories(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          {t("breadcrumb.products")}
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">{t("breadcrumb.dashboard")}</span>
      </p>
    );
  };

  return (
    <>
      <div className="flex h-full flex-col gap-4">
        <Header title={t("title")} subtitle={Subtitle()} />

        <div className="mb-10 flex w-full flex-1 flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full gap-4 px-10 md:justify-center md:px-0">
              <Card title={t("card.products")} total={totalItems} />
              <Card title={t("card.categories")} total={totalCategories} />
              <Card title={t("card.inventory")} total={totalRegistries} />
            </div>

            <History
              registersColumns={registersColumns}
              registers={registers}
              loading={loading}
              updateData={updateData}
            />
          </div>

          {registers.length > 0 && (
            <Pagination
              totalElements={response.totalElements}
              totalPages={response.totalPages}
              pageNumber={response.pageable.pageNumber + 1}
              numberOfElements={response.numberOfElements}
              first={response.first}
              last={response.last}
              size={size}
            />
          )}
        </div>
      </div>
    </>
  );
}
