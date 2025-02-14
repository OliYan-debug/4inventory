import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import logo from "../assets/logo.svg";
import { InputConfirmPassword } from "../components/InputConfirmPassword";
import { InputCreatePassword } from "../components/InputCreatePassword";
import { InputCreateUserName } from "../components/InputCreateUsername";
import useAuth from "../hooks/useAuth";
import { InputName } from "../components/InputName";
import { useTranslation } from "react-i18next";

export default function Signup() {
  const { t } = useTranslation("signup");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const [invalidPassword, setInvalidPassword] = useState(true);
  const { signup } = useAuth();

  const onSubmit = async (data) => {
    const newData = {
      name: data.name,
      login: data.username,
      password: data.createPassword,
      role: "USER", //default role
    };

    await signup(newData);
  };

  return (
    <div className="m-0 w-screen bg-neutral-300 p-4 md:h-screen">
      <div className="flex h-auto w-full flex-col-reverse gap-4 rounded-lg bg-neutral-50 p-10 md:grid md:h-full md:grid-cols-2 md:content-center md:gap-0">
        <div className="h-full w-full px-0 md:px-28">
          <div>
            <h1 className="w-full text-3xl font-bold text-neutral-800">
              {t("title")}
            </h1>
            <h3 className="w-full text-xl font-medium text-neutral-800">
              {t("subtitle")}
            </h3>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 flex flex-col gap-8"
          >
            <InputName
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              isActive={true}
            />

            <InputCreateUserName
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />

            <InputCreatePassword
              register={register}
              errors={errors}
              setInvalidPassword={setInvalidPassword}
              isSubmitting={isSubmitting}
            />

            <InputConfirmPassword
              register={register}
              getValues={getValues}
              errors={errors}
              invalidPassword={invalidPassword}
              isSubmitting={isSubmitting}
            />

            <div className="flex w-full flex-col items-center">
              <button
                type="submit"
                className="h-10 w-full rounded-full bg-neutral-800 font-medium text-neutral-50 transition hover:underline hover:opacity-90 disabled:cursor-progress disabled:opacity-80 disabled:hover:no-underline disabled:hover:opacity-80"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <Loader2
                      className="animate-spin"
                      color="#ffffff"
                      size={18}
                    />
                  </span>
                ) : (
                  <span>{t("signup")}</span>
                )}
              </button>

              <div className="relative mt-8 flex w-1/2 flex-col items-center">
                <span className="w-full border-t border-neutral-400"></span>
                <p className="absolute -top-3 bg-neutral-50 px-1 text-neutral-500">
                  {t("or")}
                </p>
              </div>
              <Link
                to={"/login"}
                className="mt-4 font-bold text-neutral-600 underline hover:text-neutral-700"
              >
                {t("login")}
              </Link>
            </div>
          </form>
        </div>

        <div className="flex h-48 w-full flex-col items-center justify-center rounded-lg bg-neutral-800 md:h-full">
          <img src={logo} alt="4inventory" className="w-1/2" />
          <p className="text-neutral-50">{t("app_description")}</p>
        </div>
      </div>
    </div>
  );
}
