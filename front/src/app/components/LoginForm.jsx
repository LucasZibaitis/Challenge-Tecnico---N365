"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import validateLoginForm from "./validateLoginForm";

export default function LoginForm({ setRegisterClicked, registerClicked }) {
  const [userData, setUserData] = useState({
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    mail: "",
    password: "",
  });
  const [backendError, setBackendError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateLoginForm(userData);
    if (Object.keys(formErrors).length === 0) {
      try {
        setIsLoading(true);
        await axios
          .post("https://the-agency-ct.onrender.com/postLoggedUser", userData)
          .then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("userId", response.data.userId);
            if (response.data.accessToken) {
              router.push("/home");
            }
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setErrors({
            mail: "",
            password: "",
          });
          setBackendError(error.response.data.error);
        } else {
          console.log(error);
        }
      }
    } else {
      setErrors(formErrors);
      return;
    }
  };

  return (
    <div class="lg:w-1/4 lg:h-3/5 border bg-[#6366f1] rounded-3xl flex flex-col items-center py-10 gap-10">
      <div class="flex flex-col items-center gap-2 py-8">
        <h1 class="text-5xl text-white font-semibold">N365</h1>
        <h2 class="text-2xl text-white">Challenge Técnico </h2>
      </div>
      <form class="flex flex-col items-center gap-4 w-full">
        <div class="flex flex-col items-end justify-end w-3/4 gap-1">
          {errors.mail ? (
            <p class="text-xs text-white font-semibold">{errors.mail}</p>
          ) : null}
          {backendError && (
            <p class="text-xs font-semibold text-white">{backendError}</p>
          )}
          <input
            class="rounded-full w-full  h-12 px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Email"
            name="mail"
            onChange={handleChange}
          ></input>
        </div>
        <div class="flex flex-col items-end justify-end w-3/4 gap-1">
          {errors.password ? (
            <p class="text-xs text-white font-semibold">{errors.password}</p>
          ) : null}
          <input
            class="rounded-full w-full h-12 px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Contraseña"
            name="password"
            type="password"
            onChange={handleChange}
          ></input>
        </div>

        <button
          onClick={handleSubmit}
          style={{ opacity: isLoading ? "0.5" : "1" }}
          disabled={isLoading}
          class={`rounded-full w-3/4 h-12 px-4 bg-[white] ${
            isLoading
              ? "cursor-default"
              : "hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold"
          }  transition-all duration-300`}
        >
          Iniciar Sesión
        </button>
      </form>
      {isLoading ? (
        <div>
          {" "}
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-[white] animate-spin fill-[#6366f1]"
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
        <button
          class="text-white hover:underline cursor-pointer"
          onClick={() => {
            setRegisterClicked(true);
          }}
        >
          Crear nueva cuenta<span class=" font-bold"> aquí</span>
        </button>
      )}
    </div>
  );
}
