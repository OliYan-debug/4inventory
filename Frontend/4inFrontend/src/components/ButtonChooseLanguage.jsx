import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";

export function ButtonChooseLanguage() {
  const { t, i18n } = useTranslation("button_choose_language");
  const currentLanguage = i18n.language;

  const [showPopover, setShowPopover] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const ref = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  function handleShowPopover() {
    !showLanguages && setShowPopover(!showPopover);
  }

  function handleShowLanguages() {
    setShowPopover(false);
    setShowLanguages(!showLanguages);
  }

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowLanguages(false);
    }
  };

  return (
    <div className="animate-fade-in h-full w-full">
      <button
        type="button"
        className="flex h-full w-full cursor-pointer items-center justify-center hover:opacity-60"
        onClick={() => {
          handleShowLanguages();
        }}
        onMouseEnter={() => {
          handleShowPopover();
        }}
        onMouseLeave={() => {
          setShowPopover(false);
        }}
      >
        <Languages
          data-active={showLanguages}
          className="size-5 text-neutral-50 transition data-[active=true]:opacity-60"
        />
      </button>

      <div className="relative flex justify-center">
        {showPopover && (
          <div className="animate-fade-in absolute z-50 mt-1.5 hidden justify-center md:flex">
            <div className="absolute -top-1 block size-2 rotate-45 bg-neutral-500" />

            <span className="w-28 rounded-lg bg-neutral-500 py-px text-center text-xs text-neutral-50">
              {t("change")}
            </span>
          </div>
        )}

        {showLanguages && (
          <div
            ref={ref}
            className="animate-fade-in absolute z-10 mt-1.5 flex justify-center"
          >
            <div className="absolute -top-1 block size-2 rotate-45 bg-neutral-500" />

            <ul className="flex w-24 flex-col items-center gap-2 rounded-lg bg-neutral-500 p-2 text-sm">
              <li
                data-active={currentLanguage === "en-US"}
                onClick={() => {
                  i18n.changeLanguage("en-US");
                  setShowLanguages(false);
                }}
                className="w-full cursor-pointer text-center leading-none text-neutral-50 transition hover:underline data-[active=true]:font-semibold data-[active=true]:underline"
              >
                {t("en_us")}
              </li>

              <li
                data-active={currentLanguage === "pt-BR"}
                onClick={() => {
                  i18n.changeLanguage("pt-BR");
                  setShowLanguages(false);
                }}
                className="w-full cursor-pointer text-center leading-none text-neutral-50 transition hover:underline data-[active=true]:font-semibold data-[active=true]:underline"
              >
                {t("pt_br")}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
