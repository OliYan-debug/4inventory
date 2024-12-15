import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useParams } from "react-router";
import Header from "../components/Header";
import { Card } from "../components/Card";
import Pagination from "../components/Pagination";
import { api } from "../services/api";
import { useCookies } from "react-cookie";
import { History } from "../components/History";

export default function Dashboard() {
  let { page } = useParams();
  const [cookies] = useCookies();
  const [registers, setRegisters] = useState([]);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("id,asc");
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [response, setResponse] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    api
      .get("/registry/", {
        params: {
          page,
          size: cookies.paginationSize || 10,
          sort,
        },
      })
      .then((response) => {
        setRegisters(response.data.content);
        setTotalElements(response.data.totalElements);
        setTotalPages(response.data.totalPages);
        setPageNumber(response.data.pageable.pageNumber);
        setResponse(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cookies.paginationSize, page, size, sort]);

  useEffect(() => {
    api
      .get("/inventory/")
      .then((response) => {
        setTotalItems(response.data.totalElements);

        const initialValue = 0;

        const total = response.data.content.reduce(
          (accumulator, item) => accumulator + item.quantity,
          initialValue,
        );

        setTotalQuantity(total);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    api
      .get("/category/")
      .then((response) => {
        setTotalCategories(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Dashboard</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Products"} subtitle={subtitle()} />

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-row justify-center gap-6">
            <Card title="Products" total={totalItems} />
            <Card title="Categories" total={totalCategories} />
            <Card title="Quantity items" total={totalQuantity} />
          </div>

          <History registers={registers} setSort={setSort} />
        </div>

        {registers.length > 0 && (
          <Pagination
            totalElements={totalElements}
            totalPages={totalPages}
            pageNumber={pageNumber}
            numberOfElements={response.numberOfElements}
            first={response.first}
            last={response.last}
            setSize={setSize}
            path={"products/dashboard"}
          />
        )}
      </div>
    </div>
  );
}
