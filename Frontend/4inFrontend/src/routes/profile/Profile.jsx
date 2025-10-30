import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { Suspense, useEffect, useState } from "react";

import { api } from "@/services/api";
import { UserDetails } from "./components/UserDetails";
import { Header } from "@/components/header/Header";
import { UpdatePassword } from "./components/UpdatePassword";
import { UpdateName } from "./components/UpdateName";
import { UserDetailsSkeleton } from "./components/UserDetailsSkeleton";

export default function Profile() {
  const { t } = useTranslation("profile");

  let { page } = useParams();
  const [user, setUser] = useState(undefined);
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
        <span className="font-semibold">{user?.name}</span>
      </p>
    );
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Header title={t("title")} subtitle={Subtitle()} />

      <div className="mb-10 flex min-h-screen w-full flex-col items-center rounded-2xl bg-neutral-50 px-4 py-4 md:mb-0 md:px-0">
        <Suspense fallback={<UserDetailsSkeleton />}>
          {!user ? (
            <UserDetailsSkeleton />
          ) : (
            <UserDetails user={user}>
              {changePassword ? (
                <UpdatePassword username={user.username} />
              ) : (
                <UpdateName user={user} updateUser={updateUser} />
              )}
            </UserDetails>
          )}
        </Suspense>
      </div>
    </div>
  );
}
