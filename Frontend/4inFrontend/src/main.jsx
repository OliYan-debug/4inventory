import "./index.css";
import "../i18n";
import "react-toastify/dist/ReactToastify.css";

import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

import AuthProvider from "./contexts/AuthProvider";

import ErrorPage from "./routes/ErrorPage";
import NotFound from "./routes/NotFound";
import Root from "./Root";
import PageTitle from "./services/PageTitle";
import ProtectedRoute from "./services/ProtectedRoute";

import CheckIn from "./routes/product/CheckIn";
import CheckOut from "./routes/product/CheckOut";
import DeleteItem from "./routes/product/DeleteItem";
import NewItem from "./routes/product/NewItem";
import Products from "./routes/product/Products";
import Search from "./routes/product/Search";
import UpdateItem from "./routes/product/UpdateItem";

import ItemView from "./routes/item/ItemView";

import Dashboard from "./routes/dashboard/Dashboard";

import Categories from "./routes/categories/Categories";
import NewCategory from "./routes/categories/NewCategory";

import Profile from "./routes/profile/Profile";
import Backup from "./routes/backup/Backup";

import Users from "./routes/users/Users";

import Login from "./routes/auth/Login";
import Logout from "./routes/auth/Logout";
import Signup from "./routes/auth/Signup";

export const App = () => {
  const { t } = useTranslation("routes");

  return (
    <BrowserRouter>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <AuthProvider>
          <Routes>
            {/* Products routes */}
            <Route
              path="/products"
              element={<Root />}
              errorElement={<ErrorPage />}
            >
              <Route
                path="/products"
                element={
                  <ProtectedRoute>
                    <PageTitle
                      title={`4Inventory | ${t("products.products")}`}
                    />
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/products/:page"
                element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("products.new")}`} />
                    <NewItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="delete"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <PageTitle title={`4Inventory | ${t("products.delete")}`} />
                    <DeleteItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="delete/:itemId"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <PageTitle title={`4Inventory | ${t("products.delete")}`} />
                    <DeleteItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("products.update")}`} />
                    <UpdateItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="update/:itemId"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("products.update")}`} />
                    <UpdateItem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="search"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("products.search")}`} />
                    <Search />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkin"
                element={
                  <ProtectedRoute>
                    <PageTitle
                      title={`4Inventory | ${t("products.checkin")}`}
                    />
                    <CheckIn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkin/:itemId"
                element={
                  <ProtectedRoute>
                    <PageTitle
                      title={`4Inventory | ${t("products.checkin")}`}
                    />
                    <CheckIn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkout"
                element={
                  <ProtectedRoute>
                    <PageTitle
                      title={`4Inventory | ${t("products.checkout")}`}
                    />
                    <CheckOut />
                  </ProtectedRoute>
                }
              />
              <Route
                path="checkout/:itemId"
                element={
                  <ProtectedRoute>
                    <PageTitle
                      title={`4Inventory | ${t("products.checkout")}`}
                    />
                    <CheckOut />
                  </ProtectedRoute>
                }
              />

              <Route
                path="item"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("products.item")}`} />
                    <ItemView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="item/:itemId"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("products.item")}`} />
                    <ItemView />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="/dashboard"
              element={<Root />}
              errorElement={<ErrorPage />}
            >
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("dashboard")}`} />
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/:page"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("dashboard")}`} />
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Categories routes */}
            <Route
              path="/categories"
              element={<Root />}
              errorElement={<ErrorPage />}
            >
              <Route
                path="/categories"
                element={
                  <ProtectedRoute>
                    <PageTitle
                      title={`4Inventory | ${t("categories.categories")}`}
                    />
                    <Categories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/categories/new"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("categories.new")}`} />
                    <NewCategory />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* User routes */}
            <Route path="/user" element={<Root />} errorElement={<ErrorPage />}>
              <Route
                path="/user"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("profile")}`} />
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/:page"
                element={
                  <ProtectedRoute>
                    <PageTitle title={`4Inventory | ${t("profile")}`} />
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Admin routes */}
            <Route
              path="/admin"
              element={<Root />}
              errorElement={<ErrorPage />}
            >
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <PageTitle title={`4Inventory | ${t("users")}`} />
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users/:page"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <PageTitle title={`4Inventory | ${t("users")}`} />
                    <Users />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/backup"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <PageTitle title={`4Inventory | Backup`} />
                    <Backup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/backup/:tab"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <PageTitle title={`4Inventory | Backup`} />
                    <Backup />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="/"
              element={
                <>
                  <PageTitle title="4Inventory" />
                  <Login />
                </>
              }
              errorElement={<ErrorPage />}
            />

            <Route
              path="/login"
              element={
                <>
                  <PageTitle title={`4Inventory | ${t("login")}`} />
                  <Login />
                </>
              }
              errorElement={<ErrorPage />}
            />
            <Route
              path="/signup"
              element={
                <>
                  <PageTitle title={`4Inventory | ${t("signup")}`} />
                  <Signup />
                </>
              }
              errorElement={<ErrorPage />}
            />

            <Route
              path="/logout"
              element={
                <>
                  <PageTitle title={`4Inventory | ${t("logout")}`} />
                  <Logout />
                </>
              }
              errorElement={<ErrorPage />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer draggable autoClose={2000} closeOnClick />
        </AuthProvider>
      </CookiesProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<App />);
