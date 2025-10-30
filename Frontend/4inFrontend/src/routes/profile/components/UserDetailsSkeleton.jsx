export function UserDetailsSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="relative mt-8 flex h-96 w-full animate-pulse flex-col items-center rounded-lg bg-neutral-100 pb-8 md:w-[45dvw]">
        <div className="absolute top-8 mt-1 flex size-20 rounded-full bg-neutral-200 md:top-16" />

        <div className="h-20 w-full rounded-t-xl bg-neutral-300 shadow-xs md:h-28"></div>

        <div className="mt-16 flex w-full flex-col items-center gap-3">
          <div className="flex h-6 w-1/2 rounded-full bg-neutral-300" />

          <div className="flex h-4 w-2/3 rounded-full bg-neutral-200" />

          <div className="flex h-4 w-1/4 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
