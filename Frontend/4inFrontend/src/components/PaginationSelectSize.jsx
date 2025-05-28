import { useLocation, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

export function SelectSize({ size }) {
  const { t } = useTranslation("pagination");

  const [cookies, setCookie] = useCookies(["4inUserPaginationSize"]);
  const userSize = cookies["4inUserPaginationSize"];

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const path = location.pathname;

  const handleChangeSize = (e) => {
    let newSize = e.target.value;

    if (searchParams.has("size")) {
      searchParams.set("size", newSize);
      navigate(`${path}?${searchParams.toString()}`);
    } else {
      navigate(`${path}?${searchParams.toString()}&size=${newSize}`);
    }

    setCookie("4inUserPaginationSize", newSize, { path: "/" });
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
        defaultValue={size || userSize}
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
