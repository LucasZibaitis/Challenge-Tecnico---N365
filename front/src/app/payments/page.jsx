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

  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;

  console.log(indexOfLastPayment);

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

  const deletePayment = async (id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      await axios.delete(
        `http://localhost:3001/deletePayment?id=${id}`,
        config
      );
      fetchPayments();
    } catch (error) {}
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
      filteredPayments = filteredPayments.filter(
        (payment) => payment.type === filterType
      );
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
      return (
        <div
          key={payment.id}
          class="flex flex-col justify-center border-b-2 border-[#6366f1] w-full h-20 px-6 "
        >
          <div class="flex justify-between">
            <h1 class="text-xs">{payment.date}</h1>
            <h1
              onClick={() => {
                deletePayment(payment.id);
              }}
              class="text-xs text-red-500 font-bold cursor-pointer hover:scale-125 transition-all duration-300"
            >
              X
            </h1>
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
                {totalPayments ? (
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
    </ProtectedRoute>
  );
}
