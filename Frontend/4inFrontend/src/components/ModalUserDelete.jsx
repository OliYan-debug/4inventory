import { Trash2 } from "lucide-react";

export function ModalUserDelete({ userId, userName, setCheckDeleteOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <div className="flex w-4/5 flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center md:w-[40vw]">
        <span className="flex size-10 items-center justify-center rounded-full bg-red-600/60">
          <Trash2 size={22} className="text-red-600" />
        </span>
        <h1 className="my-2 text-2xl font-bold text-neutral-800">
          Delete User?
        </h1>
        <span className="font-medium text-red-600">{userName}</span>
        <p className="text-sm text-neutral-500">
          Will be deleted, this action cannot be undone.
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => setCheckDeleteOpen(false)}
            className="flex items-center justify-center rounded-lg border border-neutral-400 px-2 py-1 font-semibold text-neutral-400 transition hover:bg-neutral-200 hover:underline"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => console.log(userId)}
            className="flex w-32 items-center justify-center rounded-lg bg-red-400 px-2 py-1 font-semibold text-neutral-50 transition hover:bg-red-500 hover:underline"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
