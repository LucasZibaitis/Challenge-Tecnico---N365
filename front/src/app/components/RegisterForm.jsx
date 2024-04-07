"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function RegisterForm({ setRegisterClicked, registerClicked }) {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      await axios
        .post("http://localhost:3001/postUser", userData)
        .then((response) => console.log(response));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div class="w-1/4 h-3/5 border bg-[#6366f1] rounded-3xl flex flex-col items-center pt-10">
      <div class="flex flex-col items-center gap-2 py-8">
        <h1 class="text-5xl text-white font-semibold">The Agency</h1>
        <h2 class="text-2xl text-white">Challenge Técnico </h2>
      </div>
      <form class="grid grid-cols-2 gap-4 w-3/4 pt-10">
        <input
          class="rounded-full h-12 px-4 bg-[#c7d2fe]"
          placeholder="Nombre"
          name="name"
          onChange={handleChange}
        ></input>
        <input
          class="rounded-full h-12 px-4 bg-[#c7d2fe]"
          placeholder="Apellido"
          onChange={handleChange}
          name="lastName"
        ></input>
        <input
          class="rounded-full h-12 px-4 bg-[#c7d2fe] col-span-2"
          placeholder="Email"
          name="mail"
          onChange={handleChange}
        ></input>
        <div className="flex justify-between gap-4 col-span-2">
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe]"
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
