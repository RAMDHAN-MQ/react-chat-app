import { SendHorizontal } from "lucide-react";
import Input from "../Input/Input";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

export default function ChatSend({ conversationID }) {
  const [message, setMessage] = useState("");

  async function handleSendChat(event) {
    event.preventDefault();

    try {
      await api.post("/conversation/send", {
        conversationId: conversationID,
        text: message,
      });

      setMessage("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <form
      onSubmit={(e) => handleSendChat(e)}
      className="bg-gray-300 min-h-[10vh] px-2 py-4 flex items-center"
    >
      <div className="w-full h-full">
        <Input
          placeholder={"Ketikan sesuatu..."}
          className={"px-3"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
      </div>

      <div className="h-full ml-2 flex items-center">
        <button
          className="bg-blue-500 text-white p-2 rounded-full size-12 flex justify-center items-center"
          type="submit"
        >
          <SendHorizontal size={24} />
        </button>
      </div>
    </form>
  );
}
