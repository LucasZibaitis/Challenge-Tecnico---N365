"use client";
import { useState, useEffect } from "react";

export default function LoginForm({ setRegisterClicked, registerClicked }) {
  return (
    <div class="w-1/4 h-3/5 border bg-[#6366f1] rounded-3xl flex flex-col items-center py-10 gap-10">
      <div class="flex flex-col items-center gap-2 py-8">
        <h1 class="text-5xl text-white font-semibold">The Agency</h1>
        <h2 class="text-2xl text-white">Challenge Técnico </h2>
      </div>
      <form class="flex flex-col items-center gap-4 w-full">
        <input
          class="rounded-full w-3/4 h-12 px-4 bg-[#c7d2fe]"
          placeholder="Email"
        ></input>
        <input
          class="rounded-full w-3/4 h-12 px-4 bg-[#c7d2fe]"
          placeholder="Contraseña"
        ></input>
        <button class="rounded-full w-3/4 h-12 px-4 bg-[white] hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300">
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
