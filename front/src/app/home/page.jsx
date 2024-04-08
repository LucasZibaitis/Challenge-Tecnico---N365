import HomeButton from "../components/HomeButton";

export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center gap-20">
      <HomeButton
        text="Registrar pagos"
        image="./paymentIconWhite.svg"
        pushTo="/registerPayment"
        width={190}
      />
      <HomeButton
        text="Historial de pagos"
        image="./invoiceIconWhite.svg"
        pushTo="/payments"
        width={150}
        mt={50}
      />
    </main>
  );
}
