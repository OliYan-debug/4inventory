import { LockOpen, ShieldEllipsis, Trash } from "lucide-react";
import { useState } from "react";
import { ModalUserDelete } from "./ModalUserDelete";
import { ModalUserResetPassword } from "./ModalUserResetPassword";
import { ModalUserPermission } from "./ModalUserPermission";

export function User({ id, name, username, permission, count, updateData }) {
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
      className={`grid min-w-[840px] animate-fadeIn grid-cols-4 justify-items-center text-wrap ${
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
            className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <ShieldEllipsis size={20} className="text-green-700" />
          </button>
          <button
            type="button"
            onClick={() => handleConfirmReset()}
            className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <LockOpen size={20} className="text-blue-700" />
          </button>
          <button
            type="button"
            onClick={() => handleConfirmDelete()}
            disabled={true}
            className="transition hover:opacity-80 disabled:cursor-no-drop disabled:opacity-60"
          >
            <Trash size={20} className="text-red-600" />
          </button>
        </div>

        {checkPermissionOpen && (
          <ModalUserPermission
            username={username}
            name={name}
            permission={permission}
            setCheckPermissionOpen={setCheckPermissionOpen}
            updateData={updateData}
          />
        )}

        {checkResetOpen && (
          <ModalUserResetPassword
            username={username}
            name={name}
            setCheckResetOpen={setCheckResetOpen}
          />
        )}

        {checkDeleteOpen && (
          <ModalUserDelete
            userId={id}
            userName={name}
            setCheckDeleteOpen={setCheckDeleteOpen}
          />
        )}
      </div>
    </div>
  );
}
