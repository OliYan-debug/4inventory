import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export default function Logout() {
  const { logout, authError, setAuthError, authSuccess, setAuthSuccess } =
    useAuth();

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

  useEffect(() => {
    logout();
  }, []);

  return;
}
