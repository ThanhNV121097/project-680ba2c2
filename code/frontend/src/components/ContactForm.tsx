import { useState, type FormEvent, type ReactNode } from "react";
import { T, useContent } from "../editable";
import { canSend, sendEnquiry } from "../site";

/**
 * The contact form. What a customer sends reaches the owner in Agent Team
 * (src/site.ts), so this form is never decoration: keep it wherever the site
 * asks people to get in touch. `fields` adds a booking's own questions —
 * [{ key: "date", type: "date" }, { key: "people", type: "number" }] — each
 * labelled by contact.form.fields.<key> in content.json.
 *
 * Its words are content.json's contact.form.*. Style it to the design; keep
 * the fields, the hidden "website" trap and the three states.
 */
export interface FormField {
  key: string;
  type?: "text" | "date" | "time" | "number";
}

type State = "idle" | "sending" | "sent" | "failed";

export default function ContactForm({ fields = [], className = "", idPrefix = "", testId = "contact-form", submitTestId = "contact-submit", contentKey = "contact.form" }: {
  fields?: FormField[];
  className?: string;
  /** Prefixes every input's id, so two forms on one page (general + wholesale) get different ids. */
  idPrefix?: string;
  testId?: string;
  submitTestId?: string;
  /** The content.json key this form's labels live under — "contact.form" by default, "contact.wholesaleForm" for a second form on the same page. */
  contentKey?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [problem, setProblem] = useState("");
  const offline = useContent(`${contentKey}.offline`);
  const fieldId = (k: string) => (idPrefix ? `${idPrefix}-${k}` : k);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const value = (k: string) => String(data.get(k) ?? "").trim();
    const details: Record<string, string> = {};
    for (const f of fields) if (value(f.key)) details[f.key] = value(f.key);
    setState("sending");
    try {
      await sendEnquiry({ name: value("name"), reply_to: value("reply_to"), message: value("message"), details, website: value("website") });
      setState("sent");
    } catch (err) {
      setProblem(err instanceof Error ? err.message : "");
      setState("failed");
    }
  }

  if (state === "sent") {
    return <p data-testid={testId} className={`text-lg ${className}`}><T k={`${contentKey}.sent`} /></p>;
  }
  const input = "w-full rounded border border-line bg-ground px-4 py-3 text-ink focus:outline-2 focus:outline-offset-2 focus:outline-accent";
  return (
    <form data-testid={testId} onSubmit={(e) => void submit(e)} className={`flex flex-col gap-4 ${className}`}>
      <Field k="name" contentKey={contentKey} id={fieldId("name")}><input id={fieldId("name")} name="name" autoComplete="name" required className={input} /></Field>
      <Field k="reply_to" contentKey={contentKey} id={fieldId("reply_to")}><input id={fieldId("reply_to")} name="reply_to" autoComplete="tel" required className={input} /></Field>
      {fields.map((f) => (
        <Field key={f.key} k={`fields.${f.key}`} contentKey={contentKey} id={fieldId(f.key)}><input id={fieldId(f.key)} name={f.key} type={f.type ?? "text"} className={input} /></Field>
      ))}
      <Field k="message" contentKey={contentKey} id={fieldId("message")}><textarea id={fieldId("message")} name="message" rows={4} className={input} /></Field>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
      {state === "failed" && <p role="alert" className="text-sm text-ink">{problem}</p>}
      {!canSend && <p className="text-sm text-ink-soft">{offline}</p>}
      <button type="submit" data-testid={submitTestId} disabled={state === "sending"} className="self-start rounded bg-accent px-6 py-3 text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-60">
        <T k={state === "sending" ? `${contentKey}.sending` : `${contentKey}.send`} />
      </button>
    </form>
  );
}

function Field({ k, id, contentKey, children }: { k: string; id: string; contentKey: string; children: ReactNode }) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2 text-sm">
      <T k={`${contentKey}.${k}`} className="text-ink-soft" />
      {children}
    </label>
  );
}
