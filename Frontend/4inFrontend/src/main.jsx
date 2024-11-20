import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:page",
        element: <Products />,
      },
      {
        path: "products/new",
        element: <NewItem />,
      },
      {
        path: "products/delete",
        element: <DeleteItem />,
      },
      {
        path: "products/delete/:itemId",
        element: <DeleteItem />,
      },
      {
        path: "products/search",
        element: <SearchItem />,
      },
      {
        path: "products/checkin",
        element: <CheckIn />,
      },
      {
        path: "products/checkin/:itemId",
        element: <CheckIn />,
      },
      {
        path: "products/checkout",
        element: <CheckOut />,
      },
      {
        path: "products/checkout/:itemId",
        element: <CheckOut />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/new",
        element: <NewCategory />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
