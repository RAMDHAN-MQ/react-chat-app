export default function ChatBubble({ saya, text, waktu = "00:00" }) {
  return (
    <div className={`flex flex-col ${saya ? "items-end" : "items-start"}`}>
      <div
        className={`bg-blue-500 ${saya ? "rounded-l-xl rounded-br-xl" : "rounded-r-xl rounded-bl-xl"}  px-3 py-2 w-fit text-white mt-2`}
      >
        {text}
      </div>
      <span className="text-xs text-gray-500">{waktu}</span>
    </div>
  );
}
