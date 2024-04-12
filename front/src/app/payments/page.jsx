"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LogOutButton from "../components/LogOutButton";
import { format } from "date-fns";
import formatDate from "../../../public/formatDate";
import { CSVLink, CSVDownload } from "react-csv";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage, setPaymentsPerPage] = useState(8);
  const [filterType, setFilterType] = useState("Todos");
  const [filterDate, setFilterDate] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [inputRecipient, setInputRecipient] = useState("");
  const [sortOption, setSortOption] = useState("masReciente");
  const router = useRouter();
  const csvHeaders = [
    { label: "Fecha", key: "date" },
    { label: "Destinatario", key: "recipient" },
    { label: "Tipo de Pago", key: "type" },
    { label: "Monto", key: "amount" },
  ];
  const [paymentToDelete, setPaymentToDelete] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isRenderLoading, setIsRenderLoading] = useState(true);

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;

  const fetchPayments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      await axios
        .get(
          `https://the-agency-ct.onrender.com/getPaymentsById?userId=${userId}`,
          config
        )
        .then((response) => setPayments(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setIsRenderLoading(false);
      setIsDeleteLoading(false);
    }
  };

  const deletePayment = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      setIsDeleteLoading(true);
      await axios
        .delete(
          `https://the-agency-ct.onrender.com/deletePayment?id=${id}`,
          config
        )
        .then((response) => {
          fetchPayments();
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleFilterChange = (e) => {
    const { value, name } = e.target;
    if (name === "type") {
      setFilterType(value);
    }
    if (name === "date") {
      if (value === "") {
        setFilterDate("");
        setSelectedDate("");
      } else {
        setSelectedDate(value);
        setFilterDate(formatDate(value));
      }
    }
    if (name === "recipient") {
      setInputRecipient(value);
    }
    if (name === "sort") {
      setSortOption(value);
    }
    setCurrentPage(1);
  };

  const applyFiltersAndSort = () => {
    let filteredPayments = [...payments];
    if (filterType !== "Todos") {
      if (filterType === "otro") {
        const allowedTypes = [
          "Efectivo",
          "Tarjeta de Débito",
          "Tarjeta de Crédito",
          "Depósito",
          "Transferencia",
        ];
        filteredPayments = filteredPayments.filter(
          (payment) => !allowedTypes.includes(payment.type)
        );
      } else {
        filteredPayments = filteredPayments.filter(
          (payment) => payment.type === filterType
        );
      }
    }
    if (filterDate) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.date === filterDate
      );
    }

    if (inputRecipient) {
      filteredPayments = filteredPayments.filter((payment) =>
        payment.recipient.toLowerCase().includes(inputRecipient.toLowerCase())
      );
    }

    filteredPayments.forEach((payment) => {
      payment.parsedDate = new Date(formatDate(payment.date));
    });

    if (sortOption === "masReciente") {
      filteredPayments.sort((a, b) => b.parsedDate - a.parsedDate);
    } else if (sortOption === "masAntigua") {
      filteredPayments.sort((a, b) => a.parsedDate - b.parsedDate);
    } else if (sortOption === "mayorMonto") {
      filteredPayments.sort(
        (a, b) => parseFloat(b.amount) - parseFloat(a.amount)
      );
    } else if (sortOption === "menorMonto") {
      filteredPayments.sort(
        (a, b) => parseFloat(a.amount) - parseFloat(b.amount)
      );
    }

    filteredPayments.forEach((payment) => {
      delete payment.parsedDate;
    });

    return filteredPayments;
  };

  const filteredAndSortedPayments = applyFiltersAndSort();
  const totalPayments = filteredAndSortedPayments.length;
  const totalPages = Math.ceil(totalPayments / paymentsPerPage);

  const renderPayments = () => {
    const paginatedPayments = filteredAndSortedPayments.slice(
      indexOfFirstPayment,
      indexOfLastPayment
    );
    return paginatedPayments.map((payment) => {
      const formattedAmount = parseFloat(payment.amount).toLocaleString(
        "es-AR",
        {
          minimumFractionDigits: 2,
        }
      );
      return paymentToDelete === payment.id ? (
        <div
          key={payment.id}
          class="flex flex-col  items-center justify-center border-b-2 border-[#6366f1] w-full h-20 px-6 "
        >
          {isDeleteLoading ? (
            <div class="flex text-center items-center gap-4">
              <h1 class="text-[#6366f1] font-semibold">Eliminando pago</h1>
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-[#6366f1] animate-spin fill-[white]"
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
            </div>
          ) : (
            <div class="flex flex-col gap-2 items-center justify-center w-full h-full">
              <h1 class="text-[#6366f1] font-semibold">
                ¿Seguro que quieres eliminar este pago?
              </h1>
              <div class="flex items-center justify-center gap-10 w-full">
                <button
                  onClick={() => {
                    deletePayment(payment.id);
                  }}
                  class="border-2 border-[#6366f1] text-[#6366f1] rounded-full w-1/5 hover:font-bold hover:bg-[#6366f1] hover:text-white transition-all duration-300"
                >
                  Si
                </button>
                <button
                  onClick={() => {
                    setPaymentToDelete("");
                  }}
                  class="border-2 border-[#6366f1] text-[#6366f1] rounded-full  w-1/5 hover:font-bold hover:bg-[#6366f1] hover:text-white transition-all duration-300"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          key={payment.id}
          class="flex flex-col justify-center border-b-2 border-[#6366f1] w-full h-20 px-6 "
        >
          <div class="flex justify-between">
            <h1 class="text-xs">{payment.date}</h1>
            <img
              src="./crossIcon.svg"
              width={15}
              onClick={() => {
                setPaymentToDelete(payment.id);
              }}
              class="cursor-pointer hover:scale-110 transition-all duration-300"
            />
          </div>
          <h1 class="font-bold">{payment.recipient}</h1>
          <div class="flex justify-between">
            <h1>{payment.type}</h1>
            <h1 class="font-bold">${formattedAmount}</h1>
          </div>
        </div>
      );
    });
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setFilterType("Todos");
    setFilterDate("");
    setSelectedDate("");
    setInputRecipient("");
    setSortOption("masReciente");
  };

  return (
    <ProtectedRoute>
      <main class="flex flex-col items-center justify-center h-screen gap-4">
        <div class="md:w-3/5 lg:w-2/5 flex items-center justify-between">
          <h1 class="text-5xl text-[#6366f1] font-semibold tracking-tighter">
            Historial de Pagos
          </h1>
          <LogOutButton />
        </div>
        <div class="flex md:w-3/5 lg:w-2/5 lg:h-5/6 rounded-3xl bg-[#6366f1]">
          <div class="w-1/2 flex flex-col items-center gap-4 py-6">
            <div class="flex flex-col w-4/5 gap-1">
              <label class="text-white">Buscar por destinatario</label>
              <input
                name="recipient"
                class=" rounded-md  px-2 h-8 text-[#6366f1] outline-current"
                onChange={handleFilterChange}
                value={inputRecipient}
              ></input>
            </div>
            <div class="flex flex-col w-4/5 gap-1">
              <label class="text-white">Ordenar por</label>
              <select
                name="sort"
                class="rounded-md  px-2 h-8 text-sm text-[#6366f1] outline-current"
                onChange={handleFilterChange}
                value={sortOption}
              >
                <option value="masReciente">Fecha: más reciente</option>
                <option value="masAntigua">Fecha: más antigua</option>
                <option value="mayorMonto">Monto: más alto</option>
                <option value="menorMonto">Monto: más bajo</option>
              </select>
            </div>
            <div class="flex flex-col w-4/5 gap-1">
              <label class="text-white">Filtrar por Tipo de Pago</label>
              <select
                name="type"
                class="rounded-md px-2 h-8 text-sm text-[#6366f1] outline-current"
                onChange={handleFilterChange}
                value={filterType}
              >
                <option value="Todos">Todos</option>
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
                name="date"
                type="date"
                class="rounded-md  px-2 h-8 text-[#6366f1] text-sm outline-current"
                value={selectedDate}
                onChange={handleFilterChange}
              ></input>
            </div>
            <div class="flex flex-col gap-2 w-4/5 h-full justify-between">
              <div>
                <button
                  onClick={handleClearFilters}
                  class="text-[white] border mt-4 font-semibold rounded-full  w-40 h-10 hover:bg-[white] hover:border hover:text-[#6366f1] hover:font-bold transition-all duration-300"
                >
                  Eliminar filtros
                </button>
              </div>
              <div>
                <button class="text-[white] border mt-4 font-semibold rounded-full  w-40 h-10 hover:bg-[white] hover:border hover:text-[#6366f1] hover:font-bold transition-all duration-300">
                  <CSVLink
                    data={payments}
                    filename={"historialDePagos.csv"}
                    separator={";"}
                    headers={csvHeaders}
                  >
                    {" "}
                    Exportar a CSV
                  </CSVLink>
                </button>
              </div>
            </div>
          </div>
          <div class="w-2/3 flex flex-col h-full justify-center gap-1 py-6">
            <label class="text-white">Resultados</label>
            <div class="w-11/12 h-full bg-white rounded-lg flex flex-col">
              <div class="h-full">
                {isRenderLoading ? (
                  <div class="h-full flex flex-col items-center justify-center gap-4">
                    <h1 class="text-lg text-[#6366f1]">Cargando pagos...</h1>
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 text-[#6366f1] animate-spin fill-[white]"
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
                  </div>
                ) : totalPayments ? (
                  renderPayments()
                ) : (
                  <div class="h-full flex items-center justify-center">
                    <h1 class="text-lg text-[#6366f1]">
                      No se encontraron pagos.
                    </h1>
                  </div>
                )}
              </div>
              <div class="flex h-12 items-center justify-around border-[#6366f1]">
                <div class="flex items-center justify-center w-full">
                  {currentPage === 1 ? null : (
                    <img
                      src="./arrowLeft.svg"
                      width={40}
                      class="hover:scale-110 transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        setCurrentPage(
                          currentPage > 1 ? currentPage - 1 : currentPage
                        )
                      }
                    />
                  )}
                </div>
                <div class="flex items-center justify-center w-full">
                  <h1 class="text-lg font-bold text-[#6366f1]">
                    {currentPage}
                  </h1>
                </div>
                <div class="flex items-center justify-center w-full">
                  {totalPages > 1 && currentPage < totalPages && (
                    <img
                      src="./arrowRight.svg"
                      width={40}
                      class="hover:scale-110 transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        setCurrentPage(
                          currentPage < totalPages
                            ? currentPage + 1
                            : currentPage
                        )
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="md:w-3/5 lg:w-2/5 flex items-center justify-between gap-4">
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
    </ProtectedRoute>
  );
}
