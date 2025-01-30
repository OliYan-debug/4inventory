import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { InputPassword } from "./InputPassword";
import { InputCreatePassword } from "./InputCreatePassword";
import { InputConfirmPassword } from "./InputConfirmPassword";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router";

export function UpdatePassword({ username }) {
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
        message: "Your new password must not be the same as your current one",
      });

      return;
    }

    data = {
      login: username,
      password: data.password,
      newPassword: data.createPassword,
    };

    try {
      const result = await toast.promise(
        api.post("/user/reset-password", data),
        {
          pending: "Updating password",
          success: {
            render() {
              return <p>Password updated! Please, Log in to continue.</p>;
            },
          },
          error: {
            render({ data }) {
              if (data.code === "ECONNABORTED" || data.code === "ERR_NETWORK") {
                return (
                  <p>
                    Error when updating, Try again. #timeout exceeded/network
                    error.
                  </p>
                );
              }

              if (data.status === 403) {
                resetField("password");
                setError("password", {
                  type: "invalid",
                  message: "Invalid password, try again.",
                });

                return (
                  <p>
                    Error when updating:
                    <span className="font-bold">Invalid password</span>. Try
                    again.
                  </p>
                );
              }
              return (
                <p>
                  Error when updating:
                  <span className="font-bold">
                    {data.response.data.message}
                  </span>
                  . Try again.
                </p>
              );
            },
          },
        },
      );

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
              <span>Save</span>
            )}
          </button>

          <div className="relative mt-8 flex w-1/2 flex-col items-center">
            <span className="w-full border-t border-neutral-400"></span>
            <p className="absolute -top-3 bg-neutral-50 px-1 text-neutral-500">
              or
            </p>
          </div>
          <Link
            to={"/user/profile"}
            className="mt-4 font-bold text-neutral-600 underline hover:text-neutral-700"
          >
            Change user details
          </Link>
        </div>
      </form>
    </>
  );
}
