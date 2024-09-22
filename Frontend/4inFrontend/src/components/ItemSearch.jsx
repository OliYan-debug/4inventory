export default function ItemSearch({ id, item, handleSelect }) {
  return (
    <button
      type="button"
      onClick={() => handleSelect(id)}
      className="flex w-full justify-items-center gap-6 hover:bg-neutral-100"
    >
      <div className="py-2">
        <p className="text-neutral-500">{item}</p>
      </div>
    </button>
  );
}
