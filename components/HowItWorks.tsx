type Step = {
  n: string;
  title: string;
  body: string;
  note: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Start with clarity",
    body:
      "Run a Sanity Check or start a conversation. We begin with the unit — economics, structure, risk exposure, and decision constraints.",
    note: "Tools before opinions."
  },
  {
    n: "02",
    title: "Assess reality",
    body:
      "If we go deeper, we assess execution — operating discipline, controls, people, systems, and where value is created or leaking.",
    note: "What breaks businesses is rarely hidden."
  },
  {
    n: "03",
    title: "Choose the right path",
    body:
      "After assessment, one of three outcomes follows: we invest, we advise, or we step away. Saying no is part of the model.",
    note: "Not every opportunity deserves involvement."
  },
  {
    n: "04",
    title: "Execute hands-on",
    body:
      "If we commit, we stay close to operations and focus on decisions that move the needle — prioritising cash flow, discipline, and durability.",
    note: "We don’t observe businesses. We operate them."
  }
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 bg-white text-neutral-900"
      aria-label="How it works"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs tracking-wide text-neutral-700">
            HOW IT WORKS
          </span>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            A clear, operator-led engagement model
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600">
            No pitches. No packaged programmes. Clarity first — then execution, if aligned.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
                  <span className="text-sm font-semibold text-neutral-800">{s.n}</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">{s.title}</h3>

                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.body}</p>

                  <p className="mt-4 text-xs tracking-wide text-neutral-500">{s.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <p className="text-sm text-neutral-600">
            This model is deliberate. It filters noise, protects focus, and ensures alignment
            before momentum.
          </p>
        </div>
      </div>
    </section>
  );
}
