import Image from "next/image";
import LoginForm from "./components/LoginForm";

export default function Landing() {
  return (
    <main class="h-screen flex items-center justify-center">
      <LoginForm />
    </main>
  );
}
