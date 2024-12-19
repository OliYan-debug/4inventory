export function InputDescription({ register, errors, itemId, selectedItem }) {
  return (
    <div className="w-full">
      <label htmlFor="description" className="text-sm text-neutral-500">
        Description
      </label>

      <textarea
        defaultValue={itemId ? selectedItem.description : ""}
        {...register("description", {
          maxLength: {
            value: 255,
            message: "Maximum character value exceeded",
          },
        })}
        aria-invalid={errors.description ? "true" : "false"}
        type="text"
        id="description"
        placeholder="Item description"
        className={`h-26 focus-visible::border-neutral-500 w-full resize-none rounded-lg border border-neutral-400 px-4 py-2 text-neutral-500 outline-none hover:border-neutral-500 disabled:cursor-no-drop disabled:text-opacity-60 disabled:hover:border-neutral-400 ${
          errors.description &&
          "focus-visible::border-red-600 border-red-600 bg-red-100 text-red-600 hover:border-red-600"
        }`}
      ></textarea>

      {errors.description && (
        <p role="alert" className="mt-1 text-center text-xs text-red-600">
          {errors.description?.message}
        </p>
      )}
    </div>
  );
}
