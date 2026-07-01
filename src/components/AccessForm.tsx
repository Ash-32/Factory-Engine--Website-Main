import { Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { isGoogleFormConfigured } from "@/config/google-form";
import {
  openPrefilledFormInNewTab,
  submitBetaSignup,
} from "@/lib/google-form";

const inputClass =
  "w-full bg-transparent font-display text-[1.05rem] tracking-[-0.012em] text-ink placeholder:text-ink-muted/70 focus:outline-none";

const labelClass = "eyebrow text-ink-muted";

type Step = 1 | 2;

export function AccessForm({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const configured = isGoogleFormConfigured();

  function onStepOne(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setError(null);
    setStep(2);
  }

  async function onFinalSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !company.trim() || !role.trim()) return;

    setLoading(true);
    setError(null);

    const payload = {
      email: email.trim(),
      name: name.trim(),
      company: company.trim(),
      role: role.trim(),
      comment: comment.trim() || undefined,
    };

    if (!configured) {
      setLoading(false);
      setError(
        "Beta signup is not connected yet. Add your Google Form entry IDs — see GOOGLE-FORM-SETUP.md.",
      );
      return;
    }

    const result = await submitBetaSignup(payload);

    if (result.ok) {
      setSubmitted(true);
      setLoading(false);
      return;
    }

    if (result.reason === "network") {
      const opened = openPrefilledFormInNewTab(payload);
      if (opened) {
        setSubmitted(true);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setError("Something went wrong. Please try again.");
  }

  if (submitted) {
    return (
      <div className="border-b border-ink pb-3">
        <p className="font-display text-[1.15rem] tracking-[-0.012em] text-ink">
          You&apos;re on the beta list.
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          We&apos;ll send install instructions to {email} shortly.
        </p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form
        onSubmit={onStepOne}
        className={`flex w-full items-end gap-4 border-b border-ink pb-2 ${compact ? "max-w-md" : ""}`}
      >
        <label className="flex-1">
          <span className="sr-only">Work email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.name@company.com"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          className="inline-flex shrink-0 items-baseline gap-2 font-display text-sm font-medium tracking-tight text-ink transition-colors hover:text-brass"
        >
          Join beta
          <span aria-hidden>→</span>
        </button>
      </form>
    );
  }

  return (
    <div className={`w-full ${compact ? "max-w-md" : "max-w-lg"}`}>
      <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
        <span className="font-display text-sm tracking-[-0.012em] text-ink-soft">
          {email}
        </span>
        <button
          type="button"
          onClick={() => {
            setStep(1);
            setError(null);
          }}
          className="eyebrow text-ink-muted transition-colors hover:text-brass"
        >
          Edit email
        </button>
      </div>

      <form onSubmit={onFinalSubmit} className="mt-6 space-y-5">
        <div>
          <label className={labelClass}>
            <span className="sr-only">Name</span>
            Name
          </label>
          <input
            type="text"
            required
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={`${inputClass} mt-2 border-b border-rule pb-2`}
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="sr-only">Company</span>
            Company
          </label>
          <input
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company name"
            className={`${inputClass} mt-2 border-b border-rule pb-2`}
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="sr-only">Role</span>
            Role
          </label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Engineer, Quality, Operations…"
            className={`${inputClass} mt-2 border-b border-rule pb-2`}
          />
        </div>

        <div>
          <label className={labelClass}>
            <span className="sr-only">Comment</span>
            Comment <span className="text-ink-muted/70">(optional)</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Anything we should know?"
            rows={2}
            className={`${inputClass} mt-2 w-full resize-none border-b border-rule pb-2`}
          />
        </div>

        <p className="text-xs leading-relaxed text-ink-muted">
          By submitting, you agree to receive beta updates. See our{" "}
          <Link to="/privacy" className="text-ink underline-offset-2 hover:text-brass hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        {!configured && import.meta.env.DEV && (
          <p className="rounded-sm border border-brass/30 bg-bone-surface/80 px-3 py-2 text-xs text-ink-soft">
            Dev: Google Form not configured. Copy{" "}
            <code className="font-mono text-[0.7rem]">.env.example</code> to{" "}
            <code className="font-mono text-[0.7rem]">.env</code> or edit{" "}
            <code className="font-mono text-[0.7rem]">src/config/google-form.defaults.ts</code>.
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-baseline gap-2 border-b border-ink pb-0.5 font-display text-sm font-medium tracking-tight text-ink transition-colors hover:border-brass hover:text-brass disabled:opacity-50"
        >
          {loading ? "Submitting…" : "Submit signup"}
          {!loading && <span aria-hidden>→</span>}
        </button>
      </form>
    </div>
  );
}
