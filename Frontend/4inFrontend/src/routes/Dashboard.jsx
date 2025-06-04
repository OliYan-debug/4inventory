import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { ChevronRight } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { Card } from "../components/Card";
import { History } from "../components/History";
import { Pagination } from "../components/Pagination";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation("dashboard");

  const [cookies] = useCookies(["4inUserSettings"]);

  let cookieSettings = null;

  if (cookies["4inUserSettings"]) {
    cookieSettings = JSON.parse(atob(cookies["4inUserSettings"]));
  }

  const [sort, setSort] = useState("createdAt,desc");
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(0);

  const [registers, setRegisters] = useState([]);
  const [response, setResponse] = useState([]);

  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalRegistries, setTotalRegistries] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const urlSize = searchParams.get("size");
  const urlSort = searchParams.get("sort")?.replace("-", ",");
  const urlPage = searchParams.get("page");

  useEffect(() => {
    urlSize && setSize(urlSize);
    urlSort && setSort(urlSort);
    urlPage && setPage(urlPage);
  }, [urlSize, urlSort, urlPage]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/registry", {
            params: {
              page,
              size: cookieSettings?.dashboardSize || size,
              sort: cookieSettings?.dashboardSort || sort,
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

                if (data.code === "ERR_BAD_REQUEST") {
                  return (
                    <p>
                      {t("loading.errors.token")}{" "}
                      <span className="text-xs opacity-80">
                        path:/dashboard
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

        if (error.status === 403) {
          navigate("/logout");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [page, sort, size, update]);

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
          {t("breadcrumb.products")}
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">{t("breadcrumb.dashboard")}</span>
      </p>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <Header title={t("title")} subtitle={Subtitle()} />

        <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-row justify-center gap-6">
              <Card title={t("card.products")} total={totalItems} />
              <Card title={t("card.categories")} total={totalCategories} />
              <Card title={t("card.inventory")} total={totalRegistries} />
            </div>

            <History
              registers={registers}
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
              size={size}
            />
          )}
        </div>
      </div>
    </>
  );
}
