import { Bell, SendHorizontal } from "lucide-react";
import CardChat from "../../components/ui/Card/CardChat";

export default function ChatPage() {
  return (
    <>
      <nav className="bg-blue-500 p-5 flex justify-between items-center min-h-[10vh]">
        <div className="font-bold text-white" aria-label="logo">
          Chat App!
        </div>
        <div className="flex items-center gap-2">
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

      <div className="h-[90vh] w-full flex overflow-hidden">
        <div className="w-3/12 bg-gray-300">
          <div className="p-3 bg-white my-1 flex justify-center items-center min-h-[10vh]">
            <input
              type="text"
              placeholder="Cari Nama..."
              className="p-3 bg-white border-2 border-gray-300 w-full rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1 h-full overflow-scroll">
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
          </div>
        </div>

        <div className="w-9/12 bg-gray-300 pt-1 pl-1">
          <div className="h-full flex flex-col justify-between">
            <div className="p-3 bg-white flex justify-between items-center min-h-[10vh] mb-1">
              <div className="flex items-center gap-4">
                <button className="flex items-center rounded-full overflow-hidden ring ring-blue-500 ring-offset-1">
                  <img
                    src="https://picsum.photos/200"
                    alt="foto profile"
                    className="size-10"
                  />
                </button>
                <div className="flex flex-col">
                  <span className="text-black">Nama</span>
                  <span className="text-gray-400 text-xs">Last seen 12:20</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-scroll bg-white p-3"></div>

            <div className="bg-gray-300 min-h-[10vh] px-2 py-4 flex items-center">
              <div className="w-11/12 h-full">
                <input
                  type="text"
                  placeholder="Ketikan sesuatu..."
                  className="bg-white h-full w-full px-3 rounded-xl"
                />
              </div>

              <div className="w-1/12 h-full ml-2 flex items-center">
                <button className="bg-blue-500 text-white p-2 rounded-full">
                  <SendHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
