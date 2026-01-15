import { brandLogos } from "@/lib/portfolio/brands";
import BrandLogo from "@/components/BrandLogo";

export const metadata = {
  title: "Portfolio | DANSANTAN",
  description:
    "Owner-operated retail experience across grocery, liquor, and franchised café environments."
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <section className="mb-16 max-w-3xl">
        <span className="mb-4 inline-block rounded-full border px-3 py-1 text-xs font-medium">
          PORTFOLIO
        </span>
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
          Built through ownership, responsibility,
          <br className="hidden md:block" /> and execution
        </h1>
        <p className="text-lg text-neutral-600">
          Our portfolio reflects where we have carried real operating risk — leading teams,
          managing cash flow, and being accountable for outcomes.
        </p>
      </section>

      <section className="grid gap-12">
        <div className="grid gap-8 rounded-2xl border p-8 md:grid-cols-[180px_1fr]">
          <div className="flex items-center">
            <BrandLogo
              src={brandLogos.spar}
              alt="SPAR Group"
              fallbackText="SPAR"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">SPAR Group</h2>
            <p className="mb-4 text-neutral-600">
              Grocery &amp; liquor retail, wholesale distribution, and governance.
            </p>
            <p className="mb-4">
              Mario served as <strong>Managing Director</strong> and as a member of the{" "}
              <strong>SPAR Group Executive Committee</strong>, contributing to national strategy,
              format development, and international expansion.
            </p>
            <p className="mb-4">
              Alongside corporate leadership, we owned and operated multiple stores across{" "}
              <strong>SPAR</strong>, <strong>SUPERSPAR</strong>, and{" "}
              <strong>TOPS at SPAR</strong> — living daily with margin pressure, people leadership,
              compliance, and working capital realities.
            </p>
            <p className="text-neutral-600">
              This combination of boardroom accountability and shop-floor execution shapes how we
              assess and support operators today.
            </p>
          </div>
        </div>

        <div className="grid gap-8 rounded-2xl border p-8 md:grid-cols-[180px_1fr]">
          <div className="flex items-center">
            <BrandLogo
              src={brandLogos.vida}
              alt="VIDA e Caffè"
              fallbackText="VIDA"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">VIDA e Caffè</h2>
            <p className="mb-4 text-neutral-600">Franchised coffee retail &amp; unit economics.</p>
            <p>
              VIDA operates in a high-volume, low-latency environment where speed, consistency, and
              labour discipline matter daily. Our experience here sharpens our focus on
              transaction flow, basket building, staffing rhythms, and cost control in pressured
              retail settings.
            </p>
          </div>
        </div>

        <div className="grid gap-8 rounded-2xl border p-8 md:grid-cols-[180px_1fr]">
          <div className="flex items-center">
            <BrandLogo
              src={brandLogos.bootlegger}
              alt="Bootlegger Coffee Company"
              fallbackText="Bootlegger"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Bootlegger Coffee Company</h2>
            <p className="mb-4 text-neutral-600">Café operations &amp; service rhythm.</p>
            <p>
              Bootlegger blends hospitality with retail discipline. The brand demands excellence
              in service execution, kitchen coordination, and customer experience — reinforcing
              our belief that culture and standards must hold under real trade pressure.
            </p>
          </div>
        </div>

        <div className="grid gap-8 rounded-2xl border p-8 md:grid-cols-[180px_1fr]">
          <div className="flex items-center">
            <BrandLogo
              src={brandLogos.ultraLiquors}
              alt="Ultra Liquors"
              fallbackText="Ultra"
              width={160}
              height={60}
              className="object-contain"
            />
          </div>

          <div>
            <h2 className="mb-3 text-2xl font-semibold">Ultra Liquors</h2>
            <p className="mb-4 text-neutral-600">Liquor retail, stock flow &amp; compliance.</p>
            <p>
              Liquor retail introduces added layers of regulation, shrink control, and supplier
              dynamics. Our involvement here strengthens our operating discipline around stock
              accuracy, margin protection, and governance — areas where small leaks quickly become
              big problems.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
