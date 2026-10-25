import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}
