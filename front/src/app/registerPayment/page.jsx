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
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setPayment((prevPayment) => ({
      ...prevPayment,
      userId: userId,
    }));
  }, [completed]);

  const handleRecipientChange = (e) => {
    const { value, name } = e.target;
    const trimmedValue = value.trim();
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
        setIsLoading(true);

        await axios
          .post(
            "https://the-agency-ct.onrender.com/postPayment",
            { ...payment, amount: amountToSend },
            config
          )
          .then((response) => {
            resetForm();
            setIsLoading(false);
            setCompleted(true);
          });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
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
              <div class="w-2/3 flex items-center justify-center text-center mt-10 gap-4">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  type="submit"
                  class={`text-[#6366f1] font-semibold rounded-full bg-white w-1/2 h-10   transition-all duration-300 ${
                    isLoading
                      ? "cursor-default"
                      : "hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold "
                  }`}
                  style={{ opacity: isLoading ? "0.5" : "1" }}
                  disabled={isLoading}
                >
                  Registrar Pago
                </button>
                {isLoading ? (
                  <svg
                    aria-hidden="true"
                    class="w-9 h-9 text-white animate-spin fill-[#6366f1]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                ) : null}
              </div>
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
