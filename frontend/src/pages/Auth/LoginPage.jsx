import { useState } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import InputAuth from "../../components/ui/Input/InputAuth";
import toast from "react-hot-toast";
import api from "../../api/axios.js";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function LoginPage() {
  const [value, setValue] = useState({
    username: "",
    password: "",
  });
  const { setUser } = useOutletContext();
  const navigate = useNavigate();

  async function handelLogin(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        username: value.username,
        password: value.password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      toast.success("Berhasil Login");
      navigate("/chat");
    } catch (error) {
      const pesan = error.response.data.message;
      toast.error(pesan);
    }
  }

  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <CardAuth type={"Login"} onSubmit={handelLogin}>
        <InputAuth
          type={"text"}
          placeholder={"Masukkan username anda..."}
          value={value.username}
          required={true}
          onChange={(e) =>
            setValue({
              ...value,
              username: e.target.value,
            })
          }
        />
        <InputAuth
          type={"password"}
          placeholder={"Masukkan password anda..."}
          value={value.password}
          required={true}
          onChange={(e) =>
            setValue({
              ...value,
              password: e.target.value,
            })
          }
        />
      </CardAuth>
    </div>
  );
}
