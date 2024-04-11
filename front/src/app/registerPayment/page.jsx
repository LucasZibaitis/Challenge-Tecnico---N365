"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LogOutButton from "../components/LogOutButton";
import axios from "axios";
import formatDate from "../../../public/formatDate";
import validatePaymentForm from "./validatePaymentForm.js";
import ProtectedRoute from "../components/ProtectedRoute";

export default function RegisterPayment() {
  const [otroSelected, setOtroSelected] = useState(false);
  const [payment, setPayment] = useState({
    amount: "",
    date: "",
    type: "initial",
    recipient: "",
    userId: "",
  });
  const [errors, setErrors] = useState({
    amount: "",
    date: "",
    type: "",
    recipient: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedOtroType, setSelectedOtroType] = useState("");
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setPayment((prevPayment) => ({
      ...prevPayment,
      userId: userId,
    }));
  }, []);

  const handleRecipientChange = (e) => {
    const { value, name } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      recipient: value,
    }));
  };

  const handleAmountChange = (e) => {
    const { value, name } = e.target;
    const unformattedValue = value.replace(/\./g, "");
    const formattedValue = unformattedValue.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      "."
    );
    setPayment((prevPayment) => ({
      ...prevPayment,
      amount: formattedValue,
    }));
  };

  const handleDateChange = (e) => {
    const { value, name } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      date: formatDate(value),
    }));
    setSelectedDate(value);
  };

  const handleTypeChange = (e) => {
    const { value, name } = e.target;
    if (value === "Otro") {
      setOtroSelected(true);
      setPayment((prevPayment) => ({
        ...prevPayment,
        type: "Otro",
      }));
      return;
    } else {
      setOtroSelected(false);
      setPayment((prevPayment) => ({
        ...prevPayment,
        type: value,
      }));
    }
  };

  const handleInputOtroTypeChange = (e) => {
    const { value, name } = e.target;
    setSelectedOtroType(value);
    setPayment((prevPayment) => ({
      ...prevPayment,
      type: value,
    }));
  };

  const resetForm = () => {
    setPayment({
      amount: "",
      date: "",
      type: "initial",
      recipient: "",
      userId: "",
    });
    setErrors({
      amount: "",
      date: "",
      type: "",
      recipient: "",
    });
    setOtroSelected(false);
    setSelectedDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountWithoutDots = payment.amount
      .replace(/\./g, "")
      .replace(/^0+/, "");
    const amountToSend = amountWithoutDots.replace(/,/g, ".");

    const formErrors = validatePaymentForm({
      ...payment,
      amount: amountToSend,
    });

    if (Object.keys(formErrors).length === 0) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const config = { headers: { Authorization: `Bearer ${accessToken}` } };

        await axios
          .post(
            "https://the-agency-ct.onrender.com/postPayment",
            { ...payment, amount: amountToSend },
            config
          )
          .then((response) => {
            resetForm();
            setCompleted(true);
            console.log(response);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors(formErrors);
      return;
    }
  };

  return (
    <ProtectedRoute>
      <main class="flex flex-col items-center justify-center h-screen gap-4">
        <div class="md:w-2/4 lg:w-1/3 flex items-center justify-between">
          <h1 class="text-5xl text-[#6366f1] font-semibold tracking-tighter">
            Registrar Pagos
          </h1>
          <LogOutButton />
        </div>
        <div class="flex flex-col items-center md:w-2/4 lg:w-1/3 md:h-3/5 lg:h-1/2 rounded-3xl bg-[#6366f1]">
          {completed ? (
            <div class="w-full h-full flex flex-col items-center justify-center">
              <h1 class="text-2xl text-white">Pago registrado exitosamente.</h1>
              <button
                onClick={() => {
                  setCompleted(false);
                }}
                class="text-[#6366f1] font-semibold mt-10 rounded-full bg-white w-1/3 h-10 hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300"
              >
                Registrar otro pago
              </button>
            </div>
          ) : (
            <form class="flex flex-col items-center justify-center gap-4 w-full h-full">
              <div class="flex flex-col w-1/2 gap-1 relative">
                <div class="flex items-center justify-between">
                  <label class="text-white">Monto</label>
                  {errors.amount ? (
                    <p class="text-xs text-white font-semibold">
                      {errors.amount}
                    </p>
                  ) : null}
                </div>
                <div class="absolute inset-y-11 left-0 flex items-center pl-3">
                  <span class="text-[#6366f1]">$</span>
                </div>
                <input
                  name="amount"
                  class="text-[#6366f1] rounded-md px-2 w-full h-8 outline-current pl-7"
                  onChange={handleAmountChange}
                  value={payment.amount}
                ></input>
              </div>
              <div class="flex flex-col w-1/2 gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-white">Tipo de Pago</label>
                  {errors.type ? (
                    <p class="text-xs text-white font-semibold text-right">
                      {errors.type}
                    </p>
                  ) : null}
                </div>
                <select
                  class="rounded-md  px-2 w-full h-8 text-sm text-[#6366f1] outline-current"
                  name="type"
                  onChange={handleTypeChange}
                  value={payment.type === "initial" ? payment.type : null}
                >
                  <option value="initial" selected class="text-sm">
                    Seleccionar Tipo de Pago
                  </option>
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
                  <option value="Otro" class="text-sm">
                    Otro
                  </option>
                </select>
                {otroSelected ? (
                  <input
                    name="otroType"
                    class=" rounded-md  px-2 w-full h-8 outline-current text-[#6366f1]"
                    placeholder="Ingrese el tipo de pago"
                    onChange={handleInputOtroTypeChange}
                  ></input>
                ) : null}
              </div>
              <div class="flex flex-col w-1/2 gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-white">Destinatario</label>
                  {errors.recipient ? (
                    <p class="text-xs text-white font-semibold text-right">
                      {errors.recipient}
                    </p>
                  ) : null}
                </div>
                <input
                  name="recipient"
                  class="text-[#6366f1]  rounded-md  px-2 w-full h-8 outline-current"
                  onChange={handleRecipientChange}
                  value={payment.recipient}
                ></input>
              </div>
              <div class="flex flex-col w-1/2 gap-1">
                <div class="flex items-center justify-between">
                  <label class="text-white">Fecha</label>
                  {errors.date ? (
                    <p class="text-xs text-white font-semibold">
                      {errors.date}
                    </p>
                  ) : null}
                </div>
                <input
                  type="date"
                  name="date"
                  class="rounded-md px-2 w-full h-8 text-[#6366f1] text-sm outline-current"
                  onChange={handleDateChange}
                  value={selectedDate}
                ></input>
              </div>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                type="submit"
                class="text-[#6366f1] font-semibold mt-10 rounded-full bg-white w-1/3 h-10 hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold transition-all duration-300"
              >
                Registrar Pago
              </button>
            </form>
          )}
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
    </ProtectedRoute>
  );
}
