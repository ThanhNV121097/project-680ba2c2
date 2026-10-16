import { motion, useReducedMotion } from "framer-motion";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { formatPrice } from "../lib/format";
import ProductImage from "../components/ProductImage";

interface CoffeeRow {
  id: string;
  name: string;
  kind: string;
  origin: string;
  process: string;
  roast: string;
  note: string;
  priceWhole: number;
  priceGround: number;
  image: string;
}

const rise = (reduced: boolean | null, delay = 0) =>
  reduced
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] } };

/** The coffee list: a left-aligned ledger, origin name large and left, price right-aligned. */
export default function Coffee() {
  usePageMeta("pages.coffee.title", "pages.coffee.description");
  const reduced = useReducedMotion();
  const { items, total, loading } = useCollection<CoffeeRow>("coffees", { pageSize: 12 });
  const singles = items.filter((c) => c.kind === "Single origin");
  const blends = items.filter((c) => c.kind === "Blend");

  return (
    <>
      <section className="mx-auto max-w-page px-[var(--gutter)] py-16">
        <T k="pages.coffee.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-accent" />
        <T k="pages.coffee.heading" as="h1" className="mt-3 max-w-[20ch] text-[length:var(--size-h1)] leading-[1.05] text-ink" />
        <T k="pages.coffee.sub" as="p" className="mt-4 max-w-[60ch] text-lg text-ink-soft" />
        <p className="mt-2 text-sm text-ink-soft">{loading ? "…" : total} coffees</p>
      </section>

      <section className="mx-auto max-w-page px-[var(--gutter)] pb-10">
        <T k="pages.coffee.singleOrigin" as="h2" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
        <div data-testid="coffee-list" className="mt-6 flex flex-col divide-y divide-line border-t border-line">
          {singles.map((c, i) => (
            <Row key={c.id} c={c} index={i} reduced={reduced} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-page px-[var(--gutter)] pb-20 pt-6">
        <T k="pages.coffee.blend" as="h2" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
        <div className="mt-6 flex flex-col divide-y divide-line border-t border-line">
          {blends.map((c, i) => (
            <Row key={c.id} c={c} index={singles.length + i} reduced={reduced} />
          ))}
        </div>
      </section>
    </>
  );
}

function Row({ c, index, reduced }: { c: CoffeeRow; index: number; reduced: boolean | null }) {
  return (
    <motion.article {...rise(reduced, Math.min(index, 4) * 0.05)} data-record={`coffees:${c.id}`}
      className="flex flex-col gap-6 py-8 sm:flex-row sm:items-start">
      <ProductImage src={c.image || null} alt={c.name} aspect="1/1" slot={`/images/products/${c.id}.png`} className="w-full sm:w-40" />
      <div className="flex flex-1 flex-col gap-2">
        <h3 className="font-display text-2xl font-[var(--weight-display)] tracking-[var(--tracking-display)] text-ink">{c.name}</h3>
        <p className="text-sm text-ink-soft">{c.origin} · {c.process} · {c.roast} roast</p>
        <p className="max-w-[60ch] text-ink-soft">{c.note}</p>
      </div>
      <div className="flex shrink-0 flex-row justify-between gap-6 sm:flex-col sm:items-end sm:text-right">
        <div>
          <p className="text-xs uppercase tracking-[0.06em] text-ink-soft"><T k="pages.coffee.wholeLabel" /> · <T k="pages.coffee.unit" /></p>
          <p data-testid={`coffee-price-${index}`} className="text-right font-display text-lg text-ink">{formatPrice(c.priceWhole)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.06em] text-ink-soft"><T k="pages.coffee.groundLabel" /> · <T k="pages.coffee.unit" /></p>
          <p className="text-right font-display text-lg text-ink">{formatPrice(c.priceGround)}</p>
        </div>
      </div>
    </motion.article>
  );
}
