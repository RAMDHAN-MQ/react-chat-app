import { Search, X } from "lucide-react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../../api/axios";

export default function ModalNewChat({ setIsNewChat, userLogin }) {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  async function handleCariUsername(e) {
    e.preventDefault();
    setList([]);

    try {
      const response = await api.post("/users/", {
        userLogin: userLogin,
        username: value,
      });

      setList(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function handleCreateConversation(userParticipant) {
    try {
      await api.post("/conversation/", {
        participant: userParticipant,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="fixed left-0 top-0 z-10 w-full h-full bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
      <div className="bg-white min-w-[50%] rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-blue-500 p-5 text-white">
          <span className="text-xl">Pesan Baru</span>
          <Button
            isIconOnly={true}
            variant={"primary"}
            onClick={() => setIsNewChat(false)}
          >
            <X />
          </Button>
        </div>

        <form
          onSubmit={(e) => handleCariUsername(e)}
          className="bg-white p-5 flex justify-center items-center gap-3"
        >
          <Input
            placeholder={"Cari username..."}
            className={"px-3 py-2"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required={true}
          />
          <Button isIconOnly={true} variant={"primary"} type={"submit"}>
            <Search size={30} />
          </Button>
        </form>

        {list.length > 0 && (
          <div className="min-h-0 max-h-80 overflow-auto overflow-x-hidden">
            {list.map((e) => (
              <div
                key={e._id}
                className="p-5 border-t-2 border-t-gray-300 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleCreateConversation(e._id)}
              >
                <div className="flex items-center gap-2">
                  <button className="flex items-center rounded-full overflow-hidden ring ring-blue-500 ring-offset-1">
                    <img
                      src="https://picsum.photos/200"
                      alt="foto profile"
                      className="size-10"
                    />
                  </button>
                  <p>
                    {e.nama}@<span className="text-gray-400">{e.username}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
