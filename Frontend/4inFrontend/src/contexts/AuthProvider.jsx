import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = cookies["4inventory.token"];
    const sessionToken = sessionStorage.getItem("4inventory.token");

    if (cookieToken === sessionToken) {
      api.defaults.headers["Authorization"] = `Bearer ${cookieToken}`;

      const decoded = jwtDecode(cookieToken);
      setUser(decoded);

      setIsAuthenticated(true);
    } else {
      removeCookie("4inventory.token");
      sessionStorage.removeItem("4inventory.token");
      sessionStorage.removeItem("4inventory.user");
      sessionStorage.removeItem("4inventory.isAuthenticated");
      navigate("/");
    }
  }, []);

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
          maxAge: 60 * 60 * 24 * 7, //7 days
        });

        sessionStorage.setItem("4inventory.token", token);

        const decoded = jwtDecode(token);

        setUser(decoded);
        setIsAuthenticated(true);
        sessionStorage.setItem("4inventory.user", JSON.stringify(decoded));
        sessionStorage.setItem("4inventory.isAuthenticated", true);

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
      sessionStorage.removeItem("4inventory.token");
      sessionStorage.removeItem("4inventory.user");
      sessionStorage.removeItem("4inventory.isAuthenticated");

      api.defaults.headers["Authorization"] = null;

      setUser(null);
      setIsAuthenticated(false);

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
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
