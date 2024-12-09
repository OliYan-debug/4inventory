import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Products from "./routes/Products";
import NewItem from "./routes/NewItem";
import DeleteItem from "./routes/DeleteItem";
import SearchItem from "./routes/Search";
import Categories from "./routes/Categories";
import NewCategory from "./routes/NewCategory";
import CheckOut from "./routes/CheckOut";
import CheckIn from "./routes/CheckIn";
import Login from "./routes/Login";
import Signin from "./routes/Signin";
import UpdateItem from "./routes/UpdateItem";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./contexts/AuthProvider";
import NotFound from "./routes/NotFound";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/products" element={<Root />} errorElement={<ErrorPage />}>
          <Route
            path="/products"
            element={
              <ProtectedRoute>
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
                <NewItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="delete"
            element={
              <ProtectedRoute>
                <DeleteItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="delete/:itemId"
            element={
              <ProtectedRoute>
                <DeleteItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="update"
            element={
              <ProtectedRoute>
                <UpdateItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="update/:itemId"
            element={
              <ProtectedRoute>
                <UpdateItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute>
                <SearchItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkin"
            element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkin/:itemId"
            element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="checkout/:itemId"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/new"
            element={
              <ProtectedRoute>
                <NewCategory />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
        <Route path="/login" element={<Login />} errorElement={<ErrorPage />} />
        <Route
          path="/signin"
          element={<Signin />}
          errorElement={<ErrorPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

createRoot(document.getElementById("root")).render(<App />);
