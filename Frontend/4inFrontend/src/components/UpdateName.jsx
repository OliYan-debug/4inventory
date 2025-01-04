import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputName } from "./InputName";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../services/api";

export function UpdateName({ user }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    setValue("name", user.name);
  }, [setValue, user]);

  const onSubmit = async (data) => {
    data = {
      newName: data.name,
    };

    try {
      await toast.promise(api.put("/user/update", data), {
        pending: "Updating user",
        success: {
          render() {
            return <p>User updated!</p>;
          },
        },
        error: {
          render({ data }) {
            return (
              <p>
                Error when updating:
                <span className="font-bold">{data.response.data.message}</span>.
                Try again.
              </p>
            );
          },
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-8"
    >
      <h3 className="text-lg font-bold text-neutral-700">
        Update your information
      </h3>
      <InputName
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        value={user.name}
        isActive={true}
      />

      <div className="flex flex-col items-center">
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
            <span>Save</span>
          )}
        </button>
      </div>
    </form>
  );
}
