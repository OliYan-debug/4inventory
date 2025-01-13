import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlusCircle, Rat } from "lucide-react";
import { api } from "../services/api";
import { Header } from "../components/Header";
import { LoadingSkeleton } from "../components/LoadingSkeleton";
import { UsersHeader } from "../components/UsersHeader";
import { User } from "../components/User";

export default function Users() {
  let { page } = useParams();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("id,asc");
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  let count = 0;

  useEffect(() => {
    setLoading(true);
    api
      .get("/admin/users", {
        params: {
          page,
          size: 10,
          sort,
        },
      })
      .then((response) => {
        console.log(response);
        setUsers(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    setLoading(false);
  }, [page, sort, update]);

  const updateUsers = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const subtitle = () => {
    return (
      <p className="text-sm text-neutral-500">
        Found: <span className="font-bold">{users.length}</span>
      </p>
    );
  };
  return (
    <div className="flex flex-col gap-4">
      <Header title={"Products"} subtitle={subtitle()}>
        <Link
          to={"/products/new"}
          className="flex items-center gap-1 rounded-lg border border-emerald-500 px-2 py-1 text-sm font-medium text-emerald-500 transition hover:bg-emerald-500 hover:text-neutral-50"
        >
          New <PlusCircle size={16} />
        </Link>
      </Header>

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 py-4 md:mb-0 md:overflow-x-hidden">
        <div>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {users.length <= 0 ? (
                <div className="mt-10 flex animate-fadeIn flex-col items-center gap-2">
                  <Rat size={100} className="text-neutral-700" />
                  <p className="font-medium text-neutral-600">
                    No users found...
                  </p>
                </div>
              ) : (
                <>
                  <UsersHeader setSort={setSort} />

                  {users.map((user) => {
                    count++;
                    return (
                      <User
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        permission={user.permission}
                        count={count}
                        updateUsers={updateUsers}
                      />
                    );
                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
