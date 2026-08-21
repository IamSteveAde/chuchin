"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const CHAT_URL = "https://www.chatbase.co/chatbot-iframe/IouwX1CRu893djjC0jsn9";

/**
 * Site-wide floating chat launcher. Chatbase's iframe embed is designed to
 * fill a full page section, not act as a bubble on its own — this wraps it
 * in a toggleable panel so it behaves like a persistent widget across every
 * page. Mounted once in app/layout.tsx.
 */
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange to-gold text-charcoal shadow-[0_10px_30px_-8px_rgba(244,102,30,0.5)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-charcoal"
              strokeWidth={2}
            >
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ duration: 0.2 }}
              viewBox="0 0 24 24"
              className="h-6 w-6 fill-none stroke-charcoal"
              strokeWidth={2}
            >
              <path d="M4 4h16v12H8l-4 4V4Z" strokeLinejoin="round" strokeLinecap="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-40 flex h-[min(700px,75vh)] w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-white shadow-card"
          >
            <iframe
              src={CHAT_URL}
              title="Chuchin Ultimate Productions chat assistant"
              allow="microphone"
              className="h-full w-full flex-1 border-0"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}