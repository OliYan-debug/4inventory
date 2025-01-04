import { IdCard, User2Icon } from "lucide-react";

export function Profile({ user, children }) {
  return (
    <div className="justify-top relative flex h-screen w-full flex-col items-center rounded-tl-[62px] border border-neutral-200 bg-neutral-100/40">
      <div className="absolute top-16 mt-1 flex size-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-100 font-medium">
        <span className="text-xl font-bold">
          <User2Icon size={30} className="text-neutral-700" />
        </span>
      </div>

      <div className="h-28 w-full rounded-tl-[62px] bg-gradient-to-r from-neutral-500 shadow-sm"></div>

      <div className="mt-10 flex w-full flex-col items-center border-b border-neutral-200 pb-4">
        <h2 className="text-3xl font-bold text-neutral-800">{user.name}</h2>
        <span className="text-base font-semibold text-neutral-500">
          {user.username}
        </span>

        <div className="flex items-center gap-px text-sm text-neutral-500">
          <IdCard size={18} />
          <span>{user.permission}</span>
        </div>
      </div>

      {children}
    </div>
  );
}
