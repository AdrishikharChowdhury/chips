"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutIcon, UserIcon } from "@phosphor-icons/react";
import { navigationLinks } from "@/constants";

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
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-xl cursor-pointer capitalize",
                  pathname === link.href
                    ? "text-cobalt-blue font-extrabold underline underline-offset-4 decoration-2 decoration-wavy"
                    : "text-poppy-red",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
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
                        <Link
                          href="/my-profile"
                          className="flex w-full items-center gap-2 text-midnight-ink transition-colors hover:text-cobalt-blue"
                        >
                          <UserIcon size={18} />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => signOut()}
                        className="cursor-pointer rounded-none px-3 py-2.5 text-base text-midnight-ink transition-colors hover:bg-poppy-red/20 hover:text-poppy-red"
                      >
                        <SignOutIcon size={18} />
                        Sign Out
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
