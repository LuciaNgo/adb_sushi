"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const signIn = document.getElementById("signIn");
    if (signIn) {
      signIn.onclick = () => {
        router.push("/signin");
      };
    }

    return () => {
      if (signIn) {
        signIn.onclick = null;
      }
    };
  }, [router]);

  return (
    null
  );
}
