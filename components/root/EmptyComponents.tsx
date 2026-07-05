import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function EmptyComponents() {
  return (
    <div className="book-overview">
      <div className="w-full max-w-3xl">
        <DotLottieReact
          src="https://lottie.host/509fff4c-97f8-4ecd-a43a-72bb8bae941c/4IgY9MjXCD.lottie"
          loop
          autoplay
        />
      </div>
      <p className="text-4xl font-degular-display font-extrabold text-center">
        Hang Tight, Admin will be adding components
      </p>
    </div>
  );
}
