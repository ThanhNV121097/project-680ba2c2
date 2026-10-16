import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { T, useList, useContent } from "./editable";
import Home from "./pages/Home";
import Coffee from "./pages/Coffee";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Logo from "./components/Logo";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import ThemeToggle from "./components/ThemeToggle";
import ContactDock from "./components/ContactDock";
import PhotoCredits from "./components/PhotoCredits";
import SocialIcon from "./components/SocialIcon";

const NAV_TESTID: Record<string, string> = {
  "/": "nav-home",
  "/coffee": "nav-coffee",
  "/about": "nav-about",
  "/gallery": "nav-gallery",
  "/contact": "nav-contact",
};

export default function App() {
  const links = useList<{ label: string; href: string }>("nav.links");
  const name = useContent("site.name");
  const zalo = useContent<string>("contact.zalo");
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-ground text-ink font-body">
      <header className="sticky top-0 z-30 border-b border-line bg-ground/95 backdrop-blur">
        <div className="mx-auto flex h-[var(--header-h)] max-w-page items-center justify-between px-[var(--gutter)]">
          <Link to="/" aria-label={name} onClick={() => setOpen(false)}><Logo /></Link>
          <nav className="hidden items-center gap-8 text-sm lg:flex">
            {links.map((l, i) => (
              <Link key={i} to={l.href} data-testid={NAV_TESTID[l.href]}
                className={`transition-colors hover:text-accent ${pathname === l.href ? "text-ink" : "text-ink-soft"}`}>
                <T k={`nav.links.${i}.label`} />
              </Link>
            ))}
            <Link to="/contact" className="rounded bg-accent px-4 py-2 text-sm text-accent-ink transition-opacity hover:opacity-90">
              <T k="nav.cta.label" />
            </Link>
            <ThemeToggle />
          </nav>
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {links.map((l, i) => (
          <Link key={i} to={l.href} onClick={() => setOpen(false)} data-testid={`mobile-${NAV_TESTID[l.href]}`}
            className="text-2xl text-ink">
            <T k={`nav.links.${i}.label`} />
          </Link>
        ))}
        <Link to="/contact" onClick={() => setOpen(false)}
          className="mt-4 inline-block rounded bg-accent px-6 py-3 text-lg text-accent-ink">
          <T k="nav.cta.label" />
        </Link>
      </MobileMenu>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-page px-[var(--gutter)] py-12">
          <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
            <div className="flex flex-col gap-3">
              <Logo />
              <T k="footer.line" as="p" className="max-w-[32ch] text-sm text-ink-soft" />
              {zalo && (
                <div className="flex gap-3 pt-1">
                  <a href={`https://zalo.me/${zalo.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" aria-label="Zalo" className="text-ink-soft transition-colors hover:text-accent">
                    <SocialIcon network="zalo" />
                  </a>
                </div>
              )}
            </div>
            <nav className="flex flex-col gap-2 text-sm">
              <T k="footer.linksHeading" as="span" className="text-ink-soft" />
              {links.map((l, i) => (
                <Link key={i} to={l.href} className="text-ink transition-colors hover:text-accent">
                  <T k={`nav.links.${i}.label`} />
                </Link>
              ))}
            </nav>
          </div>
          <PhotoCredits className="mt-10 border-t border-line pt-6" />
        </div>
      </footer>
      <ContactDock />
    </div>
  );
}
