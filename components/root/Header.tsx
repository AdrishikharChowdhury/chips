"use client";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { Eye } from "lucide-react";

export default function Header({
  session,
  isAuthority,
  slug,
}: {
  session: Session;
  isAuthority: boolean;
  slug: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isSignIn = session?.user;
  const navLinks = navigationLinks.slice(0, 4);

  const switchToAdminOwner = () => {
    router.push("/admin");
  };

  return (
    <header className="my-10 flex items-center justify-between gap-5">
      <Link href="/home" className="flex items-center gap-2">
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
          {navLinks.map((link) => (
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
                          href={navigationLinks[4].href}
                          className="flex w-full items-center gap-2 text-midnight-ink transition-colors hover:text-cobalt-blue"
                        >
                          <UserIcon size={18} />
                          {navigationLinks[4].label}
                        </Link>
                      </DropdownMenuItem>
                      {isAuthority && (
                        <DropdownMenuItem
                          onClick={switchToAdminOwner}
                          className="w-full transition-colors hover:bg-marigold-yellow/20 text-base text-center py-2.5 px-3 flex cursor-pointer text-midnight-ink"
                        >
                          <Eye size={18} />
                          {slug} View
                        </DropdownMenuItem>
                      )}
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
