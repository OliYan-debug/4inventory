export function Card({ title, total }) {
  return (
    <div
      className={`flex h-24 w-40 flex-col items-center justify-center rounded-lg border border-neutral-300 bg-neutral-200 shadow-sm`}
    >
      <p className="text-sm font-medium text-neutral-600">{title}</p>
      <span className="text-5xl font-semibold text-neutral-700">{total}</span>
    </div>
  );
}
