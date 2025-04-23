import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputName } from "./InputName";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export function UpdateName({ user, updateUser }) {
  const { t } = useTranslation("update_name");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("name", user.name);
  }, [setValue, user]);

  const onSubmit = async (data) => {
    if (data.name === user.name) {
      setError("name", {
        type: "invalid",
        message: t("form.current_name"),
      });
      return;
    }

    data = {
      newName: data.name,
    };

    try {
      await toast.promise(api.put("/user", data), {
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

            if (data.code === "ERR_BAD_REQUEST") {
              return (
                <p>
                  {t("loading.errors.token")}{" "}
                  <span className="text-xs opacity-80">path:/products</span>
                </p>
              );
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

      updateUser();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-80 flex-col items-center gap-8"
    >
      <h3 className="text-lg font-bold text-neutral-700">{t("title")}</h3>
      <InputName
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        value={user.name}
        isActive={true}
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
          to={"/user/password"}
          className="mt-4 font-bold text-neutral-600 underline hover:text-neutral-700"
        >
          {t("buttons.password")}
        </Link>
      </div>
    </form>
  );
}
