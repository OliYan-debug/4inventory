import { useEffect, useState } from "react";
import { FileIcon, FileX, UploadIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/Button";
import { api } from "@/services/api";

export function UploadBackup() {
  const { t } = useTranslation("backup");

  const [selectedFile, setSelectedFile] = useState(null);
  const [invalidFile, setInvalidFile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  function onFileSelected(event) {
    setSelectedFile(null);

    const { files } = event.target;

    if (files && files[0] && files[0].type.startsWith("application/json")) {
      setSelectedFile(files[0]);
    } else {
      setInvalidFile(true);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();

    setSelectedFile(null);

    const droppedFiles = e.dataTransfer.files;

    if (
      droppedFiles &&
      droppedFiles[0] &&
      droppedFiles[0].type.startsWith("application/json")
    ) {
      setSelectedFile(droppedFiles[0]);
    } else {
      setIsDragging(false);
      setInvalidFile(true);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsDragging(false);
  };

  async function processFileData() {
    if (!selectedFile) return;

    try {
      const text = await selectedFile.text();
      const data = JSON.parse(text);
      return data;
    } catch (error) {
      console.error("Error to read the JSON File:", error);
      setInvalidFile(true);
    }
  }

  async function onSubmit() {
    const data = await processFileData();

    if (!data) return;

    try {
      await toast.promise(api.post("/backup", data), {
        pending: t("upload.loading.pending"),
        success: t("upload.loading.success"),
        error: t("upload.loading.errors.generic"),
      });
    } catch (error) {
      console.error("Error when uploading:", error);

      setInvalidFile(true);
      setSelectedFile(null);
    }
  }

  useEffect(() => {
    selectedFile && setIsDragging(true);
  }, [selectedFile]);

  useEffect(() => {
    if (!invalidFile) return;

    let timeout = window.setTimeout(() => {
      setInvalidFile(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [invalidFile]);

  return (
    <div className="animate-fade-in flex w-full flex-col items-center gap-4">
      <span className="font-medium">{t("upload.title")}</span>

      <div className="relative w-full max-w-2xl">
        {selectedFile && (
          <Button
            type="button"
            onClick={() => handleRemoveFile()}
            title={t("upload.buttons.remove")}
            className="absolute top-0 right-0 z-10 m-2 flex size-6 rounded-full"
          >
            <X className="text-content-inverse size-4" />
          </Button>
        )}
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          data-dragging={isDragging}
          data-invalid={invalidFile}
          className="group flex h-64 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed bg-neutral-100 transition hover:bg-neutral-200/40 data-[dragging=true]:border-sky-500 data-[dragging=true]:bg-neutral-200 data-[invalid=true]:border-red-400"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 group-data-[dragging=true]:bg-neutral-100 group-data-[dragging=true]:text-sky-400 group-data-[invalid=true]:text-red-400">
            {invalidFile ? (
              <FileX className="size-4" />
            ) : selectedFile ? (
              <FileIcon className="size-4" />
            ) : (
              <UploadIcon className="size-4" />
            )}
          </span>

          {selectedFile ? (
            <span className="max-w-64 truncate text-center text-sm text-neutral-500 italic">
              {selectedFile.name}
            </span>
          ) : !invalidFile ? (
            <span className="text-center text-neutral-500">
              {t("upload.dropArea.description")}
            </span>
          ) : (
            <span className="text-center text-red-400">
              {t("upload.dropArea.error")}
            </span>
          )}

          <input
            className="hidden"
            type="file"
            id="file-input"
            multiple
            accept=".json"
            onChange={(event) => {
              onFileSelected(event);
              event.target.value = "";
            }}
          />
        </label>
      </div>

      <Button
        className="w-64 bg-sky-400"
        disabled={!selectedFile}
        onClick={async () => await onSubmit()}
      >
        {t("upload.buttons.upload")} <UploadIcon className="size-4" />
      </Button>
    </div>
  );
}
