"use client";
import { approveAccountRequest, rejectAccountRequest } from '@/lib/actions/user';
import { getInitials } from '@/lib/utils';
import { Check, X } from 'lucide-react';
import { ImagePopover } from '../accountrequests/ImagePopover';

interface PendingUserCardProps {
  id:string
  fullName: string
  email: string
  universityCard: string
}

export default function PendingUserCard({id, fullName,email, universityCard}: PendingUserCardProps) {
  return (
    <li key={fullName} className="flex gap-2 bg-marigold-yellow/20 p-4 items-center rounded-2xl border-2 border-marigold-yellow justify-between w-full">
      <section className="flex items-center gap-2" >
        <div className="bg-cobalt-blue text-white font-degular-display size-10 rounded-full flex items-center justify-center">{getInitials(fullName)}</div>
        <span className="flex flex-col">
          <p className="text-midnight-ink text-sm font-semibold">{fullName}</p>
          <p className="text-midnight-ink/50 text-xs font-semibold">@{email.split('@')[0]}</p>
        </span>
      </section>
      
      <div className="flex items-center justify-end gap-12">
        <ImagePopover
          src={universityCard}
          alt={`${fullName}'s university card`}
        >
          <button className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-semibold text-cobalt-blue underline underline-offset-2 hover:text-cobalt-blue/70 transition-colors">
              View Card
            </span>
          </button>
        </ImagePopover>
        <div className='flex items-center gap-2'>
          <form action={approveAccountRequest.bind(null,id)}>
            <button
              type="submit"
              className="flex size-9 items-center justify-center border-2 border-emerald-400/30 text-emerald-600 hover:bg-emerald-600 hover:text-cream-paper transition-colors"
            >
              <Check size={16} />
            </button>
          </form>
          <form action={rejectAccountRequest.bind(null, id)}>
            <button
              type="submit"
              className="flex size-9 items-center justify-center border-2 border-poppy-red/30 text-poppy-red hover:bg-poppy-red hover:text-cream-paper transition-colors"
            >
              <X size={16} />
            </button>
          </form>
        </div>
      </div>
    </li>
  )
}