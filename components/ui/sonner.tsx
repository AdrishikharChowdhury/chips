"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      gap={12}
      icons={{
        success: <CheckCircleIcon weight="bold" />,
        info: <InfoIcon weight="bold" />,
        warning: <WarningIcon weight="bold" />,
        error: <XCircleIcon weight="bold" />,
        loading: <SpinnerIcon weight="bold" className="animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "!bg-cream-paper !text-midnight-ink !border-2 !border-midnight-ink " +
            "!rounded-none !shadow-none font-usual text-sm font-semibold " +
            "!px-4 !py-3 !gap-3",
          title: "!text-midnight-ink !font-semibold !text-sm !m-0",
          description: "!text-midnight-ink/60 !text-xs !m-0",
          icon: "!size-5",
          success: "[&_[data-icon]]:!text-cobalt-blue",
          error: "[&_[data-icon]]:!text-poppy-red",
          warning: "[&_[data-icon]]:!text-marigold-yellow",
          info: "[&_[data-icon]]:!text-cobalt-blue",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
