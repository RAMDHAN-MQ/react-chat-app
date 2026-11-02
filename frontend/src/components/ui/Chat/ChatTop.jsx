export default function ChatTop({ nama, username }) {
  return (
    <div className="p-3 bg-white flex justify-between items-center min-h-[10vh] mb-1 rounded">
      <div className="flex items-center gap-4">
        <button className="flex items-center rounded-full overflow-hidden ring ring-blue-500 ring-offset-1">
          <img
            src="https://picsum.photos/200"
            alt="foto profile"
            className="size-10"
          />
        </button>
        <div className="flex flex-col">
          <span className="text-black">{nama}</span>
          <span className="text-gray-400 text-xs">@{username}</span>
        </div>
      </div>
    </div>
  );
}
