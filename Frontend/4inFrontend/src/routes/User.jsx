import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { Profile } from "../components/Profile";
import { UpdateName } from "../components/UpdateName";
import { UpdatePassword } from "../components/UpdatePassword";
import { useParams } from "react-router";

export default function User() {
  let { page } = useParams();
  const [user, setUser] = useState([]);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    setChangePassword(page === "password");
  }, [page]);

  useEffect(() => {
    api
      .get("/user/profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <span className="font-semibold">{user.name}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={"My profile"} subtitle={subtitle()} />

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 px-4 py-4 md:mb-0 md:overflow-x-hidden md:px-20">
        <Profile user={user}>
          {changePassword ? (
            <UpdatePassword username={user.username} />
          ) : (
            <UpdateName user={user} />
          )}
        </Profile>
      </div>
    </div>
  );
}
