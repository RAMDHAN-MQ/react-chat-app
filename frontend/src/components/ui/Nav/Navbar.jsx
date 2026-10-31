import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ children, nama, username }) {
  const [isDrop, setIsDrop] = useState(false);
  const dropdownRef = useRef(null);

  function hanldeClickOutsideNav(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDrop(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", hanldeClickOutsideNav);

    return () => {
      document.removeEventListener("click", hanldeClickOutsideNav);
    };
  }, []);

  return (
    <nav className="bg-blue-500 p-5 flex justify-between items-center">
      <div className="font-bold text-white" aria-label="logo">
        Chat App!
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white">
          <Bell />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className=" flex items-center gap-2 rounded-full overflow-hidden ring ring-white ring-offset-1 cursor-pointer"
            onClick={() => setIsDrop(!isDrop)}
          >
            <img
              src="https://picsum.photos/200"
              alt="foto profile"
              className="size-8"
            />
          </button>
          {isDrop && (
            <div className="h-fit min-w-64 bg-white absolute right-0 top-full mt-2 rounded shadow-lg overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-b-gray-300 font-semibold">
                <span className="line-clamp-1">{nama}</span>
                <span className="text-gray-300">@{username}</span>
              </div>
              {children}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
