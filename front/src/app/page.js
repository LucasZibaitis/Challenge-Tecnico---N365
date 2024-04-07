"use client";
import Image from "next/image";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { useEffect, useState } from "react";

export default function Landing() {
  const [registerClicked, setRegisterClicked] = useState(false);

  return (
    <main class="h-screen flex items-center justify-center">
      {registerClicked ? (
        <RegisterForm
          registerClicked={registerClicked}
          setRegisterClicked={setRegisterClicked}
        />
      ) : (
        <LoginForm
          registerClicked={registerClicked}
          setRegisterClicked={setRegisterClicked}
        />
      )}
    </main>
  );
}
