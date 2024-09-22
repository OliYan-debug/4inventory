import { ArrowDownUp } from "lucide-react";
import Item from "../components/Item";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Products() {
  const [items, setItems] = useState([]);
  let count = 0;

  useEffect(() => {
    api
      .get("/inventory/")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const subtitle = () => {
    return (
      <p className="mt-1 text-sm text-neutral-500">
        Found: <span className="font-bold">{items.length}</span>
      </p>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Products"} subtitle={subtitle()} />

      <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 py-4">
        <div className="mb-2 grid grid-cols-6 grid-rows-1 justify-items-center">
          <div className="col-auto flex items-center">
            <p className="font-bold text-neutral-600">ID</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="font-bold text-neutral-600">Name</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
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

        {items.length <= 0 ? (
          <>
            <p className="text-center">No items found</p>
          </>
        ) : (
          items.map((item) => {
            count++;
            console.log(item);
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
          })
        )}
      </div>
    </div>
  );
}
