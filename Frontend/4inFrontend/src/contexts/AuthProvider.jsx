import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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
                  Error when checking token, Try again.{" "}
                  <span className="text-xs opacity-80">
                    #timeout exceeded/network error.
                  </span>
                </p>
              );
            }

            if (error.code === "ERR_BAD_REQUEST") {
              return <p>Error when checking token, please log in again.</p>;
            }

            return <p> Error when checking token. Try again.</p>;
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
          toast.success("User created successfully! Log in to continue.");

          navigate("/login", { replace: true });
        }
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          toast.error(
            <p>
              The information could not be validated, try again. <br />
              <span className="text-xs opacity-80">
                #timeout exceeded/network error.
              </span>
            </p>,
          );
        } else {
          toast.error(error.response.data.message);
        }
      });
  };

  const login = async (data) => {
    await api
      .post("/auth/login", data)
      .then((response) => {
        const token = response.data.token;

        if (!token) {
          toast.error("Token undefined.");
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
            Login successful! <br />
            Welcome, <span className="font-bold"> {decoded.sub}.</span>
          </p>,
        );

        navigate("/products", { replace: true });
      })
      .catch((error) => {
        if (error.code === "ECONNABORTED" || error.code === "ERR_NETWORK") {
          toast.error(
            <p>
              The information could not be validated, try again. <br />
              <span className="text-xs opacity-80">
                #timeout exceeded/network error.
              </span>
            </p>,
          );
        } else {
          toast.error(error.response.data.message);
          setAuthError(true);
        }
      });
  };

  const logout = async () => {
    await api
      .post("/auth/logout")
      .then((response) => {
        if (response.status === 200) {
          toast.info(
            <p>
              You are
              <span className="font-bold"> logged out.</span>
            </p>,
          );
        }
      })
      .catch((error) => {
        if (error.status !== 403) {
          toast.error(
            <p>
              You are
              <span className="font-bold"> logged out.</span> <br />
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
