import "./index.css";
import { createRoot } from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Products from "./routes/Products";
import NewItem from "./routes/NewItem";
import DeleteItem from "./routes/DeleteItem";
import Search from "./routes/Search";
import Categories from "./routes/Categories";
import NewCategory from "./routes/NewCategory";
import CheckOut from "./routes/CheckOut";
import CheckIn from "./routes/CheckIn";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import UpdateItem from "./routes/UpdateItem";
import ProtectedRoute from "./services/ProtectedRoute";
import AuthProvider from "./contexts/AuthProvider";
import NotFound from "./routes/NotFound";
import Dashboard from "./routes/Dashboard";
import PageTitle from "./components/PageTitle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./routes/Logout";
import Users from "./routes/Users";
import Profile from "./routes/Profile";
import ItemView from "./routes/ItemView";
import "../i18n";
import { Suspense } from "react";
import { Loading } from "./components/Loading";
import { useTranslation } from "react-i18next";

export const App = () => {
  const { t } = useTranslation("routes");

  return (
    <BrowserRouter>
      <AuthProvider>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <Suspense fallback={<Loading />}>
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
                      <PageTitle
                        title={`4Inventory | ${t("products.delete")}`}
                      />
                      <DeleteItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="delete/:itemId"
                  element={
                    <ProtectedRoute roles={["ADMIN"]}>
                      <PageTitle
                        title={`4Inventory | ${t("products.delete")}`}
                      />
                      <DeleteItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update"
                  element={
                    <ProtectedRoute>
                      <PageTitle
                        title={`4Inventory | ${t("products.update")}`}
                      />
                      <UpdateItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="update/:itemId"
                  element={
                    <ProtectedRoute>
                      <PageTitle
                        title={`4Inventory | ${t("products.update")}`}
                      />
                      <UpdateItem />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="search"
                  element={
                    <ProtectedRoute>
                      <PageTitle
                        title={`4Inventory | ${t("products.search")}`}
                      />
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
                      <PageTitle
                        title={`4Inventory | ${t("categories.new")}`}
                      />
                      <NewCategory />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* User routes */}
              <Route
                path="/user"
                element={<Root />}
                errorElement={<ErrorPage />}
              >
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
                path="/admin/users"
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
            <ToastContainer />
          </Suspense>
        </CookiesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")).render(<App />);
