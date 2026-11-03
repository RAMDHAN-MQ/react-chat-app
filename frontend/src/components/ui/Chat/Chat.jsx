import { useOutletContext } from "react-router-dom";
import ChatBubble from "./ChatBubble";

export default function Chat({ message }) {
  const { user } = useOutletContext();
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-scroll bg-white p-3 rounded">
      {message.map((e, i) => {
        const sender = user._id === e.sender._id;
        const tanggal = new Date(e.createdAt);

        const waktu = tanggal.toLocaleString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        const tanggalTampil = tanggal.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        const tanggalSebelumnya =
          i > 0 ? new Date(message[i - 1].createdAt).toDateString() : null;

        const tanggalSekarang = tanggal.toDateString();
        const tanggalBeda = tanggalSekarang !== tanggalSebelumnya;

        return (
          <div key={e._id}>
            {tanggalBeda && (
              <div className="flex justify-center my-3">
                <span className="bg-gray-300 px-3 py-1 rounded-full text-sm">
                  {tanggalTampil}
                </span>
              </div>
            )}
            <ChatBubble
              saya={sender}
              text={e.text}
              waktu={waktu}
              tanggal={tanggal}
            />
          </div>
        );
      })}
    </div>
  );
}
