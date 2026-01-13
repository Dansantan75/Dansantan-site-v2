import Image from "next/image";

export const metadata = {
  title: "Portfolio | DANSANTAN",
  description:
    "Owner-operated retail experience across grocery, liquor, and franchised café environments.",
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      {/* Header */}
      <section className="mb-16 max-w-3xl">
        <span className="mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium">
          PORTFOLIO
        </span>
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
          Built through ownership, responsibility,
          <br className="hidden md:block" /> and execution
        </h1>
        <p className="text-lg text-neutral-600">
          Our portfolio reflects where we have carried real operating risk —
          leading teams, managing cash flow, and being accountable for outcomes.
        </p>
      </section>

      {/* Portfolio Grid */}
      <section className="grid gap-12">
        {/* SPAR */}
        <div className="grid gap-8 rounded-2xl border p-8 md:grid-cols-[180px_1fr]">
          <div className="flex items-center">
            <Image
              src="/brands/spar.png"
              alt="SPAR Group"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">SPAR Group</h2>
            <p className="mb-4 text-neutral-600">
              Grocery & liquor retail, wholesale distribution, and governance.
            </p>
            <p className="mb-4">
              Mario served as <strong>Managing Director</strong> and as a member
              of the <strong>SPAR Group Executive Committee</strong>, contributing
              to national strategy, format development, and international
              expansion.
            </p>
            <p className="mb-4">
              Alongside corporate leadership, we owned and operated multiple
              stores across <strong>SPAR</strong>, <strong>SUPERSPAR</strong>,
              and <strong>TOPS at SPAR</strong> — living daily with margin
              pressure, people leadership, compliance, and working capital
              realities.
            </p>
            <p className="text-neutral-600">
              This combination of boardroom accountability and shop-floor
              execution shapes how we assess and support operators today.
            </p>
          </div>
        </div>

        {/* VIDA */}
        <div className="grid gap-8 rounded-2xl border p-8 md:grid-cols-[180px_1fr]">
          <div className="flex items-center">
            <Image
