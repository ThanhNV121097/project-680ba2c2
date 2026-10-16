import { motion, useReducedMotion } from "framer-motion";
import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import Icon from "../components/Icon";
import MapEmbed from "../components/MapEmbed";
import ContactForm from "../components/ContactForm";
import { digits } from "../components/ContactDock";

const rise = (reduced: boolean | null) =>
  reduced
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } };

/** Contact: how to reach the workshop, the map and hours, the general form, and a separate wholesale block for cafés. */
export default function Contact() {
  usePageMeta("pages.contact.title", "pages.contact.description");
  const reduced = useReducedMotion();
  const phone = useContent<string>("contact.phone");
  const zalo = useContent<string>("contact.zalo");
  const email = useContent<string>("contact.email");
  const address = useContent<string>("contact.address");
  const hours = useContent<string>("contact.hours");

  return (
    <>
      <section className="mx-auto max-w-page px-[var(--gutter)] py-16">
        <T k="pages.contact.eyebrow" as="p" className="text-sm font-medium uppercase tracking-[0.08em] text-accent" />
        <T k="pages.contact.heading" as="h1" className="mt-3 max-w-[22ch] text-[length:var(--size-h1)] leading-[1.05] text-ink" />
      </section>

      <motion.section {...rise(reduced)} className="mx-auto max-w-page px-[var(--gutter)] pb-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col gap-6">
            <T k="pages.contact.detailsHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
            <ul className="flex flex-col gap-4 text-ink">
              <li className="flex items-start gap-3">
                <Icon name="address" className="mt-1 text-accent" />
                <span data-testid="contact-address">{address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="hours" className="mt-1 text-accent" />
                <span data-testid="contact-hours">{hours}</span>
              </li>
              {phone && (
                <li className="flex items-start gap-3">
                  <Icon name="phone" className="mt-1 text-accent" />
                  <a data-testid="contact-phone-link" href={`tel:${digits(phone)}`} className="transition-colors hover:text-accent">{phone}</a>
                </li>
              )}
              {zalo && (
                <li className="flex items-start gap-3">
                  <Icon name="chat" className="mt-1 text-accent" />
                  <a data-testid="contact-zalo-link" href={`https://zalo.me/${digits(zalo)}`} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent">Zalo: {zalo}</a>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-3">
                  <Icon name="mail" className="mt-1 text-accent" />
                  <a href={`mailto:${email}`} className="transition-colors hover:text-accent">{email}</a>
                </li>
              )}
            </ul>
            <div data-testid="contact-map">
              <MapEmbed className="h-72 rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <T k="pages.contact.formHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
              <T k="pages.contact.formSub" as="p" className="mt-2 text-ink-soft" />
            </div>
            <ContactForm className="mt-2" />
          </div>
        </div>
      </motion.section>

      <motion.section {...rise(reduced)} id="wholesale" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-page px-[var(--gutter)] py-20">
          <div className="flex flex-col items-start gap-2 border-l-2 border-accent pl-5">
            <T k="pages.contact.wholesaleHeading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
            <T k="pages.contact.wholesaleSub" as="p" className="max-w-[60ch] text-ink-soft" />
          </div>
          <a href="#wholesale-form" data-testid="wholesale-form-link" className="mt-4 inline-flex items-center gap-2 text-ink transition-colors hover:text-accent">
            <T k="pages.contact.wholesaleLinkLabel" />
            <Icon name="arrow" size={18} />
          </a>
          <div id="wholesale-form" className="mt-8 max-w-lg">
            <ContactForm idPrefix="wholesale" testId="wholesale-form" submitTestId="wholesale-submit" contentKey="contact.wholesaleForm" />
          </div>
        </div>
      </motion.section>
    </>
  );
}
