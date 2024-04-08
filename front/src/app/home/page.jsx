import HomeButton from "../components/HomeButton";
import LogOutButton from "../components/LogOutButton";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center gap-20">
      <LogOutButton />
      <div class="flex items-center justify-center gap-20 w-full">
        <HomeButton
          text="Registrar pagos"
          image="./paymentIconWhite.svg"
          pushTo="/registerPayment"
          width={150}
        />
        <HomeButton
          text="Historial de pagos"
          image="./invoiceIconWhite.svg"
          pushTo="/payments"
          width={150}
          mt={20}
        />
      </div>
    </main>
  );
}
