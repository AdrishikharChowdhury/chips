import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="w-full max-w-3xl">
        <DotLottieReact
          src="https://lottie.host/3582a9c5-886d-4b36-ba3d-03e3bd96168e/Yetfho8YCT.lottie"
          loop
          autoplay
        />
      </div>
      <p className="text-xl font-degular-display font-bold text-midnight-ink/60 text-center">
        Your cart is empty
      </p>
      <Link
        href="/components"
        className="inline-flex items-center gap-2 text-cobalt-blue hover:underline font-semibold"
      >
        Browse components
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 4L10 8L6 12" />
        </svg>
      </Link>
    </div>
  );
}
