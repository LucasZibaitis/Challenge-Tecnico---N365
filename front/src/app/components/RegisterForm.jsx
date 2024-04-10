"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import validateRegisterForm from "./validateRegisterForm";

export default function RegisterForm({ setRegisterClicked, registerClicked }) {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [backendError, setBackendError] = useState(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateRegisterForm(userData);
    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post("http://localhost:3001/postUser", userData);
        setRegisterClicked(false);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
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
    <div class="w-1/4 h-3/5 border bg-[#6366f1] rounded-3xl flex flex-col gap- items-center justify-center">
      <div class="flex flex-col items-center gap-2 py-2">
        <h1 class="text-5xl text-white font-semibold">N365</h1>
        <h2 class="text-2xl text-white">Challenge Técnico </h2>
      </div>
      <form class="grid grid-cols-2 gap-4 w-3/4 pt-4">
        <div class="flex flex-col items-end justify-end gap-1">
          {errors.name ? (
            <p class="text-xs text-white font-semibold">{errors.name}</p>
          ) : null}
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
          ></input>
        </div>
        <div class="flex flex-col items-end justify-end gap-1">
          {errors.lastName ? (
            <p class="text-xs font-semibold text-white">{errors.lastName}</p>
          ) : null}
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Apellido"
            onChange={handleChange}
            name="lastName"
          ></input>
        </div>
        <div class="flex flex-col items-end gap-1 col-span-2">
          {errors.mail ? (
            <p class="text-xs font-semibold text-white">{errors.mail}</p>
          ) : null}
          {backendError && (
            <p class="text-xs font-semibold text-white">{backendError}</p>
          )}
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe]  outline-[#6366f1]"
            placeholder="Email"
            name="mail"
            onChange={handleChange}
          ></input>
        </div>
        <div class="flex items-end flex-col gap-1 col-span-2">
          {errors.password ? (
            <p class="text-xs font-semibold text-white">{errors.password}</p>
          ) : null}
          <div class="flex justify-between gap-4 w-full">
            <input
              class="rounded-full h-12 w-full px-4 bg-[#c7d2fe] outline-[#6366f1]"
              placeholder="Contraseña"
              type={hidePassword ? "password" : null}
              onChange={handleChange}
              name="password"
            ></input>
            <button
              class="h-12 w-1/5"
              onClick={(e) => {
                e.preventDefault();
                setHidePassword(!hidePassword);
              }}
            >
              {hidePassword ? (
                <img src="./eyeclosed.svg" width={35} />
              ) : (
                <img src="./eyeopened.svg" width={35} />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          class="rounded-full h-12 col-span-2 px-4 bg-[white] hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300"
        >
          Registrarse
        </button>
      </form>
      <div class="w-3/4 flex flex-col items-center justify-center pt-4">
        <p class="text-white">o</p>
        <button
          class="text-white hover:underline cursor-pointer "
          onClick={() => {
            setRegisterClicked(false);
          }}
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
