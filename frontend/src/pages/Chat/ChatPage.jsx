import CardChat from "../../components/ui/Card/CardChat";
import Input from "../../components/ui/Input/Input";
import Navbar from "../../components/ui/Nav/Navbar";
import NavbarDropMenu from "../../components/ui/Nav/NavbarDropMenu";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import ChatRoom from "../../components/ui/Chat/ChatRoom";
import socket from "../../socket/socket";

export default function ChatPage() {
  const { user, setUser } = useOutletContext();
  const [conversation, setConversation] = useState([]);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    async function getConversation() {
      try {
        const response = await api.get("/conversation/");
        setConversation(response.data);
      } catch (error) {
        console.error(error.response.data.message);
      }
    }

    getConversation();
  }, []);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function joinRooms() {
      conversation.forEach((e) => {
        socket.emit("joinConversation", e._id);
      });
    }

    socket.on("connect", joinRooms);

    if (socket.connected) {
      joinRooms();
    }

    return () => {
      socket.off("connect", joinRooms);
    };
  }, [conversation]);

  useEffect(() => {
    function handleNewMessage(newMessage) {
      setConversation((prev) => {
        const conversationIndex = prev.findIndex(
          (e) => String(e._id) === String(newMessage.conversation),
        );

        if (conversationIndex === -1) {
          return prev;
        }

        const updatedConversation = {
          ...prev[conversationIndex],
          lastChat: newMessage,
        };

        const updatedList = prev.filter(
          (e) => String(e._id) !== String(newMessage.conversation),
        );

        return [updatedConversation, ...updatedList];
      });
    }

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar nama={user.nama} username={user.username}>
        <NavbarDropMenu>
          <User size={20} />
          Profile
        </NavbarDropMenu>
        <NavbarDropMenu>
          <Settings size={20} />
          Setting
        </NavbarDropMenu>
        <NavbarDropMenu variant={"danger"} onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </NavbarDropMenu>
      </Navbar>

      <div className="flex-1 flex min-h-0 w-full bg-gray-300 overflow-hidden">
        <div className="w-3/12 px-1 min-h-0">
          <div className="p-3 bg-white my-1 flex justify-center items-center min-h-[10vh] rounded">
            <Input placeholder={"Cari nama..."} className={"p-3"} />
          </div>
          <div className="flex flex-col gap-1 h-full overflow-auto">
            {conversation
              .filter((f) => f.lastChat !== null)
              .map((e) => {
                const other = e.participants.find(
                  (cari) => String(cari._id) !== String(user._id),
                );
                return (
                  <CardChat
                    key={e._id}
                    nama={other.nama}
                    pesan={e.lastChat.text}
                    onClick={() => navigate(`/chat/${e._id}`)}
                  />
                );
              })}
          </div>
        </div>

        <div className="w-9/12 pt-1 pr-1 min-h-0">
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}
