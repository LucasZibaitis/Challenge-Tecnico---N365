import HomeButton from "../components/HomeButton";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center gap-20">
      <HomeButton
        text="Registrar pagos"
        image="./paymentIcon.svg"
        pushTo="/registerPayment"
      />
      <HomeButton
        text="Historial de pagos"
        image="./invoiceIcon.svg"
        pushTo="/payments"
      />
    </main>
  );
}
