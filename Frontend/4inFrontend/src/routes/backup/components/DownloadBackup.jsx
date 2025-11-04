import { useState } from "react";
import { useNavigate } from "react-router";
import { DatabaseBackup, Download } from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/Button";
import { api } from "@/services/api";

export function DownloadBackup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await toast.promise(api.get(`/backup`), {
        pending: "Loading",
        success: {
          render({ data }) {
            return (
              <p>
                Success{" "}
                <span className="font-semibold">{data.data.totalElements}</span>
              </p>
            );
          },
          toastId: "getRegister",
        },
      });

      const now = new Date();

      const json = JSON.stringify(response.data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `4in_data_${now.toISOString()}.json`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.status === 403) {
        navigate("/logout");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in flex w-full flex-col items-center gap-4">
      <span className="font-medium">Generate backup file</span>

      <DatabaseBackup className="size-16 text-sky-500" />

      <p className="text-center">
        With this file, you can recover data from 4Inventory. <br />
        <span className="text-sm font-semibold text-red-500">
          Keep this file in a safe location.
        </span>
      </p>

      <Button
        type="button"
        disabled={loading}
        onClick={async () => await fetchData()}
        className="w-64 bg-sky-400"
      >
        Get backup data <Download className="size-4" />
      </Button>
    </div>
  );
}
