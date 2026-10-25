import { useState } from "react";
import CardAuth from "../../components/ui/Card/CardAuth";
import InputAuth from "../../components/ui/Input/InputAuth";

export default function LoginPage() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  return (
    <CardAuth type={"Login"}>
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
