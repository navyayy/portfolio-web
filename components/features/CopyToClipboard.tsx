"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CopyToClipboardProps {
  text: string;
  label: string;
  className?: string;
}

export function CopyToClipboard({ text, label, className }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`group flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors ${className || ""}`}
      aria-label={`Copy ${label}`}
    >
      <span className="font-mono text-sm">{text}</span>
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-state-success text-xs font-mono"
          >
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="text-text-tertiary group-hover:text-accent text-xs transition-colors"
          >
            Copy
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
