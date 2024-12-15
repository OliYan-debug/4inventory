import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["4inventory.token"]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = cookies["4inventory.token"];

    if (cookieToken) {
      api.defaults.headers["Authorization"] = `Bearer ${cookieToken}`;
    } else {
      removeCookie("4inventory.token");

      localStorage.removeItem("4inventory.user");
      localStorage.removeItem("4inventory.isAuthenticated");

      navigate("/");
    }
  }, [cookies]);

  const signup = async (data) => {
    await api
      .post("/auth/register", data)
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const login = async (data) => {
    await api
      .post("/auth/login", data)
      .then((response) => {
        const token = response.data.token;

        if (!token) {
          setError("Token undefined");
          return false;
        }

        setCookie("4inventory.token", token, {
          maxAge: 60 * 2, //2 hours
        });

        const decoded = jwtDecode(token);

        localStorage.setItem("4inventory.user", JSON.stringify(decoded));
        localStorage.setItem("4inventory.isAuthenticated", true);

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        navigate("/products");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const logout = async () => {
    try {
      removeCookie("4inventory.token");

      localStorage.removeItem("4inventory.user");
      localStorage.removeItem("4inventory.isAuthenticated");

      api.defaults.headers["Authorization"] = null;

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        error,
        setError,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
