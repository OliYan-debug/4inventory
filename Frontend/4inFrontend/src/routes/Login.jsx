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
                  <span>{t("login")}</span>
                )}
              </button>

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
