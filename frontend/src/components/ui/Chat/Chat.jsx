import ChatBubble from "./ChatBubble";

export default function Chat({ message }) {
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-scroll bg-white p-3 rounded">
      <ChatBubble saya={true} chat={"halo"} waktu={"12:11"} />
      <ChatBubble saya={false} chat={"halo"} waktu={"13:22"} />
      <ChatBubble saya={true} chat={"halo"} waktu={"15:01"} />
      <ChatBubble saya={false} chat={"halo"} waktu={"16:22"} />
      <ChatBubble saya={true} chat={"halo"} waktu={"18:23"} />
    </div>
  );
}
