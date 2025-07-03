import { Eraser, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function InputSearch({
  register,
  setFocus,
  onSubmit,
  setSearch,
  setFilteredRoutes,
  search,
  handleResetSearch,
}) {
  const { t } = useTranslation("search");

  useEffect(() => {
    setFocus("item");
  }, [setFocus, search]);

  const routes = [
    { id: 1, name_en: "Products", name_pt: "Produtos", path: "/products" },
    {
      id: 2,
      name_en: "New Product",
      name_pt: "Novo Produto",
      path: "/products/new",
    },
    {
      id: 3,
      name_en: "Delete Product",
      name_pt: "Excluir Produto",
      path: "/products/delete",
    },
    {
      id: 4,
      name_en: "Update Product",
      name_pt: "Atualizar Produto",
      path: "/products/update",
    },
    {
      id: 5,
      name_en: "Product CheckIn",
      name_pt: "Entrada",
      path: "/products/checkin",
    },
    {
      id: 6,
      name_en: "Product CheckOut",
      name_pt: "Saída",
      path: "/products/checkout",
    },
    { id: 7, name_en: "Dashboard", name_pt: "Painel", path: "/dashboard" },
    {
      id: 8,
      name_en: "Categories",
      name_pt: "Categorias",
      path: "/categories",
    },
    {
      id: 9,
      name_en: "New Category",
      name_pt: "Nova Categoria",
      path: "/categories/new",
    },
    { id: 10, name_en: "Profile", name_pt: "Perfil", path: "/user" },
    { id: 11, name_en: "Users", name_pt: "Usuários", path: "/admin/users" },
    { id: 12, name_en: "Logout", name_pt: "Sair", path: "/logout" },
  ];

  const searchRoutes = (value) => {
    if (value === "") {
      setFilteredRoutes([]);
      return;
    }

    const query = value.toLowerCase();

    const result = routes.filter(
      (route) =>
        route.name_en.toLowerCase().includes(query) ||
        route.name_pt.toLowerCase().includes(query),
    );

    setFilteredRoutes(result);
  };

  return (
    <>
      <label htmlFor="search">
        <SearchIcon size={20} className="mt-px text-neutral-600" />
      </label>

      <input
        {...register("item", {
          required: true,
        })}
        type="text"
        id="search"
        autoFocus
        autoComplete="off"
        placeholder={t("form.item_placeholder")}
        onKeyUp={(e) => {
          onSubmit(e.target.value);
          setSearch(e.target.value);
          searchRoutes(e.target.value);
        }}
        className="h-8 w-full bg-transparent pl-1 pr-11 text-neutral-500 outline-hidden"
      />

      {search !== "" && (
        <button
          type="button"
          className="absolute right-16 hover:opacity-50"
          onClick={() => handleResetSearch()}
        >
          <Eraser size={20} className="text-neutral-500" />
        </button>
      )}
    </>
  );
}
