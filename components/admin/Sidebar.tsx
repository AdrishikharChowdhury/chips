"use client";
import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Session } from "next-auth";

export default function Sidebar({ session }: { session: Session }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn("admin-sidebar", collapsed && "collapsed")}>
      <div>
        <div className="logo">
          <Image
            src="/logo.svg"
            alt="logo"
            width={37}
            className=""
            height={37}
          />
          <h1>CHIPS</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((adminLink) => {
            const isSelected = pathname === adminLink.route;
            return (
              <Link
                key={adminLink.text}
                href={adminLink.route}
                className={cn("link", isSelected && "bg-poppy-red hover:bg-poppy-red/70")}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={adminLink.img}
                    alt={adminLink.text}
                    className={`${isSelected ? "filter brightness-0 invert" : ""}`}
                    width={20}
                    height={20}
                  />
                  {!collapsed && (
                    <span className={`${isSelected ? "text-white" : ""}`}>
                      {adminLink.text}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div
        className={
          collapsed ? "space-y-4 mx-auto" : "flex justify-between items-center"
        }
      >
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-poppy-red text-black text-xl font-semibold hover:bg-midnight-ink/5">
              <span className="text-white">
                <p>{getInitials(session?.user?.name || "IN")}</p>
              </span>
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div>
              <p className="text-white font-extrabold text-lg">
                {session?.user?.name}
              </p>
              <p className="text-white text-sm font-light">
                @{session?.user?.email}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex size-8 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground self-end"
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={collapsed ? "M6 4L10 8L6 12" : "M10 4L6 8L10 12"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
