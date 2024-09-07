import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

function root() {
  return (
    <div className="bg-neutral-300 max-w-full p-4 flex flex-row gap-4">
      <NavBar />

      <div id="content" className="w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default root
