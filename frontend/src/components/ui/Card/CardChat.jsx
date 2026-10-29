export default function CardChat({ img, nama, pesan, jam, jumlahPesan }) {
  return (
    <div className="flex items-center justify-between w-full p-3 bg-white hover:bg-gray-100">
      <div className="flex items-center gap-4">
        <button className="flex items-center rounded-full overflow-hidden">
          <img
            src="https://picsum.photos/200"
            alt="foto profile"
            className="size-10"
          />
        </button>

        <div className="flex flex-col justify-between h-full">
          <p className="text-black">Nama</p>
          <p className="text-gray-500">Pesan</p>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className="text-xs">2/12/2026</p>
        <div className="flex justify-end">
          <span className="bg-blue-500 text-white text-xs flex justify-center items-center rounded-full size-6">
            1
          </span>
        </div>
      </div>
    </div>
  );
}
