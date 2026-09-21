"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { contact } from "@/content/copy";

/**
 * Pill inputs + black pill submit (the one allowed filled-button exception).
 * Stubbed per IMPLEMENTATION_PLAN.md Phase 4: submit flips to a success
 * state, no backend call.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { form } = contact;

  if (sent) {
    return (
      <div
        data-contact-form="success"
        role="status"
        className="flex flex-col items-start gap-16 rounded-2xl border border-mist bg-pure-white p-24"
      >
        <CheckCircle2
          size={24}
          strokeWidth={1.5}
          className="text-obsidian"
          aria-hidden="true"
        />
        <p className="text-heading-sm font-bold text-obsidian">
          Message sent. We&apos;ll respond within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      data-contact-form="root"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-16"
    >
      <h2 className="text-heading-sm font-bold text-obsidian leading-[var(--leading-heading-sm)] tracking-[var(--tracking-heading-sm)]">{form.title}</h2>
      <label className="flex flex-col gap-8">
        <span className="text-body-sm text-obsidian">{form.nameLabel}</span>
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder={form.nameLabel}
          className="rounded-full border border-mist bg-pure-white px-20 py-12 text-body text-obsidian placeholder:text-driftwood focus:border-obsidian focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-8">
        <span className="text-body-sm text-obsidian">{form.emailLabel}</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={form.emailLabel}
          className="rounded-full border border-mist bg-pure-white px-20 py-12 text-body text-obsidian placeholder:text-driftwood focus:border-obsidian focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-8">
        <span className="text-body-sm text-obsidian">{form.messageLabel}</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder={form.messageLabel}
          className="rounded-2xl border border-mist bg-pure-white px-20 py-12 text-body text-obsidian placeholder:text-driftwood focus:border-obsidian focus:outline-none"
        />
      </label>
      <button
        type="submit"
        data-contact-form="submit"
        className="mt-8 self-start rounded-full border border-obsidian bg-obsidian px-28 py-12 text-body text-pure-white transition-colors hover:bg-pure-white hover:text-obsidian hover:underline"
      >
        {form.submitLabel} →
      </button>
    </form>
  );
}
