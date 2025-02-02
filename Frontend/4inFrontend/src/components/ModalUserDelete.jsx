import { Trash2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../services/api";

export function ModalUserDelete({
  id,
  username,
  name,
  setCheckDeleteOpen,
  updateData,
}) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      const result = await toast.promise(api.delete(`/admin/users/${id}`), {
        pending: "Deleting user",
        success: {
          render() {
            return <p>User deleted!</p>;
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                Error when deleting:
                <span className="font-bold">{data.response.data.message}</span>.
                Try again.
              </p>
            );
          },
        },
      });

      if (result.status === 200 && user.sub === username) {
        return navigate("/logout");
      }

      updateData();
      setCheckDeleteOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <div className="flex w-4/5 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[40vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-red-600/60">
          <Trash2 size={22} className="text-red-600" />
        </span>
        <h1 className="my-2 text-2xl font-bold text-neutral-800">
          Delete User?
        </h1>
        <span className="font-medium text-red-600">{name}</span>
        <p className="text-sm text-neutral-500">
          Will be deleted, this action cannot be undone.
        </p>

        {user.sub === username && (
          <div className="mt-4 text-xs text-neutral-400">
            You are deleting your own account,{" "}
            <span className="font-semibold">you will be disconnected.</span>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setCheckDeleteOpen(false)}
            className="flex items-center justify-center rounded-lg border border-neutral-400 px-2 py-1 font-semibold text-neutral-400 transition hover:bg-neutral-200 hover:underline"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleDeleteUser()}
            className="flex w-32 items-center justify-center rounded-lg bg-red-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-red-500 hover:underline"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
