import { useRouteError } from "react-router-dom";
import { ServerOff } from "lucide-react";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="flex h-screen w-screen items-center justify-center bg-neutral-300"
    >
      <div className="flex flex-col items-center rounded-2xl bg-neutral-50 px-8 py-4 text-center">
        <h1 className="text-3xl font-bold text-neutral-800">Oops!</h1>
        <p className="mb-4 mt-2 text-sm text-neutral-500">
          Sorry, an unexpected error has occurred:
        </p>
        <span className="mb-6 font-medium text-neutral-600">
          {error.statusText || error.message}
        </span>
        <ServerOff size={84} color="#262626" />
      </div>
    </div>
  );
}

export default ErrorPage;
