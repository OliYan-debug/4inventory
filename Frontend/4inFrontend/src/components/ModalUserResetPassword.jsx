import { LockOpen } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

export function ModalUserResetPassword({ username, name, setCheckResetOpen }) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const data = {
      username,
    };

    try {
      const result = await toast.promise(
        api.post("/admin/reset-password", data),
        {
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
                  <span className="font-bold">
                    {data.response.data.message}
                  </span>
                  . Try again.
                </p>
              );
            },
          },
        },
      );

      if (result.status === 200 && user.sub === username) {
        return navigate("/logout");
      }

      setCheckResetOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <div className="flex w-4/5 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[40vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-blue-600/60">
          <LockOpen size={22} className="text-blue-600" />
        </span>
        <h1 className="my-2 text-2xl font-bold text-neutral-800">
          Reset User Password?
        </h1>
        <span className="font-medium text-blue-700">{name}</span>
        <p className="text-sm text-neutral-500">
          On reset, the user password will be their{" "}
          <span className="font-medium">username</span> in capital letters.
        </p>

        {user.sub === username && (
          <div className="mt-4 text-xs text-neutral-400">
            You are choosing your own password,{" "}
            <span className="font-semibold">you will be disconnected.</span>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setCheckResetOpen(false)}
            className="flex items-center justify-center rounded-lg border border-neutral-400 px-2 py-1 font-semibold text-neutral-400 transition hover:bg-neutral-200 hover:underline"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleResetPassword()}
            className="flex w-32 items-center justify-center rounded-lg bg-blue-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-blue-500 hover:underline"
          >
            Yes, Reset
          </button>
        </div>
      </div>
    </div>
  );
}
