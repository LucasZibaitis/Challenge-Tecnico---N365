import HomeButton from "../components/HomeButton";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center gap-20">
      <HomeButton text="Realizar un pago" image="./paymentIcon.svg" />
      <HomeButton text="Historial de pagos" image="./invoiceIcon.svg" />
    </main>
  );
}
