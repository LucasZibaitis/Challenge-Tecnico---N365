"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.replace("/");
    }
  }, [router]);

  if (!localStorage.getItem("accessToken")) {
    return null;
  }

  return <>{children}</>;
}
