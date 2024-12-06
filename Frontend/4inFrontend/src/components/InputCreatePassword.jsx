import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputCreatePassword({
  register,
  errors,
  setInvalidPassword,
  isSubmitting,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleEyeClick = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };

  return (
    <div>
      <div className="relative flex w-full items-center">
        <label
          htmlFor="password"
          className={`absolute bottom-8 ms-2 bg-neutral-50 px-1 text-sm text-neutral-500 ${
            errors.password && "text-red-600"
          }`}
        >
          Password
        </label>

        <input
          defaultValue=""
          {...register("password", {
            required: "Password is required",
            maxLength: {
              value: 64,
              message: "Maximum 64 characters",
            },
            minLength: {
              value: 8,
              message: "Minimum 8 characters",
            },
            validate: {
              validatePassword: (value) => {
                const lowerCaseLetters = /[a-z]/;
                if (!value.match(lowerCaseLetters)) {
                  return "Do you need lowercase letters";
                }

                const upperCaseLetters = /[A-Z]/;
                if (!value.match(upperCaseLetters)) {
                  return "Do you need uppercase letters";
                }

                const numbers = /[0-9]/;
                if (!value.match(numbers)) {
                  return "Do you need numbers";
                }

                const specialCharacters = /[!@#$%^&*()-=_+{};':"|,.<>?]/;
                if (!value.match(specialCharacters)) {
                  return "Do you need special characters";
                }

                setInvalidPassword(false);
                return true;
              },
            },
          })}
          aria-invalid={errors.password ? "true" : "false"}
          type={showPassword ? "text" : "password"}
          id="password"
          disabled={isSubmitting}
          placeholder="your password"
          className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.password &&
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
      {errors.password && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.password?.message}
        </p>
      )}
    </div>
  );
}
