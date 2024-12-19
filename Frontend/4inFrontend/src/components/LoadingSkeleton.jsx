export function LoadingSkeleton() {
  const Item = ({ width, bgColor }) => (
    <div className="flex items-center py-2">
      <div className={`h-4 ${width} rounded-full ${bgColor}`}></div>
    </div>
  );

  return (
    <div className="flex animate-pulse flex-col gap-8">
      <div className="flex justify-evenly bg-neutral-100">
        <Item width="w-16" bgColor="bg-neutral-200" />
        <Item width="w-32" bgColor="bg-neutral-300" />
        <Item width="w-36" bgColor="bg-neutral-300" />
        <Item width="w-24" bgColor="bg-neutral-100" />
        <Item width="w-32" bgColor="bg-neutral-200" />
        <Item width="w-18" bgColor="bg-neutral-300" />
      </div>

      <div className="flex justify-evenly bg-neutral-200">
        <Item width="w-60" bgColor="bg-neutral-100" />
        <Item width="w-36" bgColor="bg-neutral-300" />
        <Item width="w-40" bgColor="bg-neutral-100" />
        <Item width="w-20" bgColor="bg-neutral-300" />
      </div>

      <div className="flex justify-evenly bg-neutral-100">
        <Item width="w-36" bgColor="bg-neutral-200" />
        <Item width="w-40" bgColor="bg-neutral-300" />
        <Item width="w-50" bgColor="bg-neutral-300" />
        <Item width="w-48" bgColor="bg-neutral-200" />
        <Item width="w-18" bgColor="bg-neutral-300" />
      </div>
    </div>
  );
}
