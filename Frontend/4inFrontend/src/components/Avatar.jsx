import { LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function Avatar({ hiddenNav = false }) {
  const { logout, authError, setAuthError, authSuccess, setAuthSuccess } =
    useAuth();
  const user = JSON.parse(localStorage.getItem("4inventory.user"));

  useEffect(() => {
    if (authSuccess) {
      toast.info(authSuccess);
    }
    setAuthSuccess(null);
  }, [authSuccess]);

  useEffect(() => {
    if (authError) {
      toast.error(authError.message);
    }
    setAuthError(null);
  }, [authError]);

  return (
    <div
      className={`mt-4 hidden w-3/4 items-center justify-center gap-2 border-t pt-2 md:flex ${hiddenNav ? "flex-col" : "flex-row"}`}
    >
      <div className="flex size-12 items-center justify-center rounded-full border border-neutral-50 bg-neutral-500 font-medium">
        {user?.sub[0].toUpperCase()}
      </div>
      {!hiddenNav && (
        <span className="hidden font-thin md:flex">{user?.sub}</span>
      )}

      <button
        type="button"
        onClick={() => {
          logout();
        }}
      >
        <LogOut size={20} className="transition hover:opacity-70" />
      </button>
    </div>
  );
}
