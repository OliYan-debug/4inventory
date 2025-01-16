import { ShieldEllipsis } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "../services/api";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export function ModalUserPermission({
  username,
  name,
  permission,
  setCheckPermissionOpen,
  updateData,
}) {
  const { user } = useAuth();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (username === "admin") {
      return toast.error(
        "The user permission cannot be changed on the default administrator user!",
      );
    }

    data = {
      login: username,
      role: data.role,
    };

    try {
      const result = await toast.promise(api.post("/admin/change-role", data), {
        pending: "Updating user",
        success: {
          render() {
            return <p>User updated!</p>;
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                Error when updating:
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

      setCheckPermissionOpen(false);
      updateData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <div className="flex w-4/5 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[40vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-green-600/60">
          <ShieldEllipsis size={22} className="text-green-600" />
        </span>
        <h1 className="my-2 text-2xl font-bold text-neutral-800">
          Change User Permission?
        </h1>
        <span className="font-medium text-green-700">{name}</span>
        <p className="text-sm text-neutral-500">
          Currently, the user has{" "}
          <span className="font-medium">{permission}</span> permission.
        </p>

        <h2 className="mt-4 text-lg font-semibold text-neutral-800">
          Choose permission:
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
          <div className="my-2 flex items-center gap-1">
            <label className="font-medium text-neutral-700" htmlFor="admin">
              Admin
            </label>
            <input
              {...register("role")}
              defaultChecked={permission === "admin"}
              type="radio"
              id="admin"
              value="ADMIN"
            />
          </div>

          <div className="flex items-center gap-1">
            <label className="font-medium text-neutral-700" htmlFor="User">
              User
            </label>
            <input
              {...register("role")}
              defaultChecked={permission === "user"}
              type="radio"
              id="user"
              value="USER"
            />
          </div>
        </form>

        {user.sub === username && (
          <div className="text-xs text-neutral-400">
            You are choosing your own permission,{" "}
            <span className="font-semibold">you will be disconnected.</span>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setCheckPermissionOpen(false)}
            className="flex items-center justify-center rounded-lg border border-neutral-400 px-2 py-1 font-semibold text-neutral-400 transition hover:bg-neutral-200 hover:underline"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="flex w-32 items-center justify-center rounded-lg bg-green-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-green-500 hover:underline"
          >
            Yes, Save
          </button>
        </div>
      </div>
    </div>
  );
}
