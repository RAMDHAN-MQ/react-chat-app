import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "./api/axios";
import toast from "react-hot-toast";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("/chats/", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(res.data);
        } catch (error) {
          toast.error(error);
          localStorage.removeItem("token");
        }
      }

      setIsLoading(false);
    }
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col justify-center items-center gap-4 text-blue-500">
        <svg className="size-16 animate-spin border-t-2 border-blue-500 rounded-full"></svg>{" "}
        Loading
      </div>
    );
  }

  if (user && ["/", "/register"].includes(location.pathname)) {
    return <Navigate to={"/chat"} replace />;
  }

  if (!user && location.pathname === "/chat") {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Toaster />
      <Outlet context={{ user, setUser }} />
    </>
  );
}
