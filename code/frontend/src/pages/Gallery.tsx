import { motion, useReducedMotion } from "framer-motion";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";

interface ShotRow { id: string; caption: string; image: string }

/** The workshop in pictures: a large, uneven grid — never a uniform three-up row. */
export default function Gallery() {
  usePageMeta("pages.gallery.title", "pages.gallery.description");
  const reduced = useReducedMotion();
  const { items } = useCollection<ShotRow>("gallery", { pageSize: 12 });

  return (
    <section className="mx-auto max-w-page px-[var(--gutter)] py-16">
      <T k="pages.gallery.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-accent" />
      <T k="pages.gallery.heading" as="h1" className="mt-3 max-w-[20ch] text-[length:var(--size-h1)] leading-[1.05] text-ink" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {items.map((s, i) => {
          // The big tile costs four cells, every other one. With eight
          // pictures that left the last row two cells short — a hole in the
          // bottom corner. The last picture takes exactly what is missing,
          // so the grid ends flush however many there are.
          const big = i % 5 === 0;
          const cells = items.reduce((n, _, j) => n + (j % 5 === 0 ? 4 : 1), 0);
          const short = (4 - (cells % 4)) % 4;
          const last = i === items.length - 1 && !big && short > 0;
          const tail = last ? ["", "sm:col-span-2", "sm:col-span-3", "sm:col-span-4"][short] : "";
          return (
          <motion.figure
            key={s.id}
            data-record={`gallery:${s.id}`}
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
            className={`overflow-hidden rounded ${big ? "col-span-2 row-span-2" : `col-span-1 ${tail}`}`}
          >
            <Picture src={s.image} alt={s.caption} caption={s.caption} className="h-full w-full object-cover aspect-square" />
            <figcaption className="mt-2 text-sm text-ink-soft">{s.caption}</figcaption>
          </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
