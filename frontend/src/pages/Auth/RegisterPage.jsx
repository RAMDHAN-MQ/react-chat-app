import { useState } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import InputAuth from "../../components/ui/Input/InputAuth";

export default function RegisterPage() {
  const [value, setValue] = useState({
    nama: "",
    email: "",
    password: "",
  });

  return (
    <CardAuth type={"Register"}>
      <InputAuth
        type={"text"}
        placeholder={"Masukkan nama anda..."}
        value={value.nama}
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
        onChange={(e) =>
          setValue({
            ...value,
            password: e.target.value,
          })
        }
      />
    </CardAuth>
  );
}
