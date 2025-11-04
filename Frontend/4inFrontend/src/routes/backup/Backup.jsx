import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import { Header } from "@/components/header/Header";
import { Button } from "@/components/Button";
import { DownloadBackup } from "./components/DownloadBackup";
import { UploadBackup } from "./components/UploadBackup";

export default function Backup() {
  let { tab } = useParams();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("backup");

  useEffect(() => {
    tab === "recovery" ? setSelectedTab("recovery") : setSelectedTab("backup");
  }, [tab]);

  const Subtitle = () => {
    return <p className="text-sm text-neutral-500">Backup and Recovery</p>;
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Backup"} subtitle={Subtitle()}></Header>

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div className="flex w-full flex-col items-center justify-center gap-4 px-8">
          <div className="flex flex-col items-center">
            <h3 className="flex items-center gap-1 text-2xl font-semibold text-neutral-800">
              Backup and Recovery
            </h3>

            <span className="text-neutral-500">Select what you want to do</span>
          </div>

          <div className="flex w-full flex-col items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-neutral-200">
              <Button
                type="button"
                data-active={selectedTab === "backup"}
                className="h-8 w-32 rounded-full bg-transparent text-neutral-500 underline-offset-2 data-[active=true]:bg-neutral-300 data-[active=true]:underline"
                onClick={() => navigate("/admin/backup")}
              >
                Backup
              </Button>

              <Button
                type="button"
                data-active={selectedTab === "recovery"}
                className="h-8 w-32 rounded-full bg-transparent text-neutral-500 underline-offset-2 data-[active=true]:bg-neutral-300 data-[active=true]:underline"
                onClick={() => navigate("/admin/backup/recovery")}
              >
                Recovery
              </Button>
            </div>

            {selectedTab === "backup" ? <DownloadBackup /> : <UploadBackup />}
          </div>
        </div>
      </div>
    </div>
  );
}
