import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";
import { ItemTimeline } from "./Timeline";

export function ItemViewHistory({ itemId }) {
  const { t } = useTranslation("item_view_history");

  const [registers, setRegisters] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await toast.promise(
          api.get(`/registry/filter`, {
            params: {
              itemId,
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
                      {t("loading.errors.generic")}
                      <br />
                      <span className="text-xs opacity-80">
                        #timeout exceeded/network error.
                      </span>
                    </p>
                  );
                }

                if (data.code === "ERR_BAD_REQUEST") {
                  return (
                    <p>
                      {t("loading.errors.token")}
                      <br />
                      <span className="text-xs opacity-80">
                        path:/products/item
                      </span>
                    </p>
                  );
                }

                return <p>{t("loading.errors.generic")}</p>;
              },
            },
          },
        );

        setRegisters(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);

        if (error.status === 403) {
          navigate("/logout");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return <ItemTimeline registers={registers} loading={loading} />;
}
