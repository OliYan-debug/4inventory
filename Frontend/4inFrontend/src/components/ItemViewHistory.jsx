import { useEffect, useState } from "react";
import { History } from "./History";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../services/api";

export function ItemViewHistory({ itemId }) {
  const [registers, setRegisters] = useState([]);
  const [update, setUpdate] = useState(false);
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

        console.log(response);
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
  }, [update]);

  const updateData = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  return (
    <History registers={registers} loading={loading} updateData={updateData} />
  );
}
