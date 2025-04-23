import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { api } from "../services/api";
import { UserDetails } from "../components/UserDetails";
import { UpdateName } from "../components/UpdateName";
import { UpdatePassword } from "../components/UpdatePassword";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation("profile");

  let { page } = useParams();
  const [user, setUser] = useState([]);
  const [update, setUpdate] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    setChangePassword(page === "password");
  }, [page]);

  useEffect(() => {
    api
      .get("/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [update]);

  const updateUser = () => {
    update ? setUpdate(false) : setUpdate(true);
  };

  const Subtitle = () => {
    return (
      <p className="flex items-center text-sm text-neutral-500">
        <span className="font-semibold">{user.name}</span>
      </p>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      <div className="mb-10 flex min-h-screen w-full flex-col justify-between overflow-x-scroll rounded-2xl bg-neutral-50 px-4 py-4 md:mb-0 md:overflow-x-hidden md:px-20">
        <UserDetails user={user}>
          {changePassword ? (
            <UpdatePassword username={user.username} />
          ) : (
            <UpdateName user={user} updateUser={updateUser} />
          )}
        </UserDetails>
      </div>
    </div>
  );
}
