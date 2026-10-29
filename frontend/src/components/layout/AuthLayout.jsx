import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export default function AuthLayout() {
  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <Toaster />
      <Outlet />
    </div>
  );
}
