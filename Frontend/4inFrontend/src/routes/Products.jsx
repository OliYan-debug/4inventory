import { ArrowDownUp } from "lucide-react"
import Item from "../components/Item"
import Header from "../components/Header"

export default function Products() {
  const items = [
    {
      id: 1,
      name: "Iphone",
      description: "asishisissasasasasasss",
      category: "Teste",
      quantity: 102,
      dateEntry: "15-08-2024",
    },
    {
      id: 2,
      name: "Iphone",
      description: "asishisissasasasasasss",
      category: "Teste",
      quantity: 102,
      dateEntry: "15-08-2024",
    },
    {
      id: 3,
      name: "Iphone",
      description: "asishisissasasasasasss",
      category: "Teste",
      quantity: 102,
      dateEntry: "15-08-2024",
    },
  ]

  const subtitle = () => {
    return (
      <p className="text-sm text-neutral-500 mt-1">
        Found: <span className="font-bold">{items.length}</span>
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Products"} subtitle={subtitle()} />

      <div className="max-w-full min-h-screen p-4 bg-neutral-50 rounded-2xl">
        <div className="grid grid-cols-6 grid-rows-1 justify-items-center mb-2">
          <div className="col-auto flex items-center">
            <p className="text-neutral-600 font-bold">ID</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="text-neutral-600 font-bold">Name</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="text-neutral-600 font-bold">Description</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="text-neutral-600 font-bold">Category</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="text-neutral-600 font-bold">Quantity</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="text-neutral-600 font-bold">Date of entry</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>
        </div>

        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            category={item.category}
            quantity={item.quantity}
            dateEntry={item.dateEntry}
          />
        ))}
      </div>
    </div>
  )
}
