"use client";

import React, { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
  variant?: "default" | "minimal" | "pill";
}

export function CopyEmailButton({
  email,
  className,
  variant = "default",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={handleCopy}
        aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-mono">Copied to clipboard</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span className="font-mono">Copy Email</span>
          </>
        )}
      </button>
    );
  }

  if (variant === "pill") {
    return (
      <button
        onClick={handleCopy}
        aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-850 hover:border-zinc-700 text-xs font-mono text-zinc-300 transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400",
          copied && "border-emerald-500/40 bg-emerald-950/20 text-emerald-300",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-zinc-400" />
            <span>{email}</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Email copied to clipboard" : "Copy email to clipboard"}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 text-sm font-medium text-zinc-200 shadow-sm transition-all duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        copied && "border-emerald-500/50 bg-emerald-950/20 text-emerald-300",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-400 animate-in zoom-in-50 duration-150" />
          <span className="text-emerald-300 font-mono text-xs tracking-tight">
            Copied to clipboard
          </span>
        </>
      ) : (
        <>
          <Mail className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          <span>Get in Touch</span>
          <span className="text-zinc-500 text-xs font-mono border-l border-zinc-800 pl-2">
            Copy
          </span>
        </>
      )}
    </button>
  );
}
