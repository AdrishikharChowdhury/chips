"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircleIcon, InfoIcon, WarningIcon, XCircleIcon, SpinnerIcon } from "@phosphor-icons/react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: (
          <CheckCircleIcon className="size-4" />
        ),
        info: (
          <InfoIcon className="size-4" />
        ),
        warning: (
          <WarningIcon className="size-4" />
        ),
        error: (
          <XCircleIcon className="size-4" />
        ),
        loading: (
          <SpinnerIcon className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "#fbf3e4",
          "--normal-text": "#0b0f16",
          "--normal-border": "#0b0f16",
          "--border-radius": "0",
          "--width": "auto",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "border-2 border-midnight-ink rounded-none font-usual shadow-none " +
            "text-midnight-ink !bg-cream-paper !border-midnight-ink",
          title: "text-sm font-semibold",
          description: "text-xs text-midnight-ink/60",
          success: "[&_[data-icon]_svg]:text-cobalt-blue",
          error: "[&_[data-icon]_svg]:text-poppy-red",
          info: "[&_[data-icon]_svg]:text-cobalt-blue",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
