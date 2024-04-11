"use client";
import { useRouter } from "next/navigation";

export default function HomeButton(props) {
  const router = useRouter();
  return (
    <div
      class="flex flex-col items-center justify-center border rounded-3xl border-2 bg-[#6366f1] md:w-2/6 lg:w-1/6 md:h-80 lg:h-72 cursor-pointer hover:text-white hover:scale-105 transition-all duration-300 py-10"
      onClick={() => {
        router.push(props.pushTo);
      }}
    >
      <img src={props.image} width={props.width}/>
      <h1 class="text-2xl text-white font-bold" style={{marginTop: props.mt}}>{props.text}</h1>
    </div>
  );
}
