"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutIcon, UserIcon } from "@phosphor-icons/react";

export default function Header({ session }: { session: Session }) {
  const pathname = usePathname();
  const isSignIn = session?.user;
  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          className="size-40"
          alt="CHIPS"
          width={80}
          height={80}
        />
        <span className="text-4xl font-extrabold tracking-tighter cursor-pointer capitalize">
          CHIPS
        </span>
      </Link>
      <nav>
        <ul className="flex flex-row items-center gap-8">
          <li>
            <Link
              href="/"
              className={cn(
                "text-xl cursor-pointer capitalize",
                pathname === "/"
                  ? "text-cobalt-blue font-extrabold underline underline-offset-4 decoration-2 decoration-wavy"
                  : "text-poppy-red",
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/components"
              className={cn(
                "text-xl cursor-pointer capitalize",
                pathname === "/components"
                  ? "text-cobalt-blue font-extrabold underline underline-offset-4 decoration-2 decoration-wavy"
                  : "text-poppy-red",
              )}
            >
              Components
            </Link>
          </li>
          <li>
            {isSignIn && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="rounded-full p-0.5 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent
                      hover:bg-cream-paper"
                    >
                      <Avatar>
                        <AvatarFallback className="bg-poppy-red text-black text-xl font-semibold hover:bg-midnight-ink/5">
                          <span className="text-white">
                            {getInitials(session?.user?.name || "IN")}
                          </span>
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-midnight-ink text-xl bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-transparent font-semibold transition-colors hover:text-cobalt-blue">
                        {session?.user?.name?.split(" ")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="border-2 border-midnight-ink/10 bg-cream-paper p-2 min-w-50">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer rounded-none px-3 py-2.5 text-base transition-colors hover:bg-cobalt-blue/20">
                        <UserIcon size={18} />
                        <Link
                          href="/my-profile"
                          className="w-full text-midnight-ink transition-colors hover:text-cobalt-blue"
                        >
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer rounded-none px-3 py-2.5 text-base text-midnight-ink transition-colors hover:bg-poppy-red/20">
                        <SignOutIcon size={18} />
                        <Link
                          href="/"
                          className="w-full text-midnight-ink transition-colors hover:text-poppy-red"
                        >
                          Sign Out
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
