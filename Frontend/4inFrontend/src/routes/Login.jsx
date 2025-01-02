import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.svg";
import { InputPassword } from "../components/InputPassword";
import { InputUserName } from "../components/InputUsername";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const { login, authError, setAuthError } = useAuth();

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
        message: "Invalid user or password, try again.",
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
              Welcome Back 👋
            </h1>
            <h3 className="w-full text-xl font-medium text-neutral-800">
              Log in!
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
                  <span>Log in</span>
                )}
              </button>

              <div className="relative mt-8 flex w-1/2 flex-col items-center">
                <span className="w-full border-t border-neutral-400"></span>
                <p className="absolute -top-3 bg-neutral-50 px-1 text-neutral-500">
                  or
                </p>
              </div>
              <Link
                to={"/signup"}
                className="mt-4 font-bold text-neutral-600 underline hover:text-neutral-700"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>

        <div className="flex h-48 w-full flex-col items-center justify-center rounded-lg bg-neutral-800 md:h-full">
          <img src={logo} alt="4inventory" className="w-1/2" />
          <p className="text-neutral-50">A simple but powerful inventory</p>
        </div>
      </div>
    </div>
  );
}
