"use client";
import { useState, useEffect } from "react";

export default function RegisterForm({ setRegisterClicked, registerClicked }) {
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
        ></input>
        <input
          class="rounded-full h-12 px-4 bg-[#c7d2fe]"
          placeholder="Apellido"
        ></input>
        <input
          class="rounded-full h-12 px-4 bg-[#c7d2fe] col-span-2"
          placeholder="Email"
        ></input>
        <input
          class="rounded-full  h-12 px-4 bg-[#c7d2fe] col-span-2"
          placeholder="Contraseña"
        ></input>
        <button class="rounded-full h-12 col-span-2 px-4 bg-[white] hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300">
          Registrarse
        </button>
      </form>
      <div class="w-3/4 flex items-end justify-end pt-8">
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
