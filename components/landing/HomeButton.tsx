"use client";
import React from 'react'
import { Button } from '../ui/button'
import { Home } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation';


export default function HomeButton() {
  const router = useRouter()
  const isHome = usePathname() === '/'
  const handleHomeClick = () => {
    if (isHome) {
      document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  return (
    <div className="fixed bottom-10 right-10 z-50 size-14">
      <span className="absolute -left-2 -top-2 size-full bg-marigold-yellow" aria-hidden />
      <Button
        onClick={handleHomeClick}
        aria-label="Go home"
        className="relative size-full border-2 border-midnight-ink bg-primary text-cream-paper hover:bg-midnight-ink"
      >
        <Home className="size-6" />
      </Button>
    </div>
  )
}
