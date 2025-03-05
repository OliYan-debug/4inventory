import { useTranslation } from "react-i18next";
import logo from "../assets/logo.svg";
import { ButtonChooseLanguage } from "./ButtonChooseLanguage";

export function AppDescription() {
  const { t } = useTranslation("login");

  return (
    <div className="relative flex h-48 w-full flex-col items-center justify-center rounded-lg bg-neutral-800 md:h-full">
      <img src={logo} alt="4inventory" className="w-1/2" />
      <p className="text-neutral-50">{t("app_description")}</p>

      <div className="absolute bottom-10 flex w-full flex-col items-center">
        <ButtonChooseLanguage />
      </div>
    </div>
  );
}
