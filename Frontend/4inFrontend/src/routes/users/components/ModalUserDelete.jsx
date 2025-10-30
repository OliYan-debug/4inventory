import { Trash2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/Button";

export function ModalUserDelete({
  id,
  username,
  name,
  setCheckDeleteOpen,
  updateData,
}) {
  const { t } = useTranslation("modal_user_delete", { useSuspense: false });

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      const result = await toast.promise(api.delete(`/admin/users/${id}`), {
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
      });

      if (result.status === 200 && user.sub === username) {
        return navigate("/logout");
      }

      updateData();
      setCheckDeleteOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="flex w-4/5 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[40vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-red-600/60">
          <Trash2 size={22} className="text-red-600" />
        </span>

        <h1 className="my-2 text-2xl font-bold text-neutral-800">
          {t("modal.title")}
        </h1>

        <span className="font-medium text-red-600">{name}</span>

        <p className="text-sm text-neutral-500">{t("modal.text")}</p>

        {user.sub === username && (
          <div className="mt-4 text-xs text-neutral-400">
            {t("modal.alert.your_own")}{" "}
            <span className="font-semibold">
              {t("modal.alert.disconnected")}
            </span>
          </div>
        )}

        <div className="mt-4 flex h-10 w-full gap-2 px-8">
          <Button type="button" onClick={() => setCheckDeleteOpen(false)}>
            {t("buttons.cancel")}
          </Button>

          <Button
            type="button"
            onClick={() => handleDeleteUser()}
            className="bg-red-400"
          >
            {t("buttons.delete")}
          </Button>
        </div>
      </div>
    </div>
  );
}
