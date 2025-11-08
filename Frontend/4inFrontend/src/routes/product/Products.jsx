import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { FolderSync, PlusCircle, Rat } from "lucide-react";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { Item } from "./components/Item";
import { Pagination } from "@/components/table/Pagination";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { TableHeader } from "@/components/table/TableHeader";
import { Button } from "@/components/Button";

export default function Products() {
  const { t } = useTranslation("products");

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
    sort: "id,asc",
    page: 1,
  };

  const initialSize =
    (urlSize > 0 && urlSize) ||
    cookieSettings?.productsSize ||
    defaultParams.size;

  const initialSort =
    urlSort || cookieSettings?.productsSort || defaultParams.sort;

  const initialPage = (urlPage > 0 && urlPage) || defaultParams.page;

  const [sort, setSort] = useState(initialSort);
  const [size, setSize] = useState(initialSize);
  const [page, setPage] = useState(initialPage);

  const [items, setItems] = useState([]);
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const productsColumns = [
    {
      label: t("columns.id"),
      orderBy: "id",
      sorting: true,
      order: "asc",
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
      label: t("columns.description"),
      orderBy: "description",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: true,
    },
    {
      label: t("columns.categories"),
      orderBy: "category",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.quantity"),
      orderBy: "quantity",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: t("columns.createdAt"),
      orderBy: "createdAt",
      sorting: false,
      order: "neutral",
      isOrderable: true,
      extendedColumn: false,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/inventory", {
            params: {
              page: page - 1,
              size,
              sort,
            },
          }),
          {
            pending: t("loading.finding"),
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
              toastId: "getItem",
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

        setItems(response.data.content);
        setResponse(response.data);
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

      let currentSortIndex = productsColumns.findIndex(
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

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const Subtitle = () => {
    return (
      <p className="text-sm text-neutral-500">
        {t("subtitle")}: <span className="font-bold">{items.length}</span>
      </p>
    );
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()}>
        <div className="w-16">
          <Button className="h-6 border border-emerald-500 bg-transparent text-xs text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50">
            <Link to={"/products/new"} className="flex items-center gap-1">
              {t("buttons.new")} <PlusCircle className="size-4" />
            </Link>
          </Button>
        </div>
      </Header>

      <div className="mb-10 flex w-full flex-1 flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {items.length <= 0 ? (
                <div className="animate-fade-in mt-10 flex flex-col items-center gap-2">
                  <div className="flex w-64 flex-col items-center gap-2 text-neutral-600">
                    <Rat className="size-25 text-neutral-700" />

                    <span className="font-medium">{t("noItems")}</span>

                    <Button className="h-8 border border-emerald-500 bg-transparent text-xs text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50">
                      <Link
                        to={"/products/new"}
                        className="flex items-center gap-1"
                      >
                        {t("buttons.tryAdd")} <PlusCircle size={16} />
                      </Link>
                    </Button>

                    <span>{t("or")}</span>

                    <Button
                      type="button"
                      onClick={() => {
                        updateData();
                      }}
                      className="h-8"
                    >
                      {t("buttons.retry")} <FolderSync size={16} />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <TableHeader columnsDefault={productsColumns} />

                  {items.map((item, index) => {
                    return (
                      <Item
                        key={item.id}
                        id={item.id}
                        item={item.item}
                        description={item.description}
                        categories={item.category}
                        quantity={item.quantity}
                        createdAt={item.createdAt}
                        count={index}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>

        {items.length > 0 && (
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
  );
}
