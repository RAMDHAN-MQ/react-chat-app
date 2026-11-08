import CardChat from "../../components/ui/Card/CardChat";
import Input from "../../components/ui/Input/Input";
import Navbar from "../../components/ui/Nav/Navbar";
import NavbarDropMenu from "../../components/ui/Nav/NavbarDropMenu";
import { LogOut, Settings, User } from "lucide-react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import api from "../../api/axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import ChatRoom from "../../components/ui/Chat/ChatRoom";
import socket from "../../socket/socket";

export default function ChatPage() {
  const { user, setUser } = useOutletContext();
  const [conversation, setConversation] = useState([]);
  const [search, setSearch] = useState("");

  const { conversationID } = useParams();
  const location = useLocation();
  const isOpenChat = location.pathname !== "/chat";
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

        const currentConversation = prev[conversationIndex];

        const isSender = String(newMessage.sender._id) === String(user._id);

        const isActiveConversation =
          String(newMessage.conversation) === String(conversationID);

        const updatedConversation = {
          ...currentConversation,
          lastChat: newMessage,
          unreadCount:
            isSender || isActiveConversation
              ? currentConversation.unreadCount
              : currentConversation.unreadCount + 1,
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
  }, [conversationID, user._id]);

  useEffect(() => {
    function handleMessagesRead(data) {
      if (String(data.readerId) !== String(user._id)) {
        return;
      }

      setConversation((prev) =>
        prev.map((item) =>
          String(item._id) === String(data.conversationId)
            ? { ...item, unreadCount: 0 }
            : item,
        ),
      );
    }

    socket.on("messagesRead", handleMessagesRead);

    return () => {
      socket.off("messagesRead", handleMessagesRead);
    };
  }, [user._id]);

  function handleOpenConversation(conversationId) {
    setConversation((prev) =>
      prev.map((item) =>
        String(item._id) === String(conversationId)
          ? { ...item, unreadCount: 0 }
          : item,
      ),
    );

    navigate(`/chat/${conversationId}`);
  }

  const handleConversationRead = useCallback((conversationId) => {
    setConversation((prev) =>
      prev.map((item) =>
        String(item._id) === String(conversationId)
          ? { ...item, unreadCount: 0 }
          : item,
      ),
    );
  }, []);

  const conversationFilter = useMemo(() => {
    return conversation.filter((item) => {
      const other = item.participants.find(
        (participant) => String(participant._id) !== String(user._id),
      );

      return (
        item.lastChat !== null &&
        other?.nama?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [conversation, search, user._id]);

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
        <div
          className={`${isOpenChat ? "hidden" : "w-full"} lg:block lg:w-3/12 px-1 min-h-0`}
        >
          <div className="p-3 bg-white my-1 flex justify-center items-center h-20 rounded">
            <Input
              placeholder={"Cari nama..."}
              className={"rounded-xl p-3"}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 h-full overflow-auto">
            {conversationFilter.map((e) => {
              const other = e.participants.find(
                (cari) => String(cari._id) !== String(user._id),
              );

              return (
                <CardChat
                  key={e._id}
                  nama={other.nama}
                  pesan={e.lastChat.text}
                  jumlahPesan={e.unreadCount}
                  onClick={() => handleOpenConversation(e._id)}
                />
              );
            })}
          </div>
        </div>

        <div
          className={`${isOpenChat ? "w-full" : "hidden"} lg:block lg:w-9/12 p-1 lg:pl-0 lg:pb-0 min-h-0`}
        >
          <ChatRoom onConversationRead={handleConversationRead} />
        </div>
      </div>
    </div>
  );
}
