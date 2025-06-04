import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FolderSync, Rat } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { User } from "../components/User";
import { toast } from "react-toastify";
import { TableHeader } from "../components/TableHeader";
import { useTranslation } from "react-i18next";

export default function Users() {
  const { t } = useTranslation("users");

  const [sort, setSort] = useState("name,asc");

  const [users, setUsers] = useState([]);

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  let count = 0;

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const urlSort = searchParams.get("sort")?.replace("-", ",");

  useEffect(() => {
    urlSort && setSort(urlSort);
  }, [urlSort]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get("/admin/users", {
            params: {
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
              toastId: 1,
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
                        path:/admin/users
                      </span>
                    </p>
                  );
                }

                return <p>{t("loading.errors.generic")}</p>;
              },
            },
          },
        );

        setUsers(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.status === 403) {
          navigate("/logout");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [sort, update]);

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const usersColumns = [
    {
      label: t("columns.name"),
      orderBy: "name",
      sorting: true,
      order: "asc",
      isOrderable: true,
    },
    {
      label: t("columns.user"),
      orderBy: "username",
      sorting: false,
      order: "neutral",
      isOrderable: true,
    },
    {
      label: t("columns.permission"),
      orderBy: "role",
      sorting: false,
      order: "neutral",
      isOrderable: true,
    },
    {
      label: t("columns.actions"),
      orderBy: "",
      sorting: false,
      order: "",
      isOrderable: false,
    },
  ];

  const Subtitle = () => {
    return (
      <p className="text-sm text-neutral-500">
        {t("subtitle")}: <span className="font-bold">{users.length}</span>
      </p>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()}></Header>

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div>
          <TableHeader columnsDefault={usersColumns} />

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {users.length <= 0 ? (
                <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <p className="font-medium text-neutral-600">{t("noUsers")}</p>

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
                  {users.map((user) => {
                    count++;
                    return (
                      <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        permission={user.permission}
                        count={count}
                        updateData={updateData}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
