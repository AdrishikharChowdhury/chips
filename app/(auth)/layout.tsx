import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box shadow-xl">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src="/logo.svg"
              className="size-40 object-contain"
              alt="Logo"
              width={60}
              height={60}
            />
            <h1 className="text-2xl font-semibold">C.H.I.P.S</h1>
          </div>
          <div>
            {children}
          </div>
        </div>
      </section>
      <section className="auth-illustration" >
        <Image src="/images/banner.webp" alt="Banner" width={1000} height={1000} className="size-full object-cover" />
      </section>
    </main>
  );
}
