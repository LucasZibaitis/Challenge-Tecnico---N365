"use client";
import { useRouter } from "next/navigation";

export default function RegisterPayment() {
  const router = useRouter();
  return (
    <main class="flex flex-col items-center justify-center h-screen gap-4">
      <div class="flex flex-col items-center border-4 border-black w-1/3 h-1/2 rounded-md">
        <h1 class="text-5xl py-4">Registrar Pagos</h1>
        <form class="flex flex-col items-center">
          <label>Monto</label>
          <input class="border-black rounded-md border-2 px-2 w-full"></input>
          <label>Tipo de Pago</label>
          <select class="border-black rounded-md border-2 px-2 w-full">
            <option></option>
            <option></option>
            <option></option>
            <option></option>
            <option></option>
          </select>
          <label>Destinatario</label>
          <input class="border-black rounded-md border-2 px-2 w-full"></input>
          <label>Fecha</label>
          <input
            type="date"
            class="border-black rounded-md border-2 px-2 w-full"
          ></input>
          <button
            type="submit"
            class="mt-10 rounded-md border-2 border-black w-3/5"
          >
            Registrar Pago
          </button>
        </form>
      </div>
      <div class="w-1/3 flex items-center justify-around gap-4">
        <button
          class="border-black rounded-md border-2 w-48 font-semibold"
          onClick={() => {
            router.push("/home");
          }}
        >
          Volver al inicio
        </button>
        <button
          class="border-black rounded-md border-2 w-48 font-semibold"
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
