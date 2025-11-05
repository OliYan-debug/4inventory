import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Braces,
  DatabaseBackup,
  DownloadIcon,
  FileClock,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/Button";
import { api } from "@/services/api";

export function DownloadBackup() {
  const navigate = useNavigate();

  const [blob, setBlob] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBackupData = async () => {
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
        error: {
          render({ data }) {
            if (data.code === "ECONNABORTED" || data.code === "ERR_NETWORK") {
              return (
                <p>
                  Network error{" "}
                  <span className="text-xs opacity-80">
                    #timeout exceeded/network error.
                  </span>
                </p>
              );
            }

            if (data.code === "ERR_BAD_REQUEST") {
              return (
                <p>
                  Token error{" "}
                  <span className="text-xs opacity-80">path:/products</span>
                </p>
              );
            }

            return <p>Generic error</p>;
          },
        },
      });

      if (response.status === 200) {
        const json = JSON.stringify(response.data, null, 2);
        const blob = new Blob([json], { type: "application/json" });

        setBlob(blob);

        const now = new Date();
        setFileName(`4in_data_${now.toISOString()}.json`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.status === 403) {
        navigate("/logout");
      }
    } finally {
      setLoading(false);
    }
  };

  function downloadFile() {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  return (
    <div className="animate-fade-in flex w-full flex-col items-center gap-4">
      <span className="font-medium">Generate backup file</span>

      <DatabaseBackup className="size-16 text-sky-500" />

      <p className="text-center text-neutral-700">
        With this file, you can recover data from 4Inventory.
      </p>

      {blob && (
        <div className="flex flex-col items-center space-y-1">
          <button
            type="button"
            title={`Download ${fileName}`}
            onClick={() => downloadFile()}
            className="animate-fade-in flex h-16 min-w-64 cursor-pointer flex-row items-center gap-2 rounded-lg bg-neutral-200 px-4 transition hover:bg-neutral-300"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-neutral-100">
              <Braces className="size-4 text-sky-500" />
            </div>

            <span className="pointer-events-none text-sm text-neutral-500">
              {fileName}
            </span>

            <div className="flex flex-col items-center gap-1 border-l border-neutral-400 pl-2">
              <span className="text-xs text-neutral-500">
                {formatBytes(blob.size)}
              </span>

              <DownloadIcon className="size-4 text-neutral-700" />
            </div>
          </button>

          <span className="flex items-center gap-1 text-sm font-semibold text-red-500">
            Keep this file in a safe location! <Lock className="size-4" />
          </span>
        </div>
      )}

      {!blob ? (
        <Button
          type="button"
          disabled={loading}
          onClick={async () => await fetchBackupData()}
          className="w-64 bg-sky-400"
        >
          Get backup data <FileClock className="size-4" />
        </Button>
      ) : (
        <Button
          type="button"
          disabled={loading}
          onClick={() => downloadFile()}
          className="w-64 bg-sky-400"
        >
          Download <DownloadIcon className="size-4" />
        </Button>
      )}
    </div>
  );
}
