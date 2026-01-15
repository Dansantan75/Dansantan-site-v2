import Image from "next/image";

type PortfolioItem = {
  key: string;
  name: string;
  logoSrc: string; // served from /public
  logoAlt: string;
  eyebrow: string;
  summary: string;
  bullets: string[];
  tags: string[];
};

const portfolio: PortfolioItem[] = [
  {
    key: "spar",
    name: "SPAR Group",
    logoSrc: "/brands/spar.png",
    logoAlt: "SPAR logo",
    eyebrow: "Corporate leadership + owner-operator experience",
    summary:
      "Led at executive level and operated at store level. I served as Managing Director and on the SPAR Group Executive Committee, then went on to own and operate SPAR, SUPERSPAR, and TOPS stores—living the same margin, cash-flow, and people realities operators face daily.",
    bullets: [
      "Executive leadership inside a JSE-listed retailer",
      "Format and operational turnarounds across markets",
      "Store-level ownership: grocery + liquor retail execution"
    ],
    tags: ["Grocery Retail", "Liquor Retail", "Governance", "Scale"]
  },
  {
    key: "vida",
    name: "VIDA e Caffè",
    logoSrc: "/brands/vida.png",
    logoAlt: "VIDA e Caffè logo",
    eyebrow: "Franchised coffee retail",
    summary:
      "A premium café franchise known for speed, consistency, and a strong brand standard—where margins are won or lost in labour, wastage, and daily controls.",
    bullets: [
      "High-frequency service + peak-time execution",
      "Daily cash-up discipline and variance control",
      "Stock rhythm: ordering, par, waste, and compliance"
    ],
    tags: ["Coffee", "Franchise", "Unit Economics", "Controls"]
  },
  {
    key: "bootlegger",
    name: "Bootlegger Coffee Company",
    logoSrc: "/brands/bootlegger.png",
    logoAlt: "Bootlegger Coffee Company logo",
    eyebrow: "Café operations + service rhythm",
    summary:
      "A high-volume café concept where throughput, quality, and team standards matter. Great results come from tight routines, training, and consistent customer flow.",
    bullets: [
      "Service rhythm, speed, and customer experience",
      "Labour scheduling and productivity discipline",
      "Quality control under real-time pressure"
    ],
    tags: ["Hospitality", "Operations", "People", "Standards"]
  },
  {
    key: "ultra",
    name: "Ultra Liquors",
    logoSrc: "/brands/ultra-liquors.png",
    logoAlt: "Ultra Liquors logo",
    eyebrow: "Liquor retail execution",
    summary:
      "A liquor retail format where cash control, shrink, and compliance are non-negotiable. Performance is driven by stock flow, promo accuracy, and disciplined routines.",
    bullets: [
      "Shrink prevention and high-control stock systems",
      "Pricing, promotions, and margin protection",
      "Compliance, licensing, and audit-ready operations"
    ],
    tags: ["Liquor", "Stock Flow", "Compliance", "Margin"]
  }
];

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}

function LogoMark({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-10 w-40">
      <Image src={src} alt={alt} fill sizes="160px" className="object-contain" priority={false} />
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-medium tracking-wide text-neutral-700">
            PORTFOLIO
          </div>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Operating experience across grocery, liquor, and café retail
          </h2>

          <p className="mt-4 text-base leading-relaxed text-neutral-600 md:text-lg">
            We don’t list brands to impress. We list them to show the operating environments we’ve
            lived in—where margins are thin, people issues are real, and daily controls decide the
            outcome.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {portfolio.map((item) => (
            <article
              key={item.key}
              className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-700">{item.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
                    {item.name}
                  </h3>
                </div>

                <div className="shrink-0">
                  <LogoMark src={item.logoSrc} alt={item.logoAlt} />
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-neutral-700 md:text-base">
                {item.summary}
              </p>

              <ul className="mt-6 space-y-2 text-sm text-neutral-700">
                {item.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-300" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white px-8 py-10 text-center shadow-sm">
          <p className="mx-auto max-w-3xl text-lg font-semibold italic tracking-tight text-neutral-900 md:text-xl">
            “Experience doesn’t guarantee outcomes, but it does improve judgement.”
          </p>
          <p className="mt-4 text-sm text-neutral-700">
            — <span className="font-medium">Mario Santana</span>
          </p>
        </div>
      </div>
    </section>
  );
}
