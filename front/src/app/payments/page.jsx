"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LogOutButton from "../components/LogOutButton";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const router = useRouter();

  const fetchPayments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      await axios
        .get(`http://localhost:3001/getPaymentsById?userId=${userId}`, config)
        .then((response) => setPayments(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <main class="flex flex-col items-center justify-center h-screen gap-4">
      <div class="w-2/5 flex items-center justify-between">
        <h1 class="text-5xl text-[#6366f1] font-semibold tracking-tighter">
          Historial de Pagos
        </h1>
        <LogOutButton />
      </div>
      <div class="flex w-2/5 h-5/6 rounded-3xl bg-[#6366f1]">
        <div class="w-1/2 flex flex-col items-center gap-4 py-6">
          <div class="flex flex-col w-4/5 gap-1">
            <label class="text-white">Buscar por destinatario</label>
            <input class=" rounded-md border-2 px-2 h-8"></input>
          </div>
          <div class="flex flex-col w-4/5 gap-1">
            <label class="text-white">Ordenar por</label>
            <select class="rounded-md border-2 px-2 h-8 text-sm text-[#6366f1]">
              <option>Monto: de más bajo a más alto</option>
              <option>Monto: de más alto a más bajo</option>
              <option>Fecha: más reciente</option>
              <option>Fecha: más antigua</option>
            </select>
          </div>
          <div class="flex flex-col w-4/5 gap-1">
            <label class="text-white">Filtrar por Tipo de Pago</label>
            <select class="rounded-md border-2 px-2 h-8 text-sm text-[#6366f1]">
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta de Débito">Tarjeta de Débito</option>
              <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Depósito">Depósito</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div class="flex flex-col w-4/5 gap-1">
            <label class="text-white">Filtrar por Fecha</label>
            <input
              type="date"
              class="rounded-md border-2 px-2 h-8 text-[#6366f1] text-sm"
            ></input>
          </div>
        </div>
        <div class="w-2/3 flex flex-col h-full justify-center gap-1 py-6">
          <label class="text-white">Resultados</label>
          <div class="w-11/12 h-full bg-white rounded-lg flex flex-col">
            <div class="h-full">
              <div class="flex flex-col justify-center border-b-2 border-[#6366f1] w-full h-20 px-6 ">
                <h1 class="text-xs">03/05/2023</h1>
                <h1 class="font-bold">Lucas Zibaitis</h1>
                <div class="flex justify-between">
                  <h1>Efectivo</h1>
                  <h1 class="font-bold">$200.000,00</h1>
                </div>
              </div>
            </div>
            <div class="flex h-12 items-center justify-around border-[#6366f1]">
              <img
                src="./arrowLeft.svg"
                width={40}
                class="hover:scale-110 transition-all duration-300 cursor-pointer"
              />
              <h1 class="text-lg font-bold text-[#6366f1]">1</h1>
              <img
                src="./arrowRight.svg"
                width={40}
                class="hover:scale-110 transition-all duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="w-2/5 flex items-center justify-between gap-4">
        <button
          class="text-white rounded-full w-48 h-10 font-semibold bg-[#6366f1] hover:bg-white hover:text-[#6366f1] hover:border-2 hover:border-[#6366f1] transition-all duration-300"
          onClick={() => {
            router.push("/home");
          }}
        >
          Volver al inicio
        </button>
        <button
          class="text-white rounded-full w-48 h-10 font-semibold bg-[#6366f1] hover:bg-white hover:text-[#6366f1] hover:border-2 hover:border-[#6366f1] transition-all duration-300"
          onClick={() => {
            router.push("/registerPayment");
          }}
        >
          Registrar Pagos
        </button>
      </div>
    </main>
  );
}
