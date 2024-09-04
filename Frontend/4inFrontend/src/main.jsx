import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./routes/Root"
import ErrorPage from "./routes/ErrorPage"
import Products from "./routes/Products"
import NewItem from "./routes/NewItem"

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
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
