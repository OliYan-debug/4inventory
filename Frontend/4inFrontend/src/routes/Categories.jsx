import { ArrowDownUp, Rat } from "lucide-react";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import Category from "../components/Category";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  let count = 0;

  const handleButtonClick = (id) => {
    setActiveButton(id);
  };

  useEffect(() => {
    setLoading(true);
    api
      .get("/category/")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setUpdate(false);
    setLoading(false);
    handleButtonClick(null);
  }, [update]);

  const updateCategories = () => {
    setUpdate(true);
  };

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
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {categories.length <= 0 ? (
              <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                <Rat size={100} className="text-neutral-700" />
                <p className="font-medium text-neutral-600">
                  No categories found...
                </p>
                <Link
                  to={"/categories/new"}
                  className="flex rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                >
                  Try adding some
                </Link>
              </div>
            ) : (
              <>
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

                {categories.map((category) => {
                  count++;
                  return (
                    <Category
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      color={category.color}
                      updateCategories={updateCategories}
                      count={count}
                      activeButton={activeButton}
                      handleButtonClick={handleButtonClick}
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
