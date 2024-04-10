"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import validateLoginForm from "./validateLoginForm";

export default function LoginForm({ setRegisterClicked, registerClicked }) {
  const [userData, setUserData] = useState({
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    mail: "",
    password: "",
  });
  const [backendError, setBackendError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLoginForm(userData);
    if (Object.keys(formErrors).length === 0) {
      try {
        await axios
          .post("http://localhost:3001/postLoggedUser", userData)
          .then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userId", response.data.userId);
            if (response.data.accessToken) {
              router.push("/home");
            }
          });
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrors({
            mail: "",
            password: "",
          });
          setBackendError(error.response.data.error);
        } else {
          console.log(error);
        }
      }
    } else {
      setErrors(formErrors);
      return;
    }
  };

  return (
    <div class="w-1/4 h-3/5 border bg-[#6366f1] rounded-3xl flex flex-col items-center py-10 gap-10">
      <div class="flex flex-col items-center gap-2 py-8">
        <h1 class="text-5xl text-white font-semibold">N365</h1>
        <h2 class="text-2xl text-white">Challenge Técnico </h2>
      </div>
      <form class="flex flex-col items-center gap-4 w-full">
        <div class="flex flex-col items-end justify-end w-3/4 gap-1">
          {errors.mail ? (
            <p class="text-xs text-white font-semibold">{errors.mail}</p>
          ) : null}
          {backendError && (
            <p class="text-xs font-semibold text-white">{backendError}</p>
          )}
          <input
            class="rounded-full w-full  h-12 px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Email"
            name="mail"
            onChange={handleChange}
          ></input>
        </div>
        <div class="flex flex-col items-end justify-end w-3/4 gap-1">
          {errors.password ? (
            <p class="text-xs text-white font-semibold">{errors.password}</p>
          ) : null}
          <input
            class="rounded-full w-full h-12 px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
          ></input>
        </div>

        <button
          onClick={handleSubmit}
          class="rounded-full w-3/4 h-12 px-4 bg-[white] hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300"
        >
          Iniciar Sesión
        </button>
      </form>
      <button
        class="text-white hover:underline cursor-pointer"
        onClick={() => {
          setRegisterClicked(true);
        }}
      >
        Crear nueva cuenta<span class=" font-bold"> aquí</span>
      </button>
    </div>
  );
}
