"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function RegisterPayment() {
  const [otroSelected, setOtroSelected] = useState(false);
  const [otro, setOtro] = useState("");
  const router = useRouter();

  const handleSelectChange = (e) => {
    const { value } = e.target;
    if (value === "otro") {
      setOtroSelected(true);
    } else {
      setOtroSelected(false);
    }
  };

  return (
    <main class="flex flex-col items-center justify-center h-screen gap-4">
      <h1 class="text-5xl text-[#6366f1] font-semibold">Registrar Pagos</h1>
      <div class="flex flex-col items-center w-1/3 h-1/2 rounded-3xl bg-[#6366f1]">
        <form class="flex flex-col items-center justify-center gap-4 w-full h-full">
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Monto</label>
            <input class=" rounded-md border-2 px-2 w-full h-8"></input>
          </div>
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Tipo de Pago</label>
            <select
              class="rounded-md border-2 px-2 w-full h-8 text-sm"
              onChange={handleSelectChange}
            >
              <option class="text-sm">Seleccionar Tipo de Pago</option>
              <option class="text-sm">Efectivo</option>
              <option class="text-sm">Tarjeta de Débito</option>
              <option class="text-sm">Tarjeta de Crédito</option>
              <option class="text-sm">Transferencia</option>
              <option class="text-sm">Depósito</option>
              <option value="otro" class="text-sm">
                Otro
              </option>
            </select>
            {otroSelected ? (
              <input class=" rounded-md border-2 px-2 w-full h-8" placeholder="Escriba el tipo de pago"></input>
            ) : null}
          </div>
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Destinatario</label>
            <input class=" rounded-md border-2 px-2 w-full h-8"></input>
          </div>
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Fecha</label>
            <input
              type="date"
              class="rounded-md border-2 px-2 w-full h-8"
            ></input>
          </div>
          <button
            type="submit"
            class="text-[#6366f1] font-semibold mt-10 rounded-full border-2 bg-white w-1/3 h-10 hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300"
          >
            Registrar Pago
          </button>
        </form>
      </div>
      <div class="w-1/3 flex items-center justify-between gap-4">
        <button
          class="text-white rounded-full border-2 w-48 h-10 font-semibold bg-[#6366f1] hover:bg-white hover:text-[#6366f1] hover:border-[#6366f1] transition-all duration-300"
          onClick={() => {
            router.push("/home");
          }}
        >
          Volver al inicio
        </button>
        <button
          class="text-white rounded-full border-2 w-48 h-10 font-semibold bg-[#6366f1] hover:bg-white hover:text-[#6366f1] hover:border-[#6366f1] transition-all duration-300"
          onClick={() => {
            router.push("/payments");
          }}
        >
          Historial de pagos
        </button>
      </div>
    </main>
  );
}
