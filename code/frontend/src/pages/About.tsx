import { motion, useReducedMotion } from "framer-motion";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Grid from "../components/Grid";
import Icon from "../components/Icon";

interface TeamRow { id: string; role: string; bio: string; image: string }

const rise = (reduced: boolean | null) =>
  reduced
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } };

/** The story of the workshop, in two alternating photo/text blocks, then the team. */
export default function About() {
  usePageMeta("pages.about.title", "pages.about.description");
  const reduced = useReducedMotion();
  const { items: team } = useCollection<TeamRow>("team", { pageSize: 6 });

  return (
    <>
      <section className="mx-auto max-w-page px-[var(--gutter)] py-16">
        <T k="pages.about.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-accent" />
        <T k="pages.about.heading" as="h1" className="mt-3 max-w-[20ch] text-[length:var(--size-h1)] leading-[1.05] text-ink" />
        <T k="pages.about.intro" as="p" className="mt-4 max-w-[64ch] text-lg text-ink-soft" />
      </section>

      <motion.section {...rise(reduced)} className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-page gap-10 px-[var(--gutter)] py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Picture src="/images/dalat-highlands.jpg" alt="Misty highlands above Đà Lạt where the coffee is grown" className="aspect-[4/3] w-full rounded object-cover" />
          <div className="flex flex-col items-start gap-3 border-l-2 border-accent pl-5">
            <T k="pages.about.body1Heading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
            <T k="pages.about.body1" as="p" className="max-w-[48ch] text-ink-soft" />
          </div>
        </div>
      </motion.section>

      <motion.section {...rise(reduced)} className="mx-auto max-w-page px-[var(--gutter)] py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="order-2 flex flex-col items-start gap-3 border-l-2 border-accent pl-5 lg:order-1">
            <T k="pages.about.body2Heading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
            <T k="pages.about.body2" as="p" className="max-w-[48ch] text-ink-soft" />
          </div>
          <Picture src="/images/pour-over.jpg" alt="A pour-over being brewed at the tasting bar" className="order-1 aspect-[4/5] w-full rounded object-cover lg:order-2" />
        </div>
      </motion.section>

      <motion.section {...rise(reduced)} className="border-t border-line">
        <div className="mx-auto max-w-page px-[var(--gutter)] py-20">
          <div className="flex flex-col items-start gap-2 border-l-2 border-accent pl-5">
            <T k="pages.about.teamEyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-ink-soft" />
            <T k="pages.about.teamHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
          </div>
          <Grid max={3} phone={1} className="mt-10">
            {team.map((member) => (
              <article key={member.id} data-record={`team:${member.id}`} className="flex w-full flex-col gap-3">
                <div className="aspect-[4/3] w-full overflow-hidden rounded bg-[var(--product-ground)]">
                  <Picture src={member.image} alt={member.role} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center gap-2 text-ink">
                  <Icon name="people" size={18} />
                  <h3 className="font-display text-lg text-ink">{member.role}</h3>
                </div>
                <p className="text-ink-soft">{member.bio}</p>
              </article>
            ))}
          </Grid>
        </div>
      </motion.section>
    </>
  );
}
