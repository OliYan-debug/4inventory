import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputConfirmPassword({
  register,
  getValues,
  errors,
  invalidPassword,
  isSubmitting,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div
      className={`${
        invalidPassword
          ? "hidden"
          : "md:grid-cols-form-md lg:grid-cols-form-lg flex animate-fadeIn flex-col md:grid md:items-center"
      }`}
    >
      <div className="relative flex w-full items-center">
        <label
          htmlFor="confirmPass"
          className={`absolute bottom-8 ms-2 bg-neutral-50 px-1 text-sm text-neutral-500 ${
            errors.confirmPass && "text-red-600"
          }`}
        >
          Confirm Password
        </label>

        <input
          defaultValue=""
          {...register("confirmPass", {
            required: "Confirm Password is required",
            maxLength: {
              value: 64,
              message: "Maximum 64 characters",
            },
            validate: {
              validatePassword: (value) => {
                if (value !== getValues("password")) {
                  return "Passwords are different";
                }

                return true;
              },
            },
          })}
          aria-invalid={errors.confirmPass ? "true" : "false"}
          type={showPassword ? "text" : "password"}
          id="confirmPass"
          disabled={isSubmitting}
          placeholder="confirm your password"
          className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.confirmPass &&
            "border-red-600 text-red-600 hover:border-red-600 focus-visible:border-red-600"
          }`}
        />

        <button
          type="button"
          className="absolute right-2 hover:opacity-80"
          onClick={handleEyeClick}
          aria-label="Show/hidden password"
          disabled={isSubmitting}
        >
          {!showPassword ? (
            <Eye className="text-neutral-500" size={19} />
          ) : (
            <EyeOff className="text-neutral-500" size={19} />
          )}
        </button>
      </div>
      {errors.confirmPass && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.confirmPass?.message}
        </p>
      )}
    </div>
  );
}
