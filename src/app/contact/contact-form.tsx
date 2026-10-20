"use client";

import { useActionState } from "react";
import { siteConfig } from "@/config/site";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const PROJECT_TYPES = ["Full-time role", "AI chatbot", "Automation workflow", "Web platform", "Something else"];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <span className="glass-chip grid h-16 w-16 place-items-center text-2xl text-accent">✓</span>
        <p className="mt-6 font-serif text-4xl tracking-tight">Message received.</p>
        <p className="mt-3 max-w-sm text-muted">Thank you — I read every message myself and will get back to you soon.</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {/* Honeypot: hidden from sighted users and screen readers, never focusable. Real visitors never fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company_website">Leave this field empty</label>
        <input type="text" id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset>
        <legend className="eyebrow mb-3">What is this about?</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type, i) => (
            <label key={type} className="choice">
              <input type="radio" name="projectType" value={type} defaultChecked={i === 0} />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="eyebrow">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Jane Doe" className="field" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="eyebrow">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className="field"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="eyebrow">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="The role or project, the timeline, and anything I should know."
          className="field resize-y"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={isPending} className="btn-primary px-7 py-3 font-mono text-sm">
          {isPending ? "Sending…" : "Send message →"}
        </button>
        <p className="text-xs text-muted">Goes straight to my inbox.</p>
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-2xl border border-[var(--glass-line)] bg-[var(--glass-strong)] p-4 text-sm">
          {state.message}{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-accent underline underline-offset-4">
            {siteConfig.email}
          </a>
        </p>
      )}
    </form>
  );
}
