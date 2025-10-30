import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FolderSync, Rat } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";
import { Header } from "@/components/header/Header";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { TableHeader } from "@/components/table/TableHeader";
import { Button } from "@/components/Button";
import { User } from "./components/User";

export default function Users() {
  const { t } = useTranslation("users");

  const [users, setUsers] = useState([]);

  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const searchParams = new URLSearchParams(location.search);

  const urlSort = searchParams.get("sort")?.replace("-", ",");

  const defaultParams = {
    sort: "name,asc",
  };

  const initialSort = urlSort || defaultParams.sort;

  const [sort, setSort] = useState(initialSort);

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

                return <p>{t("loading.errors.generic")}</p>;
              },
            },
          },
        );

        setUsers(response.data.content);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [sort, update]);

  useEffect(() => {
    let errors = 0;

    if (urlSort) {
      const currentSortSplit = urlSort.split(",");
      let currentSortOrderBy = currentSortSplit[0];
      let currentSortOrder = currentSortSplit[1];

      let currentSortIndex = usersColumns.findIndex(
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

    if (errors > 0) {
      toast.warning(t("wrongFilter"));
      navigate(path);
    }
  }, [urlSort]);

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

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
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {users.length <= 0 ? (
                <div className="animate-fade-in mt-10 flex flex-col items-center gap-2">
                  <div className="flex w-64 flex-col items-center gap-2 text-neutral-600">
                    <Rat className="size-25 text-neutral-700" />

                    <span className="font-medium">{t("noUsers")}</span>

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
                  <TableHeader columnsDefault={usersColumns} />

                  {users.map((user, index) => {
                    return (
                      <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        permission={user.permission}
                        count={index}
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
