import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useCookies } from "react-cookie";
import { ChevronRight } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { History } from "../components/History";
import { Pagination } from "../components/Pagination";
import { toast } from "react-toastify";

export default function Dashboard() {
  let { page } = useParams();
  const [cookies] = useCookies();
  const [registers, setRegisters] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const defaultSort = "createdAt,desc";
  const [sort, setSort] = useState(defaultSort);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalRegistries, setTotalRegistries] = useState(0);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/registry", {
            params: {
              page,
              size: cookies.paginationSize || 10,
              sort,
            },
          }),
          {
            pending: "Finding registers",
            success: {
              render({ data }) {
                return (
                  <p>
                    Registers found:{" "}
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

        setRegisters(response.data.content);
        setResponse(response.data);
        setTotalRegistries(response.data.totalElements);
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

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Dashboard</span>
      </p>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Header title={"Dashboard"} subtitle={Subtitle()} />

        <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-row justify-center gap-6">
              <Card title="Products" total={totalItems} />
              <Card title="Categories" total={totalCategories} />
              <Card title="Inventory movements" total={totalRegistries} />
            </div>

            <History
              registers={registers}
              setSort={setSort}
              loading={loading}
              updateData={updateData}
            />
          </div>

          {registers.length > 0 && (
            <Pagination
              totalElements={response.totalElements}
              totalPages={response.totalPages}
              pageNumber={response.pageable.pageNumber}
              numberOfElements={response.numberOfElements}
              first={response.first}
              last={response.last}
              setSize={setSize}
              path={"dashboard"}
            />
          )}
        </div>
      </div>
    </>
  );
}
