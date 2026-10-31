import { useState } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import InputAuth from "../../components/ui/Input/InputAuth";
import api from "../../api/axios.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [value, setValue] = useState({
    nama: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  async function handleDataBaru(event) {
    event.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        nama: value.nama,
        email: value.email,
        password: value.password,
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <CardAuth type={"Register"} onSubmit={handleDataBaru}>
        <InputAuth
          type={"text"}
          placeholder={"Masukkan nama anda..."}
          value={value.nama}
          required={true}
          onChange={(e) =>
            setValue({
              ...value,
              nama: e.target.value,
            })
          }
        />
        <InputAuth
          type={"email"}
          placeholder={"Masukkan email anda..."}
          value={value.email}
          required={true}
          onChange={(e) =>
            setValue({
              ...value,
              email: e.target.value,
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
