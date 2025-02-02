import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FolderSync, PlusCircle, Rat } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { Category } from "../components/Category";
import { toast } from "react-toastify";
import { TableHeader } from "../components/TableHeader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [update, setUpdate] = useState(false);
  let count = 0;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(api.get("/category"), {
          pending: "Finding categories",
          success: {
            render({ data }) {
              return (
                <p>
                  Categories found:{" "}
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
    update ? setUpdate(false) : setUpdate(true);
  };

  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  const categoriesColumns = [
    {
      label: "ID",
      isOrderable: false,
    },

    {
      label: "Name",
      isOrderable: false,
    },

    {
      label: "Color",
      isOrderable: false,
    },

    {
      label: "Actions",
      isOrderable: false,
    },
  ];

  const Subtitle = () => {
    return (
      <p className="mt-1 w-full text-sm text-neutral-500">
        Found: <span className="font-bold">{categories.length}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Categories"} subtitle={Subtitle()}>
        <Link
          to={"/categories/new"}
          className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
        >
          New <PlusCircle size={16} />
        </Link>
      </Header>

      <div className="min-h-screen w-full overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:overflow-x-hidden">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {categories.length <= 0 ? (
              <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                <Rat size={100} className="text-neutral-700" />
                <p className="font-medium text-neutral-600">
                  No categories found...
                </p>

                <Link
                  to={"/categories/new"}
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
                <TableHeader columnsDefault={categoriesColumns} />

                {categories.map((category) => {
                  count++;
                  return (
                    <Category
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      color={category.color}
                      updateData={updateData}
                      count={count}
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
