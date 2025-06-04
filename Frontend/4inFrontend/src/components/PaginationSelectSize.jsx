import { useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export function SelectSize({ size }) {
  const { t } = useTranslation("pagination");

  const [cookies, setCookie] = useCookies(["4inUserSettings"]);
  let cookieSettings = null;

  if (cookies["4inUserSettings"]) {
    cookieSettings = JSON.parse(atob(cookies["4inUserSettings"]));
  }

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const path = location.pathname;

  const pathsCookieKey = {
    "/products": "productsSize",
    "/dashboard": "dashboardSize",
  };

  const currentPathKey = pathsCookieKey[path];

  const handleChangeSize = (e) => {
    let newSize = e.target.value;

    if (searchParams.has("page")) {
      searchParams.set("page", 0);
    }

    searchParams.set("size", newSize);
    navigate(`${path}?${searchParams.toString()}`);

    if (currentPathKey) {
      const baseSettings = cookieSettings ?? {};

      const newCookieValue = {
        ...baseSettings,
        [currentPathKey]: newSize,
      };

      const cookieValue = btoa(JSON.stringify(newCookieValue));

      setCookie("4inUserSettings", cookieValue, {
        path: "/",
        maxAge: 30 * 24 * 60 * 60, //30 days
      });
    }
  };

  return (
    <form
      onChange={(e) => {
        handleChangeSize(e);
      }}
      className="flex flex-row gap-1 text-sm text-neutral-700"
    >
      <label className="hidden sm:flex" htmlFor="size">
        {t("totalItems.showing")}
      </label>

      <select
        defaultValue={cookieSettings?.[currentPathKey] || size}
        id="size"
        className="rounded-lg border border-neutral-300 font-medium"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="100">100</option>
      </select>
    </form>
  );
}
