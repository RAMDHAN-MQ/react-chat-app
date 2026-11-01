import { Bell, MessageSquarePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import ModalNewChat from "../Modal/ModalNewChat";

export default function Navbar({ children, nama, username }) {
  const [isDrop, setIsDrop] = useState(false);
  const dropdownRef = useRef(null);

  const [isNewChat, setIsNewChat] = useState(false);

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
    <>
      <nav className="bg-blue-500 p-5 flex justify-between items-center">
        <div className="font-bold text-white" aria-label="logo">
          Chat App!
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={"primary"}
            isIconOnly={true}
            onClick={() => setIsNewChat(true)}
          >
            <MessageSquarePlus />
          </Button>

          <Button variant={"primary"} isIconOnly={true}>
            <Bell />
          </Button>

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
      {isNewChat && (
        <ModalNewChat setIsNewChat={setIsNewChat} userLogin={username} />
      )}
    </>
  );
}
