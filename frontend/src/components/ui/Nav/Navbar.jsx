import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-5 flex justify-between items-center">
      <div className="font-bold text-white" aria-label="logo">
        Chat App!
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white">
          <Bell />
        </button>
        <button className="flex items-center rounded-full overflow-hidden ring ring-white ring-offset-1">
          <img
            src="https://picsum.photos/200"
            alt="foto profile"
            className="size-8"
          />
        </button>
      </div>
    </nav>
  );
}
