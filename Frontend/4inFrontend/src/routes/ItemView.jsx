import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CalendarPlus,
  ChevronRight,
  CalendarClock,
  Rat,
  PackageOpen,
  Undo2,
  PackageMinus,
  PackagePlus,
  PencilIcon,
  PackageX,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import useAuth from "../hooks/useAuth";
import { ItemViewHistory } from "../components/ItemViewHistory";

export default function ItemView() {
  let { itemId } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.role === "ADMIN");
    }
  }, [user]);

  useEffect(() => {
    if (itemId) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const response = await toast.promise(
            api.get(`/inventory/${itemId}`),
            {
              pending: "Finding item",
              success: {
                render() {
                  return <p>Item found</p>;
                },
                toastId: itemId,
              },
              error: {
                render({ data }) {
                  if (
                    data.code === "ECONNABORTED" ||
                    data.code === "ERR_NETWORK"
                  ) {
                    return (
                      <p>
                        Error when finding, Try again.{" "}
                        <span className="text-xs opacity-80">
                          #timeout exceeded/network error.
                        </span>
                      </p>
                    );
                  }

                  if (data.code === "ERR_BAD_REQUEST") {
                    return <p>Item not found, please try another.</p>;
                  }

                  return <p>Error when finding. Try again.</p>;
                },
              },
            },
          );

          setItem(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);

          if (error.status === 403) {
            navigate("/logout");
          }
        }

        setLoading(false);
      };

      fetchData();
    }
  }, [itemId]);

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <Link to={`/products`} className="hover:font-semibold">
          Products
        </Link>
        <ChevronRight size={16} color="#737373" />
        <span className="font-semibold">Item</span>
      </p>
    );
  };

  const [accordionIsActive, setAccordionIsActive] = useState(false);
  const handleShowAccordion = () => {
    setAccordionIsActive(accordionIsActive ? false : true);
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"Item"} subtitle={Subtitle()} />

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {item.length <= 0 ? (
                <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <p className="font-medium text-neutral-600">
                    Item not found...
                  </p>

                  <Link
                    to={"/products"}
                    className="flex items-center gap-1 rounded-lg bg-neutral-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-neutral-500"
                  >
                    Back to products <Undo2 size={16} />
                  </Link>
                </div>
              ) : (
                <>
                  <div className="relative mb-6 flex flex-col items-center justify-center gap-1 md:flex-row">
                    <div className="flex items-center justify-center px-2">
                      <div className="flex w-80 flex-col gap-4 rounded-lg border border-neutral-200 bg-neutral-100 px-8 py-4 text-neutral-800">
                        <div className="relative">
                          <div className="">
                            <PackageOpen
                              size={32}
                              className="absolute -left-6 -top-2"
                            />
                          </div>
                          <span className="flex justify-end text-sm">
                            #{item.id}
                          </span>
                          <h1
                            className={`max-w-full truncate text-center font-semibold ${item.item.length >= 20 ? "text-2xl" : "text-3xl"}`}
                          >
                            {item.item}
                          </h1>
                        </div>

                        <div className="group/description relative flex items-center justify-center">
                          <p className="max-w-full break-words text-justify text-neutral-500">
                            {item.description ? (
                              <>
                                {item.description.length > 90
                                  ? `${item.description.substring(0, 100)}...`
                                  : item.description}
                              </>
                            ) : (
                              <div className="flex flex-col gap-1">
                                <div className="flex h-4 w-64 animate-pulse rounded-lg bg-neutral-300"></div>

                                <div className="flex h-4 w-64 animate-pulse rounded-lg bg-neutral-200"></div>

                                <div className="flex h-4 w-64 animate-pulse rounded-lg bg-neutral-300"></div>
                              </div>
                            )}
                          </p>

                          <div className="absolute top-10 z-10 hidden max-w-72 animate-fadeIn justify-center overflow-x-clip rounded-lg border border-neutral-500 bg-neutral-400 p-2 shadow-md group-hover/description:flex">
                            <span className="absolute -top-1 block size-2 -translate-y-px rotate-45 border-l border-t border-neutral-500 bg-neutral-400"></span>
                            <p className="text-justify text-xs text-neutral-50">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-1">
                          {item.category ? (
                            <>
                              {item.category.map((category) => {
                                return (
                                  <div
                                    key={category.id}
                                    style={{ backgroundColor: category.color }}
                                    className="rounded-md px-1 py-px text-sm"
                                  >
                                    <p className="max-w-32 truncate text-neutral-200 drop-shadow-sm">
                                      {category.name}
                                    </p>
                                  </div>
                                );
                              })}
                            </>
                          ) : (
                            <div className="flex gap-2">
                              <div className="flex h-4 w-20 animate-pulse rounded-lg bg-neutral-300"></div>

                              <div className="flex h-4 w-24 animate-pulse rounded-lg bg-neutral-200"></div>
                            </div>
                          )}
                        </div>

                        <div className="mt-2 flex justify-center gap-1">
                          <p className="font-semibold">Quantity:</p>
                          <span className="flex items-center">
                            {item.quantity ? (
                              item.quantity
                            ) : (
                              <div className="flex h-4 w-10 animate-pulse rounded-lg bg-neutral-300"></div>
                            )}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-col gap-1 border-t border-neutral-200 pt-2">
                          <div className="flex justify-center gap-1 text-xs text-neutral-500">
                            <p className="font-semibold">Created at:</p>
                            <span className="flex items-center gap-1">
                              {item.createdAt ? (
                                <>
                                  {item.createdAt[0]}/{item.createdAt[1]}/
                                  {item.createdAt[2]}
                                </>
                              ) : (
                                <div className="flex h-3 w-20 animate-pulse rounded-lg bg-neutral-300"></div>
                              )}
                              <CalendarPlus size={16} />
                            </span>
                          </div>

                          <div className="flex justify-center gap-1 text-xs text-neutral-500">
                            <p className="font-semibold">Last update:</p>
                            <span className="flex items-center gap-1">
                              {item.lastUpdate ? (
                                <>
                                  {item.lastUpdate[0]}/{item.lastUpdate[1]}/
                                  {item.lastUpdate[2]} - {item.lastUpdate[3]}:
                                  {item.lastUpdate[4]}:{item.lastUpdate[5]}
                                </>
                              ) : (
                                <div className="flex h-3 w-20 animate-pulse rounded-lg bg-neutral-200"></div>
                              )}
                              <CalendarClock size={16} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="right-48 top-0 rounded-lg">
                      <ul className="flex w-full flex-row gap-1 text-neutral-600 md:w-36 md:flex-col">
                        <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-neutral-200 transition hover:bg-neutral-300 hover:font-medium md:w-full md:px-4">
                          <Link
                            to={`/products/update/${item.id}`}
                            className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
                          >
                            <PencilIcon size={19} className="me-1" />
                            Edit Item
                          </Link>
                        </li>

                        <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-neutral-200 transition hover:bg-neutral-300 hover:font-medium md:w-full md:px-4">
                          <Link
                            to={`/products/checkin/${item.id}`}
                            className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
                          >
                            <PackagePlus size={19} className="me-1" />
                            Check-in
                          </Link>
                        </li>
                        <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-neutral-200 transition hover:bg-neutral-300 hover:font-medium md:w-full md:px-4">
                          <Link
                            to={`/products/checkout/${item.id}`}
                            className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
                          >
                            <PackageMinus size={19} className="me-1" />
                            Check-out
                          </Link>
                        </li>
                        {isAdmin && (
                          <li className="flex h-16 w-20 cursor-pointer items-center rounded-lg bg-red-200 text-red-600 transition hover:bg-red-300 hover:font-medium md:w-full md:px-4">
                            <Link
                              to={`/products/delete/${item.id}`}
                              className="flex w-full flex-col items-center text-xs md:flex-row md:text-base"
                            >
                              <PackageX size={19} className="me-1" />
                              Delete Item
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <button
                    className="flex w-full items-center justify-center gap-4 py-2 text-lg font-medium text-neutral-700"
                    onClick={() => handleShowAccordion()}
                  >
                    <span>Item History</span>
                    {accordionIsActive ? (
                      <ChevronUp size={22} />
                    ) : (
                      <ChevronDown size={22} />
                    )}
                  </button>
                  <div className={`${accordionIsActive ? "block" : "hidden"}`}>
                    {accordionIsActive && <ItemViewHistory itemId={itemId} />}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
