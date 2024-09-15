import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./routes/ErrorPage";
import Products from "./routes/Products";
import NewItem from "./routes/NewItem";
import DeleteItem from "./routes/DeleteItem";
import SearchItem from "./routes/SearchItem";
import ItemEntry from "./routes/ItemEntry";
import ItemExit from "./routes/ItemExit";
import Categories from "./routes/Categories";
import NewCategory from "./routes/NewCategory";

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
        path: "products/new",
        element: <NewItem />,
      },
      {
        path: "products/delete",
        element: <DeleteItem />,
      },
      {
        path: "products/search",
        element: <SearchItem />,
      },
      {
        path: "products/entry",
        element: <ItemEntry />,
      },
      {
        path: "products/exit",
        element: <ItemExit />,
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
