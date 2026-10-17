import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { T } from "../editable";
import { useCollection } from "../data";
import { formatPrice } from "../lib/format";
import ProductImage from "../components/ProductImage";
import Grid from "../components/Grid";
import Icon from "../components/Icon";
import { Picture } from "../picture";

const rise = (reduced: boolean | null, delay = 0) =>
  reduced
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] } };

/** The home page: hero, a taste of the coffee list, the workshop, wholesale, and the gallery. */
export default function Home() {
  const reduced = useReducedMotion();
  const { items: coffees } = useCollection<{ id: string; name: string; kind: string; origin: string; note: string; priceWhole: number; image: string }>("coffees", { pageSize: 4 });
  const { items: shots } = useCollection<{ id: string; caption: string; image: string }>("gallery", { pageSize: 3 });

  return (
    <>
      {/* Hero — fits one 1440×790 screen; the roasting-room photo bleeds to both edges behind the text. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Picture src="/images/hero-roaster.jpg" alt="Inside the roasting workshop, a drum roaster at work" className="h-full w-full object-cover" loading="eager" />
          {/* The words sit on ground they can be read against: solid to 38%,
              still 72% where the sub-line ends, and only then opening out so
              the roaster is seen. The sub-line used to run to 46ch, well past
              where this fell to 10%, and crossed the beans. */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--ground)_0%,var(--ground)_38%,color-mix(in_srgb,var(--ground)_72%,transparent)_58%,color-mix(in_srgb,var(--ground)_12%,transparent)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ground)]/80 via-transparent to-transparent lg:hidden" />
        </div>
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative mx-auto flex min-h-[calc(100vh-var(--header-h))] max-w-page flex-col justify-center gap-6 px-[var(--gutter)] py-16 lg:min-h-[calc(90vh-var(--header-h))]"
        >
          <T k="hero.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-accent" />
          <T k="hero.headline" as="h1" className="max-w-[16ch] text-[length:var(--size-h1)] leading-[1.05] text-ink" />
          <T k="hero.sub" as="p" className="max-w-[34ch] text-[length:var(--size-lead)] leading-[1.5] text-ink-soft" />
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/coffee" data-testid="hero-cta" className="whitespace-nowrap rounded bg-accent px-6 py-3 text-accent-ink transition-opacity hover:opacity-90">
              <T k="hero.cta.label" />
            </Link>
            <Link to="/contact#wholesale" className="whitespace-nowrap rounded border border-line px-6 py-3 text-ink transition-colors hover:border-accent hover:text-accent">
              <T k="hero.ctaSecondary.label" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* The coffee — a taste of the full list. */}
      <motion.section {...rise(reduced)} className="mx-auto max-w-page px-[var(--gutter)] py-20">
        <div className="flex flex-col items-start gap-2 border-l-2 border-accent pl-5">
          <T k="home.coffeeEyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
          <T k="home.coffeeHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
          <T k="home.coffeeSub" as="p" className="max-w-[52ch] text-[length:var(--size-lead)] leading-[1.5] text-ink-soft" />
        </div>
        <Grid max={4} phone={2} className="mt-10">
          {coffees.map((c) => (
            <article key={c.id} data-record={`coffees:${c.id}`} className="flex w-full flex-col gap-3">
              <ProductImage src={c.image || null} alt={c.name} aspect="1/1" slot={`/images/products/${c.id}.png`} />
              <p className="text-xs uppercase tracking-[0.06em] text-accent">{c.kind}</p>
              <h3 className="font-display text-[length:var(--size-h3)] font-[var(--weight-display)] tracking-[var(--tracking-display)] text-ink">{c.name}</h3>
              <p className="text-right font-display text-ink">{formatPrice(c.priceWhole)}</p>
            </article>
          ))}
        </Grid>
        <Link to="/coffee" className="mt-10 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent">
          <T k="home.coffeeCta" />
          <Icon name="arrow" size={18} />
        </Link>
      </motion.section>

      {/* The workshop. */}
      <motion.section {...rise(reduced)} className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-page gap-10 px-[var(--gutter)] py-20 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Picture src="/images/sorting-beans.jpg" alt="Hands sorting green coffee beans at the workshop" className="aspect-[4/3] w-full rounded object-cover" />
          <div className="flex flex-col items-start gap-2 border-l-2 border-accent pl-5">
            <T k="home.aboutEyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
            <T k="home.aboutHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
            <T k="home.aboutBody" as="p" className="max-w-[48ch] text-ink-soft" />
            <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent">
              <T k="home.aboutCta" />
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Wholesale for cafés. */}
      <motion.section {...rise(reduced)} className="mx-auto max-w-page px-[var(--gutter)] py-20">
        <div className="flex flex-col items-start gap-4 rounded border border-line bg-surface p-8 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="flex flex-col items-start gap-2 border-l-2 border-accent pl-5">
            <T k="home.wholesaleEyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
            <T k="home.wholesaleHeading" as="h2" className="max-w-[24ch] text-[length:var(--size-h2)] text-ink" />
            <T k="home.wholesaleBody" as="p" className="max-w-[48ch] text-ink-soft" />
          </div>
          <Link to="/contact#wholesale" data-testid="wholesale-form-link-home" className="whitespace-nowrap rounded bg-accent px-6 py-3 text-accent-ink transition-opacity hover:opacity-90">
            <T k="home.wholesaleCta" />
          </Link>
        </div>
      </motion.section>

      {/* Gallery teaser. */}
      <motion.section {...rise(reduced)} className="border-t border-line">
        <div className="mx-auto max-w-page px-[var(--gutter)] py-20">
          <div className="flex flex-col items-start gap-2 border-l-2 border-accent pl-5">
            <T k="home.galleryEyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
            <T k="home.galleryHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {shots.map((s, i) => (
              <div key={s.id} data-record={`gallery:${s.id}`} className={`overflow-hidden rounded ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <Picture src={s.image} alt={s.caption} className="h-full w-full object-cover aspect-[4/3]" />
              </div>
            ))}
          </div>
          <Link to="/gallery" className="mt-10 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent">
            <T k="home.galleryCta" />
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      </motion.section>
    </>
  );
}
