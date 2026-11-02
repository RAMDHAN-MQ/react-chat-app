import { useParams } from "react-router-dom";
import Chat from "./Chat";
import ChatSend from "./ChatSend";
import ChatTop from "./ChatTop";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api/axios";
import { MessageSquarePlus } from "lucide-react";

export default function ChatRoom() {
  const [otherUser, setOtherUser] = useState({
    nama: "",
    username: "",
  });

  const [message, setMessage] = useState([]);
  const { conversationID } = useParams();

  useEffect(() => {
    async function handleChatRoom() {
      try {
        const response = await api.get(`/conversation/${conversationID}`);
        setOtherUser({
          nama: response.data.participant.nama,
          username: response.data.participant.username,
        });
        setMessage(response.data.message);
      } catch (error) {
        console.error(error.response.data.message);
      }
    }

    handleChatRoom();
  }, [conversationID]);

  return (
    <div className="h-full flex flex-col justify-between">
      {conversationID === undefined ? (
        <div className="p-3 bg-blue-500 flex flex-col justify-center gap-4 items-center h-full mb-1 rounded">
          <p className="text-6xl font-bold text-white">Selamat Datang!</p>
          <p className="text-xl flex gap-2 text-white">
            Mulai chat dengan <MessageSquarePlus /> di atas!
          </p>
        </div>
      ) : (
        <>
          <ChatTop nama={otherUser.nama} username={otherUser.username} />
          <Chat message={message} />
          <ChatSend conversationID={conversationID} />
        </>
      )}
    </div>
  );
}
