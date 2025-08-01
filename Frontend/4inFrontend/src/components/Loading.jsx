import { Rat } from "lucide-react";

export function Loading() {
  return (
    <div className="fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-white/80">
      <span className="flex items-center justify-center">
        <Rat className="size-10 animate-bounce text-neutral-800" />
      </span>
    </div>
  );
}
