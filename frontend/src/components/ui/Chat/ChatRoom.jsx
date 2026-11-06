import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chat from "./Chat";
import ChatSend from "./ChatSend";
import ChatTop from "./ChatTop";
import api from "../../../api/axios";
import { MessageSquarePlus } from "lucide-react";
import socket from "../../../socket/socket.js";

export default function ChatRoom({ onConversationRead }) {
  const [otherUser, setOtherUser] = useState({
    nama: "",
    username: "",
  });

  const [message, setMessage] = useState([]);
  const { conversationID } = useParams();

  useEffect(() => {
    if (!conversationID) return;

    let isMounted = true;

    async function handleChatRoom() {
      try {
        const response = await api.get(`/conversation/${conversationID}`);

        if (!isMounted) return;

        setOtherUser({
          nama: response.data.participant.nama,
          username: response.data.participant.username,
        });

        setMessage(response.data.message);

        onConversationRead(conversationID);
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    }

    handleChatRoom();

    return () => {
      isMounted = false;
    };
  }, [conversationID, onConversationRead]);

  useEffect(() => {
    if (!conversationID) return;

    function handleNewMessage(newMessage) {
      if (String(newMessage.conversation) !== String(conversationID)) {
        return;
      }

      setMessage((prev) => {
        if (prev.some((msg) => msg._id === newMessage._id)) {
          return prev;
        }

        return [...prev, newMessage];
      });
    }

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [conversationID]);

  useEffect(() => {
    function handleMessageRead(data) {
      if (String(data.conversationId) !== String(conversationID)) {
        return;
      }

      setMessage((prev) =>
        prev.map((e) => {
          if (String(e.sender?._id ?? e.sender) === String(data.readerId)) {
            return e;
          }

          return {
            ...e,
            readBy: [
              ...(e.readBy || []).filter(
                (id) => String(id?._id ?? id) !== String(data.readerId),
              ),
              data.readerId,
            ],
          };
        }),
      );
    }

    socket.on("messagesRead", handleMessageRead);

    return () => {
      socket.off("messagesRead", handleMessageRead);
    };
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
