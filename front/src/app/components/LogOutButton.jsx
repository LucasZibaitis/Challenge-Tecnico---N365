"use client";
import { useRouter } from "next/navigation";

export default function LogOutButton() {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    localStorage.clear();
    router.push("/");
  };

  return (
    <button
      onClick={handleClick}
      class="rounded-full font-normal px-2 text-[#6366f1] h-10 border-2 border-[#6366f1] hover:bg-[#6366f1] hover:text-white transition-all duration-300 "
    >
      Cerrar sesión
    </button>
  );
}
