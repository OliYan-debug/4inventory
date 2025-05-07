export function TimelineSkeleton() {
  return (
    <div className="flex w-96 animate-pulse items-center space-x-2">
      <div className="relative flex justify-center">
        <span className="absolute top-11 block h-6 border-s-2 border-dashed border-neutral-400" />

        <div className={`flex size-10 rounded-lg bg-neutral-400`}></div>
      </div>

      <div className="flex max-w-64 flex-col justify-center gap-1">
        <span className="h-3 w-48 rounded-lg bg-neutral-500"></span>
        <span className="h-2 w-16 rounded-lg bg-neutral-400"></span>
      </div>

      <div className="flex h-6 items-center border-s border-neutral-400 ps-2">
        <span className="h-3 w-24 rounded-lg bg-neutral-400"></span>
      </div>
    </div>
  );
}
