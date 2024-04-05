"use client";
import { useRouter } from "next/navigation";

export default function HomeButton(props) {
  const router = useRouter();
  return (
    <div
      class="flex flex-col items-center justify-center border rounded-md border-2 bg-[#e0f2fe] w-1/6 h-72 cursor-pointer gap-8"
      onClick={() => {
        router.push(props.pushTo);
      }}
    >
      <img src={props.image} width={190} />
      <h1 class="font-bold text-2xl">{props.text}</h1>
    </div>
  );
}
