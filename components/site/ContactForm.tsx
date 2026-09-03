"use client";

import { useId, useState, type FormEvent } from "react";
import { PrimaryButton } from "@/components/ui";
import { cn } from "@/lib/cn";

interface ContactFormContent {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  companyLabel: string;
  needsLabel: string;
  needsOptions: string[];
  messageLabel: string;
  submitLabel: string;
  note: string;
  successMessage: string;
}

const fieldClass =
  "w-full border-0 border-b border-[rgba(242,238,228,0.25)] bg-transparent py-2xs font-body text-body-md text-paper transition-editorial focus:border-kite focus:outline-none";
const labelClass = "font-body text-[11px] font-semibold uppercase tracking-widest text-paper-soft";

/** One text/email/tel field: label above, thin underline input below — no box, no fill. */
function Field({
  id,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="text-kite"> *</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={cn(fieldClass, "mt-2xs")}
      />
    </div>
  );
}

/** One custom checklist item: a real (visually hidden) checkbox driving a square indicator — native semantics, editorial look. */
function NeedOption({ option, checked, onToggle }: { option: string; checked: boolean; onToggle: () => void }) {
  return (
    <label className="group flex cursor-pointer items-start gap-sm py-3xs">
      <input type="checkbox" name="needs" value={option} checked={checked} onChange={onToggle} className="peer sr-only" />
      <span
        aria-hidden
        className="mt-[3px] h-4 w-4 shrink-0 border border-[rgba(242,238,228,0.4)] transition-editorial peer-checked:border-kite peer-checked:bg-kite"
      />
      <span className="font-body text-label font-semibold uppercase tracking-wide text-paper-soft transition-editorial peer-checked:text-paper">
        {option}
      </span>
    </label>
  );
}

export function ContactForm({ content }: { content: ContactFormContent }) {
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const messageId = useId();

  function toggleNeed(option: string) {
    setSelectedNeeds((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="border-t border-[rgba(242,238,228,0.15)] pt-lg">
        <p className="max-w-[32ch] font-display text-display-sm font-black uppercase leading-[1.1] text-paper">
          {content.successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-lg">
      <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
        <Field id="name" label={content.nameLabel} required autoComplete="name" />
        <Field id="email" label={content.emailLabel} type="email" required autoComplete="email" />
      </div>

      <div className="grid grid-cols-1 gap-lg sm:grid-cols-2">
        <Field id="phone" label={content.phoneLabel} type="tel" autoComplete="tel" />
        <Field id="company" label={content.companyLabel} autoComplete="organization" />
      </div>

      <div>
        <span className={labelClass}>{content.needsLabel}</span>
        <div className="mt-sm grid grid-cols-1 gap-x-md gap-y-2xs sm:grid-cols-2">
          {content.needsOptions.map((option) => (
            <NeedOption
              key={option}
              option={option}
              checked={selectedNeeds.includes(option)}
              onToggle={() => toggleNeed(option)}
            />
          ))}
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className={labelClass}>
          {content.messageLabel}
        </label>
        <textarea id={messageId} name="message" rows={3} className={cn(fieldClass, "mt-2xs resize-none")} />
      </div>

      <div className="flex flex-col items-start gap-sm pt-xs sm:flex-row sm:items-center sm:justify-between">
        <PrimaryButton type="submit">{content.submitLabel}</PrimaryButton>
        <p className="font-body text-label text-paper-soft">{content.note}</p>
      </div>
    </form>
  );
}
