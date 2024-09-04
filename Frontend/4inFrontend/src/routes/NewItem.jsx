import { Link } from "react-router-dom"
import Header from "../components/Header"
import { ChevronRight } from "lucide-react"

export default function NewItem() {
  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500 mt-1">
        <Link to={`/products`} className="hover:font-semibold">
          Producs
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">New Item</span>
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Header title={"New Product"} subtitle={subtitle()} />

      <div className="max-w-full min-h-screen p-4 bg-neutral-50 rounded-2xl"></div>
    </div>
  )
}
