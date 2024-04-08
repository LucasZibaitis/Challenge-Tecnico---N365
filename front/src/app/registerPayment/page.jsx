"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogOutButton from "../components/LogOutButton";
import axios from "axios";

export default function RegisterPayment() {
  const [otroSelected, setOtroSelected] = useState(false);
  const [otro, setOtro] = useState("");
  const [payment, setPayment] = useState({
    amount: null,
    date: "",
    type: "",
    recipient: "",
    userId: localStorage.getItem("userId"),
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    if (value === "otro") {
      setOtroSelected(true);
      setPayment((prevPayment) => ({
        ...prevPayment,
        [name]: value,
      }));
    }
    if (name === "date" && value) {
      const selectedDate = new Date(value);
      const formattedDate = selectedDate.toISOString();
      setPayment((prevPayment) => ({
        ...prevPayment,
        [name]: formattedDate,
      }));
    } else {
      setPayment((prevPayment) => ({
        ...prevPayment,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      await axios
        .post("http://localhost:3001/postPayment", payment, config)
        .then((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main class="flex flex-col items-center justify-center h-screen gap-4">
      <div class="w-1/3 flex items-center justify-between">
        <h1 class="text-5xl text-[#6366f1] font-semibold tracking-tighter">
          Registrar Pagos
        </h1>
        <LogOutButton />
      </div>
      <div class="flex flex-col items-center w-1/3 h-1/2 rounded-3xl bg-[#6366f1]">
        <form class="flex flex-col items-center justify-center gap-4 w-full h-full">
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Monto</label>
            <input
              name="amount"
              class=" rounded-md border-2 px-2 w-full h-8"
              onChange={handleInputChange}
            ></input>
          </div>
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Tipo de Pago</label>
            <select
              class="rounded-md border-2 px-2 w-full h-8 text-sm text-[#6366f1]"
              name="type"
              onChange={handleInputChange}
            >
              <option class="text-sm">Seleccionar Tipo de Pago</option>
              <option value="Efectivo" class="text-sm">
                Efectivo
              </option>
              <option value="Tarjeta de Débito" class="text-sm">
                Tarjeta de Débito
              </option>
              <option value="Tarjeta de Crédito" class="text-sm">
                Tarjeta de Crédito
              </option>
              <option value="Transferencia" class="text-sm">
                Transferencia
              </option>
              <option value="Depósito" class="text-sm">
                Depósito
              </option>
              <option value="otro" class="text-sm">
                Otro
              </option>
            </select>
            {otroSelected ? (
              <input
                name="type"
                class=" rounded-md border-2 px-2 w-full h-8"
                placeholder="Ingrese el tipo de pago"
                onChange={handleInputChange}
              ></input>
            ) : null}
          </div>
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Destinatario</label>
            <input
              name="recipient"
              class=" rounded-md border-2 px-2 w-full h-8"
              onChange={handleInputChange}
            ></input>
          </div>
          <div class="flex flex-col w-1/2 gap-1">
            <label class="text-white">Fecha</label>
            <input
              type="date"
              name="date"
              class="rounded-md border-2 px-2 w-full h-8 text-[#6366f1] text-sm"
              onChange={handleInputChange}
            ></input>
          </div>
          <button
            onClick={(e) => {
              handleSubmit(e);
            }}
            type="submit"
            class="text-[#6366f1] font-semibold mt-10 rounded-full border-2 bg-white w-1/3 h-10 hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300"
          >
            Registrar Pago
          </button>
        </form>
      </div>
      <div class="w-1/3 flex items-center justify-between gap-4">
        <button
          class="text-white rounded-full w-48 h-10 font-semibold bg-[#6366f1] hover:border-2 hover:bg-white hover:text-[#6366f1] hover:border-[#6366f1] transition-all duration-300"
          onClick={() => {
            router.push("/home");
          }}
        >
          Volver al inicio
        </button>
        <button
          class="text-white rounded-full  w-48 h-10 font-semibold bg-[#6366f1] hover:border-2 hover:bg-white hover:text-[#6366f1] hover:border-[#6366f1] transition-all duration-300"
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
