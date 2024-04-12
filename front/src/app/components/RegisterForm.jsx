"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import validateRegisterForm from "./validateRegisterForm";

export default function RegisterForm({ setRegisterClicked, registerClicked }) {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastName: "",
    mail: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const [backendError, setBackendError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;

    if (name === "password") {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
      return;
    } else {
      const trimmedValue = value.trim();
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: trimmedValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateRegisterForm(userData);
    if (Object.keys(formErrors).length === 0) {
      try {
        setIsLoading(true);
        await axios
          .post("https://the-agency-ct.onrender.com/postUser", userData)
          .then((response) => {
            setRegisterClicked(false);
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
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
    <div class="md:w-2/4 lg:w-1/4 md:h-4/5 lg:h-3/5 border rounded-3xl flex flex-col items-center justify-center bg-[#6366f1]">
      <div class="flex flex-col items-center gap-2 md:py-10 lg:py-2">
        <h1 class="text-5xl text-white font-semibold">N365</h1>
        <h2 class="text-2xl text-white">Challenge Técnico </h2>
      </div>
      <form class="grid grid-cols-2 gap-4 w-3/4 pt-4">
        <div class="flex flex-col items-end justify-end gap-1">
          {errors.name ? (
            <p class="text-xs text-white font-semibold">{errors.name}</p>
          ) : null}
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Nombre"
            name="name"
            onChange={handleChange}
          ></input>
        </div>
        <div class="flex flex-col items-end justify-end gap-1">
          {errors.lastName ? (
            <p class="text-xs font-semibold text-white">{errors.lastName}</p>
          ) : null}
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe] outline-[#6366f1]"
            placeholder="Apellido"
            onChange={handleChange}
            name="lastName"
          ></input>
        </div>
        <div class="flex flex-col items-end gap-1 col-span-2">
          {errors.mail ? (
            <p class="text-xs font-semibold text-white">{errors.mail}</p>
          ) : null}
          {backendError && (
            <p class="text-xs font-semibold text-white">{backendError}</p>
          )}
          <input
            class="rounded-full h-12 w-full px-4 bg-[#c7d2fe]  outline-[#6366f1]"
            placeholder="Email"
            name="mail"
            onChange={handleChange}
          ></input>
        </div>
        <div class="flex items-end flex-col gap-1 col-span-2">
          {errors.password ? (
            <p class="text-xs font-semibold text-white">{errors.password}</p>
          ) : null}
          <div class="flex justify-between gap-4 w-full">
            <input
              class="rounded-full h-12 w-full px-4 bg-[#c7d2fe] outline-[#6366f1]"
              placeholder="Contraseña"
              type={hidePassword ? "password" : null}
              onChange={handleChange}
              name="password"
            ></input>
            <button
              class="h-12 w-1/5"
              onClick={(e) => {
                e.preventDefault();
                setHidePassword(!hidePassword);
              }}
            >
              {hidePassword ? (
                <img src="./eyeclosed.svg" width={35} />
              ) : (
                <img src="./eyeopened.svg" width={35} />
              )}
            </button>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          style={{ opacity: isLoading ? "0.5" : "1" }}
          disabled={isLoading}
          class={`rounded-full h-12 col-span-2 px-4 bg-[white] ${
            isLoading
              ? "cursor-default"
              : "hover:bg-[#6366f1] hover:border hover:text-white hover:font-bold"
          }  transition-all duration-300`}
        >
          Registrarse
        </button>
      </form>
      {isLoading ? (
        <div class="w-3/4 h-1/6 flex text-center flex-col items-center justify-center">
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
        <div class="w-3/4 flex flex-col items-center justify-center pt-4">
          <p class="text-white">o</p>
          <button
            class="text-white hover:underline cursor-pointer "
            onClick={() => {
              setRegisterClicked(false);
            }}
          >
            Iniciar sesión
          </button>
        </div>
      )}
    </div>
  );
}
