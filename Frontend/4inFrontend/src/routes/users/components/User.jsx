import { LockOpen, ShieldEllipsis, Trash } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ModalUserDelete } from "./ModalUserDelete";
import { ModalUserResetPassword } from "./ModalUserResetPassword";
import { ModalUserPermission } from "./ModalUserPermission";

export function User({ id, name, username, permission, count, updateData }) {
  const { t } = useTranslation("user");

  const [checkDeleteOpen, setCheckDeleteOpen] = useState(false);
  const [checkResetOpen, setCheckResetOpen] = useState(false);
  const [checkPermissionOpen, setCheckPermissionOpen] = useState(false);

  function handleConfirmDelete() {
    checkDeleteOpen ? setCheckDeleteOpen(false) : setCheckDeleteOpen(true);
  }

  function handleConfirmReset() {
    checkResetOpen ? setCheckResetOpen(false) : setCheckResetOpen(true);
  }

  function handleConfirmPermission() {
    checkPermissionOpen
      ? setCheckPermissionOpen(false)
      : setCheckPermissionOpen(true);
  }

  return (
    <div
      className={`animate-fade-in grid min-w-[840px] grid-cols-4 justify-items-center text-wrap ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{name}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{username}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{permission}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <div className="relative flex gap-4">
          <button
            type="button"
            onClick={() => handleConfirmPermission()}
            disabled={username === "admin"}
            title={t("actions.permission")}
            className="cursor-pointer transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <ShieldEllipsis className="size-5 text-green-700" />
          </button>

          <button
            type="button"
            onClick={() => handleConfirmReset()}
            title={t("actions.password")}
            className="cursor-pointer transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <LockOpen className="size-5 text-blue-700" />
          </button>

          <button
            type="button"
            onClick={() => handleConfirmDelete()}
            disabled={username === "admin"}
            title={t("actions.delete")}
            className="cursor-pointer transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <Trash className="size-5 text-red-600" />
          </button>
        </div>

        {checkPermissionOpen && (
          <ModalUserPermission
            id={id}
            username={username}
            name={name}
            permission={permission}
            setCheckPermissionOpen={setCheckPermissionOpen}
            updateData={updateData}
          />
        )}

        {checkResetOpen && (
          <ModalUserResetPassword
            id={id}
            username={username}
            name={name}
            setCheckResetOpen={setCheckResetOpen}
          />
        )}

        {checkDeleteOpen && (
          <ModalUserDelete
            id={id}
            username={username}
            name={name}
            setCheckDeleteOpen={setCheckDeleteOpen}
            updateData={updateData}
          />
        )}
      </div>
    </div>
  );
}
