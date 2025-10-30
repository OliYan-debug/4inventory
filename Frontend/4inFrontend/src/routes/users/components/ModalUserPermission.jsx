import { ShieldEllipsis } from "lucide-react";
import { useForm } from "react-hook-form";
import { api } from "@/services/api";
import { toast } from "react-toastify";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";

export function ModalUserPermission({
  id,
  username,
  name,
  permission,
  setCheckPermissionOpen,
  updateData,
}) {
  const { t } = useTranslation("modal_user_permission", { useSuspense: false });

  const { user } = useAuth();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (username === "admin") {
      return toast.error(t("loading.errors.userAdmin"));
    }

    data = {
      login: username,
      role: data.role,
    };

    try {
      const result = await toast.promise(
        api.patch(`/admin/users/${id}/role`, data),
        {
          pending: t("loading.pending"),
          success: t("loading.success"),
          error: {
            render({ data }) {
              return (
                <p>
                  {t("loading.errors.generic")}
                  <br />
                  <span className="text-xs opacity-80">
                    {data?.response?.data?.message}
                  </span>
                </p>
              );
            },
          },
        },
      );

      if (result.status === 200 && user.sub === username) {
        return navigate("/logout");
      }

      setCheckPermissionOpen(false);
      updateData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="flex w-4/5 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[40vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-green-600/60">
          <ShieldEllipsis size={22} className="text-green-600" />
        </span>

        <h1 className="my-2 text-2xl font-bold text-neutral-800">
          {t("modal.title")}
        </h1>

        <span className="font-medium text-green-700">{name}</span>

        <p className="text-sm text-neutral-500">
          {t("modal.text.currently")}{" "}
          <span className="font-medium">{permission}</span>{" "}
          {t("modal.text.permission")}.
        </p>

        <h2 className="mt-4 text-lg font-semibold text-neutral-800">
          {t("modal.subtitle")}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
          <div className="my-2 flex items-center gap-1">
            <label className="font-medium text-neutral-700" htmlFor="admin">
              {t("form.admin_label")}
            </label>

            <input
              {...register("role")}
              defaultChecked={permission === "admin"}
              type="radio"
              id="admin"
              value="ADMIN"
            />
          </div>

          <div className="flex items-center gap-1">
            <label className="font-medium text-neutral-700" htmlFor="User">
              {t("form.user_label")}
            </label>

            <input
              {...register("role")}
              defaultChecked={permission === "user"}
              type="radio"
              id="user"
              value="USER"
            />
          </div>
        </form>

        {user.sub === username && (
          <div className="text-xs text-neutral-400">
            {t("modal.alert.info")}{" "}
            <span className="font-semibold">
              {t("modal.alert.disconnected")}
            </span>
          </div>
        )}

        <div className="mt-4 flex h-10 w-full gap-2 px-8">
          <Button type="button" onClick={() => setCheckPermissionOpen(false)}>
            {t("buttons.cancel")}
          </Button>

          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="bg-green-400"
          >
            {t("buttons.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}
