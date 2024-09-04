export default function Item({
  id,
  name,
  description,
  category,
  quantity,
  dateEntry,
}) {
  return (
    <div
      className={`grid grid-cols-6 justify-items-center bg-neutral-${
        id % 2 ? "100" : "200"
      }`}
    >
      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{id}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{name}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{description}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-yellow-200 bg-yellow-500 py-px px-1 rounded-md">
          {category}
        </p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{quantity}</p>
      </div>

      <div className="col-auto flex items-center py-2">
        <p className="text-neutral-500">{dateEntry}</p>
      </div>
    </div>
  )
}
