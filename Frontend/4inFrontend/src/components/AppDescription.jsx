import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg";
import { ButtonChooseLanguage } from "./ButtonChooseLanguage";

export function AppDescription() {
  const { t } = useTranslation("login");

  return (
    <div className="relative flex min-h-44 w-full flex-col items-center justify-center rounded-lg bg-neutral-800 md:min-h-96">
      <img src={logo} alt="4inventory" className="w-1/2" />

      <p className="text-sm text-neutral-50 md:text-base">
        {t("app_description")}
      </p>

      <div className="absolute bottom-6 flex h-8 w-16 flex-col items-center md:bottom-10">
        <ButtonChooseLanguage />
      </div>
    </div>
  );
}
