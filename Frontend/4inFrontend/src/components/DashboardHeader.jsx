import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";
import { useState } from "react";

export function DashboardHeader({ setSort }) {
  const columnsDefault = [
    { label: "ID", sorting: true, order: "asc" },
    { label: "Item ID", sorting: false, order: "desc" },
    { label: "Type", sorting: false, order: "desc" },
    { label: "Justification", sorting: false, order: "desc" },
    { label: "Author", sorting: false, order: "desc" },
    { label: "Date", sorting: false, order: "desc" },
  ];

  const [columns, setColumns] = useState(columnsDefault);

  const handleSort = (selectedIndex) => {
    const newColumns = [...columns];

    newColumns.forEach((element, index) => {
      if (index === selectedIndex) {
        newColumns[index].sorting = element.sorting ? "false" : "true";
        newColumns[index].order = element.order === "asc" ? "desc" : "asc";
      } else {
        newColumns[index].sorting = false;
        newColumns[index].order = "desc";
      }
    });

    setColumns(newColumns);

    let { label, order } = newColumns[selectedIndex];

    label = label === "Type" ? "Label" : label;
    label = label === "Item ID" ? "itemId" : label;

    let sort = `${label.toLocaleLowerCase()},${order}`;

    setSort(sort);
  };

  return (
    <ul className="mb-2 grid min-w-[840px] grid-cols-7 grid-rows-1 justify-items-center">
      {columns.map((column, index) => (
        <li
          onClick={() => handleSort(index)}
          key={index}
          className={`col-auto flex cursor-pointer items-center text-neutral-600 transition hover:text-sky-400 ${column.label === "Justification" && "col-span-2"}`}
        >
          <p className={`${column.sorting ? "font-bold" : "font-semibold"}`}>
            {column.label}
          </p>
          {column.sorting ? (
            <>
              {column.order === "asc" ? (
                <ArrowDownNarrowWide size={16} className="ms-1" />
              ) : (
                <ArrowUpNarrowWide size={16} className="ms-1" />
              )}
            </>
          ) : (
            <ArrowDownUp size={16} className="ms-1" />
          )}
        </li>
      ))}
    </ul>
  );
}
