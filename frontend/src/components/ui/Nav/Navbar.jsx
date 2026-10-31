import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar({ children }) {
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
  });

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
            className=" flex items-center rounded-full overflow-hidden ring ring-white ring-offset-1 cursor-pointer"
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
              {children}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
