import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Rat } from "lucide-react";
import { useTranslation } from "react-i18next";

export function LogoutButton({ children }) {
  const { t } = useTranslation("logout_button");

  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div
        className="w-full cursor-pointer data-[disabled=true]:pointer-events-none"
        data-disabled={isLoading}
        title={t("buttonTitle")}
        onClick={() => {
          setIsLoading(true);
          logout();
        }}
      >
        {children}
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-white/80">
          <span className="flex items-center justify-center">
            <Rat className="size-10 animate-bounce text-neutral-800" />
          </span>

          <span className="text-neutral-700">{t("loadingSpan")}</span>
        </div>
      )}
    </>
  );
}
