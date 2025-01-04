import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { InputPassword } from "./InputPassword";
import { InputCreatePassword } from "./InputCreatePassword";
import { InputConfirmPassword } from "./InputConfirmPassword";
import { toast } from "react-toastify";
import { api } from "../services/api";

export function UpdatePassword({ username }) {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const [invalidPassword, setInvalidPassword] = useState(true);

  const onSubmit = async (data) => {
    data = {
      login: username,
      password: data.password,
      newPassword: data.createPassword,
    };

    try {
      await toast.promise(api.post("/auth/reset", data), {
        pending: "Updating password",
        success: {
          render() {
            return <p>Password updated!</p>;
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
      reset();
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
        Update your password
      </h3>
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
