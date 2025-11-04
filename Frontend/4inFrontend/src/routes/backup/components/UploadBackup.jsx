import { FileIcon, UploadIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/Button";

export function UploadBackup() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  function onFileSelected(event) {
    setSelectedFile(null);

    const { files } = event.target;

    if (!files) {
      return;
    }

    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  }

  const handleDrop = (e) => {
    e.preventDefault();

    setSelectedFile(null);

    const droppedFiles = e.dataTransfer.files;

    if (droppedFiles && droppedFiles[0]) {
      setSelectedFile(droppedFiles[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setIsDragging(false);
  };

  useEffect(() => {
    selectedFile && setIsDragging(true);
  }, [selectedFile]);

  return (
    <div className="animate-fade-in flex w-full flex-col items-center gap-4">
      <span className="font-medium">Upload the backup file</span>

      <div className="relative w-full max-w-2xl">
        {selectedFile && (
          <Button
            type="button"
            onClick={() => handleRemoveFile()}
            title="Remove"
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
          className="group flex h-64 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed bg-neutral-100 transition hover:bg-neutral-200/40 data-[dragging=true]:border-sky-500 data-[dragging=true]:bg-neutral-200"
        >
          <span className="flex size-14 items-center justify-center rounded-full bg-neutral-200 text-neutral-500 group-data-[dragging=true]:bg-neutral-100 group-data-[dragging=true]:text-sky-400">
            {selectedFile ? (
              <FileIcon className="size-4" />
            ) : (
              <UploadIcon className="size-4" />
            )}
          </span>

          {selectedFile ? (
            <span className="max-w-64 truncate text-center text-sm text-neutral-500 italic">
              {selectedFile.name}
            </span>
          ) : (
            <span className="text-center text-neutral-500">
              Drop the backup file here, or click to browse
            </span>
          )}

          <input
            className="hidden"
            type="file"
            id="file-input"
            multiple
            accept="image/*"
            onChange={(event) => {
              onFileSelected(event);

              event.target.value = "";
            }}
          />
        </label>
      </div>

      <Button className="w-64 bg-sky-400">
        Upload <UploadIcon className="size-4" />
      </Button>
    </div>
  );
}
