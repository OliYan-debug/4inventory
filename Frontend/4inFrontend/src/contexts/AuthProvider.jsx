import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { api } from "@/services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { t } = useTranslation("auth_provider");

  const [cookies, setCookie, removeCookie] = useCookies(["4inventory.token"]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  const token = cookies["4inventory.token"];

  useEffect(() => {
    if (token) {
      setTokenChecked(true);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      const fetchData = async () => {
        try {
          const response = await api.get("/user");

          if (response.status === 200) {
            const decoded = jwtDecode(token);
            setUser(decoded);
          }
        } catch (error) {
          console.error("Error checking token:", error);

          toast.error(() => {
            if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
              return (
                <p>
                  {t("token.generic")} <br />
                  <span className="text-xs opacity-80">
                    #timeout exceeded/network error.
                  </span>
                </p>
              );
            }

            if (error.code === "ERR_BAD_REQUEST") {
              return t("token.bad_request");
            }

            return t("token.generic");
          });

          if (error.status === 403) {
            navigate("/logout");
          }
        }
      };

      fetchData();
    } else {
      if (tokenChecked) {
        logout();
      }
    }
  }, [token]);

  const signup = async (data) => {
    await api
      .post("/auth/register", data)
      .then((response) => {
        if (response.status === 200) {
          toast.success(t("signup.success"));

          navigate("/login", { replace: true });
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          toast.error(
            <p>
              {t("signup.errors.bad_request")} <br />
              <span className="text-xs opacity-80">
                #timeout exceeded/network error.
              </span>
            </p>,
          );
        } else {
          if (error.response.data.message === "Username already exists") {
            toast.error(t("signup.errors.username_exists"));
          } else {
            toast.error(error.response.data.message);
          }
        }
      });
  };

  const login = async (data) => {
    await api
      .post("/auth/login", data)
      .then((response) => {
        const token = response.data.token;

        if (!token) {
          toast.error(t("login.errors.token_undefined"));
          setAuthError(true);
          return false;
        }

        setCookie("4inventory.token", token, {
          maxAge: 2 * 60 * 60, //2 hours
          path: "/",
        });

        const decoded = jwtDecode(token);
        setUser(decoded);
        setTokenChecked(true);

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        toast.success(
          <p>
            {t("login.success")}{" "}
            <span className="font-bold"> {decoded.sub}.</span>
          </p>,
        );

        navigate("/products", { replace: true });
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          toast.error(
            <p>
              {t("login.errors.bad_request")} <br />
              <span className="text-xs opacity-80">
                #timeout exceeded/network error.
              </span>
            </p>,
          );
        } else {
          if (error.response.data.message === "User or password invalid") {
            toast.error(t("login.errors.auth_error"));
          } else {
            toast.error(error.response.data.message);
          }
          setAuthError(true);
        }
      });
  };

  const logout = async () => {
    await api
      .post("/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          toast.info(t("logout"));
        }
      })
      .catch((error) => {
        if (error.status !== 403) {
          toast.error(
            <p>
              {t("logout")} <br />
              <span className="text-xs opacity-80">{error.message}</span>
            </p>,
          );
        }
      })
      .finally(() => {
        removeCookie("4inventory.token", { path: "/" });
        setUser(null);
        api.defaults.headers["Authorization"] = null;

        navigate("/");
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authError,
        setAuthError,
        authSuccess,
        setAuthSuccess,
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
