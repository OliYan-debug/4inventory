import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, roles }) => {
  const [cookies] = useCookies(["4inventory.token"]);
  const token = cookies["4inventory.token"];

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      <Navigate to="/login" />;
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      if (roles && !roles.includes(user.role)) {
        navigate("/products");
      }
    }
  }, [navigate, roles, user]);

  return children;
};

export default ProtectedRoute;
