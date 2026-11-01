import CardChat from "../../components/ui/Card/CardChat";
import Input from "../../components/ui/Input/Input";
import Navbar from "../../components/ui/Nav/Navbar";
import InfoChatTop from "../../components/ui/Chat/ChatTop";
import Chat from "../../components/ui/Chat/Chat";
import ChatSend from "../../components/ui/Chat/ChatSend";
import NavbarDropMenu from "../../components/ui/Nav/NavbarDropMenu";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function ChatPage() {
  const { user, setUser } = useOutletContext();

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

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
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
            <CardChat />
          </div>
        </div>

        <div className="w-9/12 pt-1 pr-1 min-h-0">
          <div className="h-full flex flex-col justify-between">
            <InfoChatTop />
            <Chat />
            <ChatSend />
          </div>
        </div>
      </div>
    </div>
  );
}
