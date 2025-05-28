import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { FolderSync, PlusCircle, Rat } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { Item } from "../components/Item";
import { Pagination } from "../components/Pagination";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { TableHeader } from "../components/TableHeader";

export default function Products() {
  const { t } = useTranslation("products");

  const [cookies] = useCookies(["4inUserPaginationSize"]);
  const userSize = cookies["4inUserPaginationSize"];

  const defaultSort = "id,asc";
  const [sort, setSort] = useState(defaultSort);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  let count = 0;

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const urlSize = searchParams.get("size");
  const urlSort = searchParams.get("sort");
  const urlPage = searchParams.get("page");

  useEffect(() => {
    setSize(urlSize);
    setSort(urlSort);
    setPage(urlPage);
  }, [urlSize, urlSort, urlPage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/inventory", {
            params: {
              page,
              size: userSize || size,
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

                if (data.code === "ERR_BAD_REQUEST") {
                  return (
                    <p>
                      {t("loading.errors.token")}{" "}
                      <span className="text-xs opacity-80">path:/products</span>
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

        if (error.status === 403) {
          navigate("/logout");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [page, sort, size, update, userSize]);

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

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

  const Subtitle = () => {
    return (
      <p className="text-sm text-neutral-500">
        {t("subtitle")}: <span className="font-bold">{items.length}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()}>
        <Link
          to={"/products/new"}
          className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
        >
          {t("buttons.new")} <PlusCircle size={16} />
        </Link>
      </Header>

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div>
          <TableHeader setSort={setSort} columnsDefault={productsColumns} />

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {items.length <= 0 ? (
                <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <div className="flex space-x-1">
                    <p className="font-medium text-neutral-600">
                      {t("noItems")}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/products`);
                      }}
                      className="font-bold text-neutral-600 underline hover:no-underline"
                    >
                      Clear filters
                    </button>
                  </div>
                  <Link
                    to={"/products/new"}
                    className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
                  >
                    {t("buttons.tryAdd")} <PlusCircle size={16} />
                  </Link>

                  <p className="text-neutral-600">{t("or")}</p>

                  <button
                    type="button"
                    onClick={() => {
                      updateData();
                    }}
                    className="flex items-center gap-1 rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                  >
                    {t("buttons.retry")} <FolderSync size={16} />
                  </button>
                </div>
              ) : (
                <>
                  {items.map((item) => {
                    count++;
                    return (
                      <Item
                        key={item.id}
                        id={item.id}
                        item={item.item}
                        description={item.description}
                        categories={item.category}
                        quantity={item.quantity}
                        createdAt={item.createdAt}
                        count={count}
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
            pageNumber={response.pageable.pageNumber}
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
