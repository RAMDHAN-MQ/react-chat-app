import { useParams } from "react-router-dom";
import Chat from "./Chat";
import ChatSend from "./ChatSend";
import ChatTop from "./ChatTop";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../api/axios";

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
        console.log(error);
      }
    }

    handleChatRoom();
  }, [conversationID]);

  return (
    <div className="h-full flex flex-col justify-between">
      <ChatTop nama={otherUser.nama} username={otherUser.username} />
      <Chat message={message} />
      <ChatSend />
    </div>
  );
}
