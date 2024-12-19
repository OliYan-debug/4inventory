import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["4inventory.token"]);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies["4inventory.token"];

    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      removeCookie("4inventory.token");

      localStorage.removeItem("4inventory.user");
      localStorage.removeItem("4inventory.isAuthenticated");

      navigate("/");
    }
  }, [cookies, removeCookie]);

  const signin = async (data) => {
    await api
      .post("/auth/register", data)
      .then((response) => {
        if (response.status === 200) {
          setAuthSuccess("User created successfully! Log in to continue.");
          navigate("/login");
        }
      })
      .catch((error) => {
        setAuthError(error);
      });
  };

  const login = async (data) => {
    await api
      .post("/auth/login", data)
      .then((response) => {
        const token = response.data.token;

        if (!token) {
          setAuthError("Token undefined.");
          return false;
        }

        setCookie("4inventory.token", token, {
          maxAge: 2 * 60 * 60, //2 hours
        });

        const decoded = jwtDecode(token);

        localStorage.setItem("4inventory.user", JSON.stringify(decoded));
        localStorage.setItem("4inventory.isAuthenticated", true);

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        setAuthSuccess(
          <p>
            Login successful! <br />
            Welcome, <span className="font-bold"> {decoded.sub}.</span>
          </p>,
        );
        navigate("/products");
      })
      .catch((error) => {
        setAuthError(error);
      });
  };

  const logout = async () => {
    try {
      await api
        .post("/auth/logout")
        .then((response) => {
          if (response.status === 200) {
            setAuthSuccess(
              <p>
                <span className="font-bold">You are logged out.</span>
                <br />
                To access again, please log in.
              </p>,
            );
          }
        })
        .catch((error) => {
          setAuthError(error);
        });

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
        authError,
        setAuthError,
        authSuccess,
        setAuthSuccess,
        signin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
