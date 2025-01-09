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

  const token = cookies["4inventory.token"];
  const [authToken, setAuthToken] = useState(token);

  useEffect(() => {
    if (token !== authToken) {
      toast.error("Invalid Token, please log in again. #1");

      logout();
    } else {
      if (token) {
        let user = jwtDecode(token);
        setUser(user);

        api.defaults.headers["Authorization"] = `Bearer ${token}`;
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
        console.log(error);
        toast.error(error.response.data.message);
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
        });

        const decoded = jwtDecode(token);
        setUser(decoded);

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        toast.success(
          <p>
            Login successful! <br />
            Welcome, <span className="font-bold"> {decoded.sub}.</span>
          </p>,
        );

        setAuthToken(token);
        navigate("/products", { replace: true });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setAuthError(true);
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
        if (error.status === 403) {
          return toast.info(
            <p>
              You are
              <span className="font-bold"> logged out.</span>
            </p>,
          );
        }
        toast.error(error.message);
      });

    removeCookie("4inventory.token");
    setAuthToken(undefined);
    setUser(null);
    api.defaults.headers["Authorization"] = null;

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setAuthToken,
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
