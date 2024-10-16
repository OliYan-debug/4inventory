export default function ItemSearch({ id, item, handleSelect }) {
  return (
    <li
      onClick={() => handleSelect(id)}
      className="cursor-pointer px-4 transition hover:bg-neutral-200"
    >
      <div className="py-2">
        <p className="text-neutral-500">{item}</p>
      </div>
    </li>
  );
}
