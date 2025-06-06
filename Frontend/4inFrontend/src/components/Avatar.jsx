import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2, LogOut } from "lucide-react";
import useAuth from "../hooks/useAuth";

export function Avatar({ hiddenNav = false }) {
  const { user, logout, authError, setAuthError, authSuccess, setAuthSuccess } =
    useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex size-12 min-w-12 items-center justify-center rounded-full border border-neutral-50 bg-neutral-500 font-medium">
        {!user ? (
          <>
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin" size={18} />
            </span>
          </>
        ) : (
          <>{user?.sub[0].toUpperCase()}</>
        )}
      </div>
      {!hiddenNav && (
        <div className="flex flex-col">
          <div className="hidden md:flex">
            {!user ? (
              <>
                <div className="mb-1 flex h-4 w-20 animate-pulse rounded-lg bg-neutral-300"></div>
              </>
            ) : (
              <p className={`max-w-28 truncate text-base font-medium`}>
                {user.name}
              </p>
            )}
          </div>

          <div className="hidden md:flex">
            {!user ? (
              <>
                <div className="flex h-3 w-14 animate-pulse rounded-lg bg-neutral-300"></div>
              </>
            ) : (
              <span className="under text-xs font-thin">{user.sub}</span>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className="ms-2"
        disabled={isLoading}
        onClick={() => {
          setIsLoading(true);
          logout();
        }}
      >
        {isLoading && (
          <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-white/80">
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin text-neutral-800" size={32} />
            </span>
            <p className="text-neutral-700">You are being disconnected...</p>
          </div>
        )}
        <LogOut size={20} className="transition hover:opacity-70" />
      </button>
    </div>
  );
}
