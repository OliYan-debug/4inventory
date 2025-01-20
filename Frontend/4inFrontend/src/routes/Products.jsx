import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FolderSync, PlusCircle, Rat } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { Item } from "../components/Item";
import { Pagination } from "../components/Pagination";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { toast } from "react-toastify";
import { TableHeader } from "../components/TableHeader";

export default function Products() {
  let { page } = useParams();
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [response, setResponse] = useState([]);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("id,asc");
  const [update, setUpdate] = useState(false);
  let count = 0;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/inventory/", {
            params: {
              page,
              size: cookies.paginationSize || 10,
              sort,
            },
          }),
          {
            pending: "Finding items",
            success: {
              render({ data }) {
                return (
                  <p>
                    Items found:{" "}
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
                      Error when finding, Try again.{" "}
                      <span className="text-xs opacity-80">
                        #timeout exceeded/network error.
                      </span>
                    </p>
                  );
                }

                if (data.code === "ERR_BAD_REQUEST") {
                  return (
                    <p>
                      Invalid Token, please log in again.{" "}
                      <span className="text-xs opacity-80">path:/products</span>
                    </p>
                  );
                }

                return <p>Error when finding. Try again.</p>;
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
  }, [page, sort, size, cookies.paginationSize, update]);

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const productsColumns = [
    {
      label: "ID",
      orderBy: "id",
      sorting: true,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Name",
      orderBy: "item",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Description",
      orderBy: "description",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: true,
    },
    {
      label: "Categories",
      orderBy: "category",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Quantity",
      orderBy: "quantity",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
    {
      label: "Created At",
      orderBy: "createdAt",
      sorting: false,
      order: "asc",
      isOrderable: true,
      extendedColumn: false,
    },
  ];

  const Subtitle = () => {
    return (
      <p className="text-sm text-neutral-500">
        Found: <span className="font-bold">{items.length}</span>
      </p>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Products"} subtitle={Subtitle()}>
        <Link
          to={"/products/new"}
          className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
        >
          New <PlusCircle size={16} />
        </Link>
      </Header>

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {items.length <= 0 ? (
                <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <p className="font-medium text-neutral-600">
                    No items found...
                  </p>
                  <Link
                    to={"/products/new"}
                    className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
                  >
                    Try adding some <PlusCircle size={16} />
                  </Link>

                  <p className="text-neutral-600">or</p>

                  <button
                    type="button"
                    onClick={() => {
                      updateData();
                    }}
                    className="flex items-center gap-1 rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                  >
                    Try again <FolderSync size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <TableHeader
                    setSort={setSort}
                    columnsDefault={productsColumns}
                  />

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
            setSize={setSize}
            path={"products"}
          />
        )}
      </div>
    </div>
  );
}
