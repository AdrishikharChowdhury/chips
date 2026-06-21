'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function Header() {
  const pathname=usePathname()
  return (
    <header className='my-10 flex items-center justify-between gap-5' >
      <Link href="/" className='flex items-center gap-2'>
        <Image src="/logo.svg" className='size-40' alt="CHIPS" width={80} height={80} />
        <span className='text-4xl font-extrabold tracking-tighter cursor-pointer capitalize'>CHIPS</span>
      </Link>
      <nav>
        <ul className='flex flex-row items-center gap-8'>
          <li>
            <Link href="/components" className={cn('text-base cursor-pointer capitalize',pathname==="/components" ? "text-cobalt-blue" : "text-poppy-red")} >Components</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}