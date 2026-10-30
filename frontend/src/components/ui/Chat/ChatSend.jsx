import { SendHorizontal } from "lucide-react";
import Input from "../Input/Input";

export default function ChatSend() {
  return (
    <div className="bg-gray-300 min-h-[10vh] px-2 py-4 flex items-center">
      <div className="w-full h-full">
        <Input placeholder={"Ketikan sesuatu..."} className={"px-3"} />
      </div>

      <div className="h-full ml-2 flex items-center">
        <button className="bg-blue-500 text-white p-2 rounded-full size-12 flex justify-center items-center">
          <SendHorizontal size={24} />
        </button>
      </div>
    </div>
  );
}
