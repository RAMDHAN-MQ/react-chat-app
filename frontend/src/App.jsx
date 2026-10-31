import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "./api/axios";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await api.get("auth/chat", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
        }
      }
    }
    fetchUser();
  }, []);

  return (
    <>
      <Toaster />
      <Outlet context={{ user, setUser }} />
    </>
  );
}
