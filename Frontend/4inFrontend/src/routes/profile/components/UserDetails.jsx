import { IdCard, User2Icon } from "lucide-react";

export function UserDetails({ user, children }) {
  return (
    <div className="relative mt-8 flex w-full flex-col items-center rounded-lg bg-neutral-100/60 pb-8 md:w-[45dvw]">
      <div className="absolute top-8 mt-1 flex size-20 items-center justify-center rounded-full border border-neutral-700 bg-neutral-100 font-medium md:top-16">
        <span className="text-xl font-bold">
          <User2Icon className="size-7 text-neutral-700" />
        </span>
      </div>

      <div className="h-20 w-full rounded-t-xl bg-neutral-400 shadow-xs md:h-28"></div>

      <div className="mt-10 flex w-full flex-col items-center border-b border-neutral-200 pb-4">
        <h2 className="max-w-full truncate px-2 text-3xl font-bold text-neutral-800">
          {user.name}
        </h2>

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
