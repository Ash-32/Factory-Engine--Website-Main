import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_TITLE = "Privacy Policy — Factory Engine";
const LOGO_SRC = `${import.meta.env.BASE_URL}factory-engine-logo.png`;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: SITE_TITLE },
      { name: "description", content: "Privacy policy for Factory Engine beta signup." },
    ],
    links: [{ rel: "icon", type: "image/png", href: LOGO_SRC }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bone text-ink">
      <header className="border-b border-rule">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-6 md:px-10">
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-[1.05rem] font-medium tracking-tight"
          >
            <img
              src={LOGO_SRC}
              alt="Factory Engine"
              className="h-9 w-9 shrink-0 rounded-sm object-contain"
              width={36}
              height={36}
            />
            <span>Factory Engine</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-[720px] px-6 py-16 md:px-10 md:py-24">
        <p className="eyebrow text-ink-muted">Legal</p>
        <h1 className="font-display mt-4 text-[2rem] font-medium tracking-[-0.02em] text-ink md:text-[2.5rem]">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: July 2026</p>

        <div className="mt-10 space-y-8 text-[1rem] leading-[1.75] text-ink-soft">
          <section>
            <h2 className="font-display text-lg font-medium text-ink">Beta signup</h2>
            <p className="mt-3">
              When you join the Factory Engine beta, we collect your email address, name,
              company, role, and any optional comment you provide. This information is stored
              via Google Forms and used solely to manage beta access and send you install
              instructions and product updates related to the beta program.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">How we use your data</h2>
            <p className="mt-3">
              We do not sell your personal information. We use signup data to communicate
              with you about the beta, respond to your questions, and improve the product.
              You may unsubscribe from beta communications at any time by replying to any
              email we send.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-medium text-ink">Contact</h2>
            <p className="mt-3">
              Questions about this policy? Email{" "}
              <a
                href="mailto:hello@factory-engine.com"
                className="text-ink underline-offset-2 hover:text-brass hover:underline"
              >
                hello@factory-engine.com
              </a>
              .
            </p>
          </section>
        </div>

        <Link
          to="/"
          className="mt-12 inline-flex items-baseline gap-2 font-display text-sm font-medium tracking-tight text-ink transition-colors hover:text-brass"
        >
          <span aria-hidden>←</span>
          Back to home
        </Link>
      </main>
    </div>
  );
}
