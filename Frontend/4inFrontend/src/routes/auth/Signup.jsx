import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/Button";
import { InputErrors } from "@/components/Input";
import { Loading } from "@/components/Loading";
import { InputName } from "./components/InputName";
import { InputCreateUserName } from "./components/InputCreateUsername";
import { InputCreatePassword } from "./components/InputCreatePassword";
import { InputConfirmPassword } from "./components/InputConfirmPassword";
import { AppDescription } from "./components/AppDescription";

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
    <Suspense fallback={<Loading />}>
      <div className="m-0 h-dvh w-screen bg-neutral-300 bg-[url(@/assets/waveBackground.svg)] bg-cover bg-no-repeat p-4 md:h-screen">
        <div className="flex h-full w-full flex-col-reverse gap-4 rounded-lg bg-neutral-50 md:flex-row md:items-center md:p-20">
          <div className="flex h-full w-full flex-col justify-start px-10 py-5 md:justify-center md:pe-10">
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
              className="flex w-full flex-col gap-2"
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

              <div className="flex flex-col -space-y-2">
                {errors.name && <InputErrors message={errors.name?.message} />}

                {errors.username && (
                  <InputErrors message={errors.username?.message} />
                )}

                {errors.createPassword && (
                  <InputErrors message={errors.createPassword?.message} />
                )}

                {errors.confirmPass && (
                  <InputErrors message={errors.confirmPass?.message} />
                )}
              </div>

              <div className="flex w-full flex-col items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-neutral-800"
                >
                  <span>{t("signup")}</span>

                  {isSubmitting && (
                    <span className="flex items-center justify-center">
                      <Loader2 className="size-4 animate-spin" />
                    </span>
                  )}
                </Button>

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

          <AppDescription />
        </div>
      </div>
    </Suspense>
  );
}
