import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex w-full justify-center py-4">
      <Loader2 size={24} color="#737373" className="animate-spin" />
    </div>
  );
}
