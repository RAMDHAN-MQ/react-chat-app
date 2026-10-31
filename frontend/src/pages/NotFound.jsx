import Button from "../components/ui/Button/Button";

export default function NotFound() {
  return (
    <div className="h-screen bg-gray-300 flex justify-center items-center">
      <div className="bg-white p-5 rounded-xl shadow-lg flex flex-col items-center gap-4">
        <span className="text-9xl font-bold">404</span>
        <p className="text-2xl">Halaman yang anda cari tidak ditemukan!</p>
        <Button text={"Kembali"} variant={"primary"} width={"full"} to={'/chat'} />
      </div>
    </div>
  );
}
