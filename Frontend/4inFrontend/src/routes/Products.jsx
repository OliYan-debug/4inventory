import { ArrowDownUp, Rat } from "lucide-react";
import Item from "../components/Item";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Link } from "react-router-dom";

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  let count = 0;

  useEffect(() => {
    setLoading(true);
    api
      .get("/inventory/")
      .then((response) => {
        setItems(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setLoading(false);
  }, []);

  const subtitle = () => {
    return (
      <p className="text-sm text-neutral-500">
        Found: <span className="font-bold">{items.length}</span>
      </p>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Products"} subtitle={subtitle()} />

      <div className="min-h-screen w-full overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:overflow-x-hidden">
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {items.length <= 0 ? (
              <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                <Rat size={100} className="text-neutral-700" />
                <p className="font-medium text-neutral-600">
                  No items found...
                </p>
                <Link
                  to={"/products/new"}
                  className="flex rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                >
                  Try adding some
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-2 grid min-w-[840px] grid-cols-7 grid-rows-1 justify-items-center">
                  <div className="col-auto flex items-center">
                    <p className="font-bold text-neutral-600">ID</p>
                    <ArrowDownUp size={16} color="#525252" className="ms-1" />
                  </div>

                  <div className="col-auto flex items-center">
                    <p className="font-bold text-neutral-600">Name</p>
                    <ArrowDownUp size={16} color="#525252" className="ms-1" />
                  </div>

                  <div className="col-span-2 flex items-center">
                    <p className="font-bold text-neutral-600">Description</p>
                    <ArrowDownUp size={16} color="#525252" className="ms-1" />
                  </div>

                  <div className="col-auto flex items-center">
                    <p className="font-bold text-neutral-600">Category</p>
                    <ArrowDownUp size={16} color="#525252" className="ms-1" />
                  </div>

                  <div className="col-auto flex items-center">
                    <p className="font-bold text-neutral-600">Quantity</p>
                    <ArrowDownUp size={16} color="#525252" className="ms-1" />
                  </div>

                  <div className="col-auto flex items-center">
                    <p className="font-bold text-neutral-600">Date of entry</p>
                    <ArrowDownUp size={16} color="#525252" className="ms-1" />
                  </div>
                </div>

                {items.map((item) => {
                  count++;
                  return (
                    <Item
                      key={item.id}
                      id={item.id}
                      item={item.item}
                      description={item.description}
                      category={item.category}
                      quantity={item.quantity}
                      created={item.created_at}
                      count={count}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
