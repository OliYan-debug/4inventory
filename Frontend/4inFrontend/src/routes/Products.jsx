import { ArrowDownUp } from "lucide-react";
import Item from "../components/Item";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Products() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/inventory")
      .then((response) => {
        setItems(response.items);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  // const items = [
  //   {
  //     id: 1,
  //     name: "Iphone",
  //     description: "asishisissasasasasasss",
  //     category: "Teste",
  //     quantity: 102,
  //     dateEntry: "15-08-2024",
  //   },
  //   {
  //     id: 2,
  //     name: "Iphone",
  //     description: "asishisissasasasasasss",
  //     category: "Teste",
  //     quantity: 102,
  //     dateEntry: "15-08-2024",
  //   },
  //   {
  //     id: 3,
  //     name: "Iphone",
  //     description: "asishisissasasasasasss",
  //     category: "Teste",
  //     quantity: 102,
  //     dateEntry: "15-08-2024",
  //   },
  // ]

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

      <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 p-4">
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
          items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              category={item.category}
              quantity={item.quantity}
              dateEntry={item.dateEntry}
            />
          ))
        )}
      </div>
    </div>
  );
}
