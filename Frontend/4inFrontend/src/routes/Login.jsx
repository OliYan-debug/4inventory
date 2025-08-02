import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import { InputPassword } from "../components/InputPassword";
import { InputUserName } from "../components/InputUsername";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { AppDescription } from "../components/AppDescription";
import { Button } from "../components/Button";
import { InputErrors } from "../components/Input";

export default function Login() {
  const { t } = useTranslation("login");

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const { login, user, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/products", { replace: true });
    }
  }, [navigate, user]);

  const onSubmit = async (data) => {
    const newData = {
      login: data.username,
      password: data.password,
    };

    await login(newData);
  };

  useEffect(() => {
    if (authError) {
      toast.error(authError);

      setError("username", { type: "invalid" }, { shouldFocus: true });

      resetField("password");
      setError("password", {
        type: "invalid",
        message: t("auth_error"),
      });
    }
    setAuthError(null);
  }, [authError]);

  return (
    <div className="m-0 h-dvh w-screen bg-neutral-300 bg-[url(./src/assets/wave_background.svg)] bg-cover bg-no-repeat p-4 md:h-screen">
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
            <InputUserName
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              isActive={true}
            />

            <InputPassword
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
            />

            <div className="flex flex-col -space-y-2">
              {errors.username && errors.username.message && (
                <InputErrors message={errors.username?.message} />
              )}

              {errors.password && (
                <InputErrors message={errors.password?.message} />
              )}
            </div>

            <div className="flex w-full flex-col items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-neutral-800"
              >
                <span>{t("login")}</span>

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
                to={"/signup"}
                className="mt-4 font-bold text-neutral-600 underline hover:text-neutral-700"
              >
                {t("signup")}
              </Link>
            </div>
          </form>
        </div>

        <AppDescription />
      </div>
    </div>
  );
}
