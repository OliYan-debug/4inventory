import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { InputPassword } from "./InputPassword";
import { InputCreatePassword } from "./InputCreatePassword";
import { InputConfirmPassword } from "./InputConfirmPassword";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export function UpdatePassword({ username }) {
  const { t } = useTranslation("update_password");

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const [invalidPassword, setInvalidPassword] = useState(true);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (data.password === data.createPassword) {
      resetField("createPassword");
      resetField("confirmPass");

      setError("createPassword", {
        type: "invalid",
        message: t("form.current_password"),
      });

      return;
    }

    data = {
      login: username,
      password: data.password,
      newPassword: data.createPassword,
    };

    try {
      const result = await toast.promise(api.post("/user/password", data), {
        pending: t("loading.pending"),
        success: t("loading.success"),
        error: {
          render({ data }) {
            if (data.code === "ECONNABORTED" || data.code === "ERR_NETWORK") {
              return (
                <p>
                  {t("loading.errors.network")}{" "}
                  <span className="text-xs opacity-80">
                    #timeout exceeded/network error.
                  </span>
                </p>
              );
            }

            if (data.status === 403) {
              resetField("password");
              setError("password", {
                type: "invalid",
                message: t("form.invalid_password"),
              });

              return t("loading.errors.invalid_password");
            }

            return (
              <p>
                {t("loading.errors.generic")}
                <br />
                <span className="text-xs opacity-80">
                  {data.response.data.message}
                </span>
              </p>
            );
          },
        },
      });

      if (result.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex w-80 flex-col items-center gap-8"
      >
        <h3 className="text-lg font-bold text-neutral-700">{t("title")}</h3>

        <InputPassword
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
            className="h-10 w-1/2 rounded-full bg-neutral-800 font-medium text-neutral-50 transition hover:underline hover:opacity-90 disabled:cursor-progress disabled:opacity-80 disabled:hover:no-underline disabled:hover:opacity-80"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin" color="#ffffff" size={18} />
              </span>
            ) : (
              <span>{t("buttons.submit")}</span>
            )}
          </button>

          <div className="relative mt-8 flex w-1/2 flex-col items-center">
            <span className="w-full border-t border-neutral-400"></span>
            <p className="absolute -top-3 bg-neutral-50 px-1 text-neutral-500">
              {t("or")}
            </p>
          </div>
          <Link
            to={"/user/profile"}
            className="mt-4 font-bold text-neutral-600 underline hover:text-neutral-700"
          >
            {t("buttons.user")}
          </Link>
        </div>
      </form>
    </>
  );
}
