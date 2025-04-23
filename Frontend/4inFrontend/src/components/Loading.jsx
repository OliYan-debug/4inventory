import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-white/80">
      <span className="flex items-center justify-center">
        <Loader2 className="animate-spin text-neutral-800" size={32} />
      </span>
    </div>
  );
}
