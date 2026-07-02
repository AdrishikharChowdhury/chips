"use client";

import Image from "next/image";
import { ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ImagePopoverProps {
  src: string;
  alt: string;
  children: ReactNode;
}

export function ImagePopover({ src, alt, children }: ImagePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-auto max-w-[40vw] max-h-[90vh] p-0 bg-transparent ring-0 shadow-none border-0" sideOffset={8}>
        <div className="relative overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={200}
            height={140}
            className="object-contain w-auto"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
