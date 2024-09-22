export default function Item({
  id,
  item,
  description,
  category,
  quantity,
  created,
  count,
}) {
  return (
    <div
      className={`grid grid-cols-6 justify-items-center ${
        count % 2 ? "bg-neutral-100" : "bg-neutral-200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{item}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{description}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <div
          style={{ backgroundColor: category[0].color }}
          className="rounded-md px-1 py-px"
        >
          <p className="text-neutral-300 drop-shadow-sm">{category[0].name}</p>
        </div>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{quantity}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">
          {created[0]}-{created[1]}-{created[2]}
        </p>
      </div>
    </div>
  );
}
