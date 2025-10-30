export function Card({ title, total }) {
  return (
    <div
      className={`flex h-24 min-w-24 flex-col items-center justify-center rounded-lg border border-neutral-300 bg-neutral-200 shadow-xs md:min-w-40`}
    >
      <p className="text-xs font-medium text-neutral-600 md:text-sm">{title}</p>
      <span className="text-4xl font-semibold text-neutral-700 md:text-5xl">
        {total}
      </span>
    </div>
  );
}
