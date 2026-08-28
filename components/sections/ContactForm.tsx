"use client";

import { useState } from "react";

const inputClasses =
  "w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/35 focus:border-orange focus:outline-none";

const RECIPIENT_EMAIL = "info@chuchinultimate.com";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Honeypot: if this hidden field is filled, it's a bot — silently drop.
    if (formData.get("company-website")) return;

    const name = (formData.get("name") as string) ?? "";
    const email = (formData.get("email") as string) ?? "";
    const message = (formData.get("message") as string) ?? "";

    // No backend or third-party service — this opens the visitor's own
    // email app with the message pre-filled, addressed to the studio.
    // They hit send from their own inbox, so the email you receive shows
    // their real address as the sender, not a relayed/spoofed one.
    const subject = encodeURIComponent(`New message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center rounded-2xl border border-charcoal/8 bg-white p-10 shadow-card">
        <p className="font-display text-xl font-semibold text-charcoal">
          Your email app should now be open with your message ready — just hit send.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-charcoal/8 bg-white p-8 shadow-card md:p-10">
      <input type="text" name="company-website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">
            Name
          </label>
          <input id="name" name="name" type="text" required className={inputClasses} placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">
            Email
          </label>
          <input id="email" name="email" type="email" required className={inputClasses} placeholder="you@email.com" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-charcoal/50">
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={inputClasses} placeholder="Tell us what you're working on" />
      </div>

      <button
        type="submit"
        className="rounded-full bg-charcoal px-7 py-3.5 text-sm font-semibold text-offwhite transition-colors duration-300 hover:bg-orange"
      >
        Send Message
      </button>
    </form>
  );
}