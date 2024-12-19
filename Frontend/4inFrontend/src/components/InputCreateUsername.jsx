export function InputCreateUserName({ register, errors, isSubmitting }) {
  return (
    <div>
      <div className="relative flex w-full items-center">
        <label
          htmlFor="name"
          className={`absolute bottom-8 ms-2 bg-neutral-50 px-1 text-sm text-neutral-500 ${
            errors.name && "text-red-600"
          }`}
        >
          User Name
        </label>

        <input
          defaultValue=""
          {...register("username", {
            required: "User name is required",
            maxLength: {
              value: 20,
              message: "Maximum character value exceeded",
            },
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
            validate: {
              validate: (value) => {
                const reservedWords = [
                  "admin",
                  "root",
                  "superuser",
                  "superadmin",
                  "user",
                ];
                if (reservedWords.includes(value.toLowerCase())) {
                  return "System Reserved user name, try another";
                }

                const regex = /^[a-zA-Z0-9._-]+$/;
                if (!value.match(regex)) {
                  return "The username can only contain letters, numbers, underlines, hyphens and dots";
                }

                return true;
              },
            },
          })}
          aria-invalid={errors.username ? "true" : "false"}
          type="text"
          id="username"
          disabled={isSubmitting}
          placeholder="your username"
          className={`focus-visible::border-neutral-500 w-full rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
            errors.username &&
            "border-red-600 text-red-600 hover:border-red-600 focus-visible:border-red-600"
          }`}
        />
      </div>
      {errors.username && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.username?.message}
        </p>
      )}
    </div>
  );
}
