import { Rat } from "lucide-react";

export function LoadingSkeleton() {
  const Item = ({ width, bgColor }) => (
    <div className="flex items-center py-2">
      <div className={`h-4 ${width} rounded-full ${bgColor}`}></div>
    </div>
  );

  return (
    <div className="flex animate-pulse flex-col items-center gap-8">
      <div className="flex w-full justify-evenly bg-neutral-100">
        <Item width="w-36" bgColor="bg-neutral-200" />
        <Item width="w-80" bgColor="bg-neutral-300" />
        <Item width="w-40" bgColor="bg-neutral-200" />

        <Item width="w-18" bgColor="bg-neutral-300" />
      </div>

      <Rat size={48} className="animate-bounce text-neutral-700" />
    </div>
  );
}
