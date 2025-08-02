import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FolderSync, PlusCircle, Rat } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { Category } from "../components/Category";
import { toast } from "react-toastify";
import { TableHeader } from "../components/TableHeader";
import { useTranslation } from "react-i18next";
import { Button } from "../components/Button";

export default function Categories() {
  const { t } = useTranslation("categories");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  const categoriesColumns = [
    {
      label: t("columns.id"),
      isOrderable: false,
    },

    {
      label: t("columns.name"),
      isOrderable: false,
    },

    {
      label: t("columns.color"),
      isOrderable: false,
    },

    {
      label: t("columns.actions"),
      isOrderable: false,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(api.get("/category"), {
          pending: t("loading.finding"),
          success: {
            render({ data }) {
              return (
                <p>
                  {t("loading.success")}{" "}
                  <span className="font-semibold">{data.data.length}</span>
                </p>
              );
            },
          },
          error: {
            render({ data }) {
              if (data.code === "ECONNABORTED" || data.code === "ERR_NETWORK") {
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
        });

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.status === 403) {
          navigate("/logout");
        }
      }

      handleButtonClick(null);
      setLoading(false);
    };

    fetchData();
  }, [update]);

  const updateData = () => {
    setUpdate(!update);
  };

  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  const Subtitle = () => {
    return (
      <p className="mt-1 w-full text-sm text-neutral-500">
        {t("subtitle")}: <span className="font-bold">{categories.length}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()}>
        <div className="w-16">
          <Button className="h-6 border border-emerald-500 bg-transparent text-xs text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50">
            <Link to={"/categories/new"} className="flex items-center gap-1">
              {t("buttons.new")} <PlusCircle className="size-4" />
            </Link>
          </Button>
        </div>
      </Header>

      <div className="min-h-screen w-full overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:overflow-x-hidden">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {categories.length <= 0 ? (
              <div className="animate-fade-in mt-10 flex flex-col items-center gap-2">
                <div className="flex w-64 flex-col items-center gap-2 text-neutral-600">
                  <Rat className="size-25 text-neutral-700" />

                  <span className="font-medium">{t("noCategories")}</span>

                  <Button className="h-8 border border-emerald-500 bg-transparent text-xs text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50">
                    <Link
                      to={"/categories/new"}
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
                    {t("buttons.tryAgain")} <FolderSync size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <TableHeader columnsDefault={categoriesColumns} />

                {categories.map((category, index) => {
                  return (
                    <Category
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      color={category.color}
                      updateData={updateData}
                      count={index}
                      activeButton={activeButton}
                      handleButtonClick={handleButtonClick}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
