import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children, roles }) => {
  const [cookies] = useCookies(["4inventory.token"]);
  const token = cookies["4inventory.token"];

  const { user } = useAuth();

  useEffect(() => {
    if (user && roles && !roles.includes(user.role)) {
      toast.warn(
        <p>
          You are <span className="font-bold"> not authorized</span> to access
          this page!
        </p>,
      );
    }
  }, [user, roles]);

  if (!user && !token) {
    return <Navigate to="/" replace />;
  }

  if (user && roles && !roles.includes(user.role)) {
    return <Navigate to="/products" />;
  }

  return children;
};

export default ProtectedRoute;
