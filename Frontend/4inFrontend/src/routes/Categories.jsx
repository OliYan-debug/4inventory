import { ArrowDownUp } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Category from "../components/Category";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const subtitle = () => {
    return (
      <p className="mt-1 text-sm text-neutral-500">
        Found: <span className="font-bold">{categories.length}</span>
      </p>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Categories"} subtitle={subtitle()} />

      <div className="min-h-screen max-w-full rounded-2xl bg-neutral-50 py-4">
        <div className="mb-2 grid grid-cols-4 grid-rows-1 justify-items-center">
          <div className="col-auto flex items-center">
            <p className="font-bold text-neutral-600">ID</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="font-bold text-neutral-600">Name</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="font-bold text-neutral-600">Color</p>
            <ArrowDownUp size={16} color="#525252" className="ms-1" />
          </div>

          <div className="col-auto flex items-center">
            <p className="font-bold text-neutral-600">Action</p>
          </div>
        </div>

        {categories.length <= 0 ? (
          <>
            <p className="text-center">No categories found</p>
          </>
        ) : (
          categories.map((category) => (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              color={category.color}
            />
          ))
        )}
      </div>
    </div>
  );
}
