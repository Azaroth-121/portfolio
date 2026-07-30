"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "rounded border border-border bg-transparent px-3 py-2 text-foreground focus-visible:outline-2 focus-visible:outline-accent";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-6" noValidate={false}>
      {/* Honeypot: hidden from sighted users and screen readers, never focusable. Real visitors never fill it in. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          type="text"
          id="company_website"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-sm">
          Name
        </label>
        <input id="name" name="name" type="text" required className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-sm">
          Email
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="projectType" className="font-mono text-sm">
          Project type
        </label>
        <select
          id="projectType"
          name="projectType"
          defaultValue="AI chatbot"
          className={inputClass}
        >
          <option>AI chatbot</option>
          <option>Automation workflow</option>
          <option>Web platform</option>
          <option>Something else</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-sm">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded bg-foreground px-5 py-2.5 font-mono text-sm text-background transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send"}
      </button>

      {state.status === "success" && (
        <p role="status" className="font-mono text-sm text-accent">
          Thanks — I&apos;ll get back to you soon.
        </p>
      )}
      {state.status === "error" && (
        <p role="alert" className="font-mono text-sm text-accent">
          {state.message}
        </p>
      )}
    </form>
  );
}
