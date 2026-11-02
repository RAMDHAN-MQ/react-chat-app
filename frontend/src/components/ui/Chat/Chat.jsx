import { useOutletContext } from "react-router-dom";
import ChatBubble from "./ChatBubble";

export default function Chat({ message }) {
  const { user } = useOutletContext();
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-scroll bg-white p-3 rounded">
      {message.map((e) => {
        const sender = user._id === e.sender._id;
        return <ChatBubble key={e._id} saya={sender} text={e.text} />;
      })}
    </div>
  );
}
