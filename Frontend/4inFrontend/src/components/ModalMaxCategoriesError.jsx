import { TextSearch, Undo2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ModalMaxCategoriesError() {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-fadeIn items-center justify-center bg-black/50">
      <div className="flex w-[30vw] flex-col items-center rounded-2xl bg-neutral-50 px-8 py-6 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-orange-600/60">
          <TextSearch size={22} color="#ea580c" />
        </span>
        <h1 className="my-2 text-3xl font-bold text-neutral-800">Oops!</h1>
        <p className="text-sm text-neutral-500">
          Maximum number of categories reached. Please try deleting or editing
          some.
        </p>
        <Link
          to={"/categories"}
          className="mt-6 flex items-center justify-center rounded-lg bg-orange-400 px-4 py-2 font-semibold text-neutral-50 transition hover:bg-orange-500 disabled:cursor-no-drop disabled:opacity-70"
        >
          Back to categories
          <Undo2 size={20} color="#fafafa" className="ms-2" />
        </Link>
      </div>
    </div>
  );
}
