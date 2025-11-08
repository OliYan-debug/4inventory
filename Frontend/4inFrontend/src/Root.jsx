import { Outlet } from "react-router-dom";

import { NavBar } from "@/components/header/NavBar";
import { MobileHeader } from "@/components/header/MobileHeader";

function root() {
  return (
    <div className="m-0 flex min-h-dvh max-w-full flex-row bg-neutral-300 bg-[url(@/assets/waveBackground.svg)] bg-cover bg-no-repeat p-4">
      <NavBar />

      <div id="content" className="min-h-dvh w-full">
        <MobileHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default root;
