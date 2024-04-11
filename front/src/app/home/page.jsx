import HomeButton from "../components/HomeButton";
import LogOutButton from "../components/LogOutButton";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="h-screen flex flex-col items-center justify-center gap-5">
        <div class="flex items-center justify-between gap-96">
          <h1 class="text-6xl font-semibold text-[#6366f1] tracking-tighter">
            N365
          </h1>
          <LogOutButton />
        </div>
        <div class="flex items-center justify-center gap-10 w-full">
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
    </ProtectedRoute>
  );
}
