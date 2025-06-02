import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router";

export function TableHeader({ columnsDefault }) {
  const [columns, setColumns] = useState(columnsDefault);
  const [newSort, setNewSort] = useState(null);

  const [cookies, setCookie] = useCookies(["4inUserSettings"]);
  let cookieSettings = null;

  if (cookies["4inUserSettings"]) {
    cookieSettings = JSON.parse(atob(cookies["4inUserSettings"]));
  }

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const path = location.pathname;

  const currentPath = path === "/products" ? "productsSort" : "dashboardSort";

  useEffect(() => {
    if (cookieSettings?.[currentPath]) {
      let cookieSort = cookieSettings?.[currentPath];

      const cookieSortSplit = cookieSort.split(",");
      let cookieSortOrderBy = cookieSortSplit[0];
      let cookieSortOrder = cookieSortSplit[1];

      let cookieSortIndex = columnsDefault.findIndex(
        (element) => element.orderBy === cookieSortOrderBy,
      );

      setColumns((prevColumns) => {
        return prevColumns.map((column, index) => {
          if (index === cookieSortIndex) {
            return {
              ...column,
              order: cookieSortOrder,
              sorting: true,
            };
          } else {
            return {
              ...column,
              order: "neutral",
              sorting: false,
            };
          }
        });
      });
    }
  }, []);

  const handleSort = (selectedIndex) => {
    setColumns((prevColumns) => {
      return prevColumns.map((column, index) => {
        if (index === selectedIndex) {
          let newOrder;

          newOrder = column.order === "asc" ? "desc" : "asc";

          let newSort = `${column.orderBy}-${newOrder}`;

          setNewSort(newSort);

          return {
            ...column,
            order: newOrder,
            sorting: newOrder !== "neutral",
          };
        } else {
          return {
            ...column,
            order: "neutral",
            sorting: false,
          };
        }
      });
    });
  };

  useEffect(() => {
    if (newSort) {
      searchParams.set("sort", newSort);
      navigate(`${path}?${searchParams.toString()}`);

      const baseSettings = cookieSettings ?? {};

      const newCookieValue = {
        ...baseSettings,
        [currentPath]: newSort.replace("-", ","),
      };

      const cookieValue = btoa(JSON.stringify(newCookieValue));

      setCookie("4inUserSettings", cookieValue, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, //30 dias
      });
    }
  }, [newSort]);

  const getSortIcon = (order) => {
    switch (order) {
      case "asc":
        return <ArrowDownNarrowWide size={16} className="ms-1" />;
      case "desc":
        return <ArrowUpNarrowWide size={16} className="ms-1" />;
      default:
        return "";
    }
  };

  const numberOfColumns = columnsDefault.reduce((accumulator, column) => {
    if (column.extendedColumn === true) {
      accumulator += 1;
    }
    return accumulator;
  }, 0);

  return (
    <ul
      style={{
        gridTemplateColumns: `repeat(${columns.length + numberOfColumns}, minmax(0, 1fr)`,
      }}
      className="mb-2 grid min-w-[840px] grid-rows-1 justify-items-center"
    >
      {columns.map((column, index) => (
        <li
          onClick={() => handleSort(index)}
          key={index}
          className={`col-auto flex items-center text-neutral-600 transition ${!column.isOrderable ? "pointer-events-none" : "cursor-pointer hover:text-sky-400"} ${column.extendedColumn && "col-span-2"}`}
        >
          <p className={`${column.sorting ? "font-bold" : "font-semibold"}`}>
            {column.label}
          </p>
          {column.isOrderable && getSortIcon(column.order)}
        </li>
      ))}
    </ul>
  );
}
