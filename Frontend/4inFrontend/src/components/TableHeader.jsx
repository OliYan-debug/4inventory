import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowUpNarrowWide,
} from "lucide-react";
import { useState } from "react";

export function TableHeader({ setSort, columnsDefault }) {
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

    let { orderBy, order } = newColumns[selectedIndex];
    let sort = `${orderBy},${order}`;

    setSort(sort);
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
          {column.isOrderable && (
            <>
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
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
