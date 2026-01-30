"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/unified-data";
import { applyLanguage } from "@/lib/language-client";
import TransitionLink from "@/components/TransitionLink";

type HomeHeaderProps = {
  phone: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  whatsappUrl: string;
  language: Language;
};

const navItems = [
  { href: "/", label: "Home", translateKey: "nav.home" },
  { href: "/about", label: "About", translateKey: "nav.about" },
  { href: "/blogs", label: "Blogs", translateKey: "nav.blogs" },
];

export default function HomeHeader({
  phone,
  email,
  instagramUrl,
  facebookUrl,
  whatsappUrl,
  language,
}: HomeHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeLanguage, setActiveLanguage] = useState<Language>(language);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const normalizeLanguage = (value: string | null): Language | null => {
    if (value === "ar") return "ar";
    if (value === "en") return "en";
    return null;
  };

  const withLanguage = (href: string) => {
    if (!href.startsWith("/")) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}lang=${activeLanguage}`;
  };

  const syncLanguage = useCallback(
    (nextLanguage: Language) => {
    setActiveLanguage(nextLanguage);
    applyLanguage(nextLanguage);

    const params = new URLSearchParams(searchParams?.toString());
    params.set("lang", nextLanguage);
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    setActiveLanguage(language);
  }, [language]);

  useEffect(() => {
    const saved = normalizeLanguage(typeof window !== "undefined" ? localStorage.getItem("language") : null);
    const urlLanguage = normalizeLanguage(searchParams?.get("lang"));

    if (!urlLanguage && saved && saved !== activeLanguage) {
      syncLanguage(saved);
      return;
    }

    if (urlLanguage && urlLanguage !== activeLanguage) {
      setActiveLanguage(urlLanguage);
      applyLanguage(urlLanguage);
    }
  }, [activeLanguage, searchParams, syncLanguage]);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 16) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 6) {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (megaRef.current && !megaRef.current.contains(target) && triggerRef.current && !triggerRef.current.contains(target)) {
        setIsMegaOpen(false);
      }
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMegaOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setIsMegaOpen(false);
    }
  }, [isVisible]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (sidebarRef.current && !sidebarRef.current.contains(target) && !target.closest('[data-mobile-menu-button]')) {
        setIsMobileMenuOpen(false);
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClick);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileServicesOpen) {
        setIsMobileServicesOpen(false);
      }
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isMobileServicesOpen]);

  const serviceCards = [
    {
      title: "Cosmetic Dentistry",
      description: "Brighten your smile with veneers, whitening, and aesthetic treatments.",
      emoji: "✨",
      href: "#services",
    },
    {
      title: "Dental Implants",
      description: "Restore missing teeth with durable, natural-looking implants.",
      emoji: "🦷",
      href: "#services",
    },
    {
      title: "Orthodontics",
      description: "Align your teeth with modern, comfortable orthodontic care.",
      emoji: "📐",
      href: "#services",
    },
    {
      title: "Pediatric Dentistry",
      description: "Gentle, friendly care tailored for children.",
      emoji: "🧒",
      href: "#services",
    },
  ];

  const toolChips = [
    { label: "Teeth Whitening", href: "#services" },
    { label: "Root Canal", href: "#services" },
    { label: "Dental Cleaning", href: "#services" },
  ];

  return (
    <>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-[#5f724f] text-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/20 p-6">
              <TransitionLink href={withLanguage("/")} className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
              <Image src="/svg/logo-light.svg" alt="V Dental Clinics" width={200} height={60} className="h-12 w-auto" priority />
              </TransitionLink>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm transition-colors hover:bg-white/20 active:scale-95"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col gap-1">
              {navItems.map((item) =>
                item.label === "Services" ? (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setIsMobileServicesOpen(true)}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:bg-white/15"
                  >
                    {item.label}
                    <span>▾</span>
                  </button>
                ) : (
                  <TransitionLink
                    key={item.label}
                    href={withLanguage(item.href)}
                    className="rounded-lg px-4 py-3 text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:bg-white/15 text-white/90 hover:text-white"
                    onClick={() => {
                      setIsMegaOpen(false);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span data-translate={item.translateKey}>{item.label}</span>
                  </TransitionLink>
                )
              )}
            </div>
          </nav>

          <div className="space-y-3 border-t border-white/20 p-6">
            <Button variant="outline" size="sm" className="w-full justify-center border-white/40 text-white hover:bg-white/15" asChild>
              <a href={`tel:+${phone}`} data-translate="button.call_now">
                Call Now
              </a>
            </Button>
            <Button
              size="sm"
              className="w-full justify-center rounded-full bg-white px-5 text-[#5f724f] shadow-sm hover:bg-[#efe9d7]"
              asChild
            >
              <a href={whatsappUrl} data-translate="button.appointment">
                Appointment
              </a>
            </Button>
          </div>
        </div>
      </div>

      {isMobileServicesOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileServicesOpen(false)} />
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#5f724f] shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/20 p-6">
                <h2 className="text-xl font-semibold text-white uppercase tracking-[0.08em]">Services</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileServicesOpen(false);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm transition-colors hover:bg-white/20 active:scale-95"
                  aria-label="Close menu"
                >
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto p-6">
                <div className="grid gap-4">
                  {serviceCards.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="block rounded-xl border border-white/20 bg-white/10 p-5 transition-colors hover:bg-white/15"
                      onClick={() => {
                        setIsMobileServicesOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl flex-shrink-0">
                          {service.emoji}
                        </span>
                        <h3 className="text-base font-semibold text-white">{service.title}</h3>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{service.description}</p>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-white/20 pt-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                    Quick links:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {toolChips.map((chip) => (
                      <Link
                        key={chip.label}
                        href={chip.href}
                      className="inline-flex items-center rounded-full border border-white/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/90 transition-colors hover:border-white hover:text-white"
                        onClick={() => {
                          setIsMobileServicesOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {chip.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-6 sm:px-6 lg:px-8">
        <header
          className={`relative w-full max-w-6xl rounded-3xl border border-white/15 bg-[#5f724f] px-6 py-5 text-white backdrop-blur transition-all duration-300 sm:px-8 lg:px-10 ${
            isVisible && !isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          }`}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="flex items-center justify-between">
              <TransitionLink href={withLanguage("/")} className="flex items-center">
                <div className="flex items-center">
                  <Image src="/svg/logo-light.svg" alt="V Dental Clinics" width={220} height={60} className="h-12 w-auto object-contain" priority />
                </div>
              </TransitionLink>

              <div className="flex items-center gap-3 lg:hidden">
                <div className="lang-switch-container">
                  <button
                    type="button"
                    onClick={() => syncLanguage("en")}
                    className={`lang-switch-button lang-switch-button--compact ${
                      activeLanguage === "en" ? "lang-switch-button--active" : ""
                    }`}
                    aria-pressed={activeLanguage === "en"}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => syncLanguage("ar")}
                    className={`lang-switch-button lang-switch-button--compact ${
                      activeLanguage === "ar" ? "lang-switch-button--active" : ""
                    }`}
                    aria-pressed={activeLanguage === "ar"}
                  >
                    AR
                  </button>
                </div>
                <button
                  data-mobile-menu-button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-sm transition-colors hover:bg-white/20 active:scale-95"
                  aria-label="Open menu"
                >
                  <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            <nav className="hidden flex-1 flex-wrap items-center justify-between gap-4 text-sm font-medium uppercase tracking-[0.08em] md:text-base lg:flex">
              <div className="flex flex-wrap items-center gap-6">
                {navItems.map((item) =>
                  item.label === "Services" ? (
                    <button
                      key={item.label}
                      ref={triggerRef}
                      type="button"
                      onClick={() => setIsMegaOpen((prev) => !prev)}
                      aria-expanded={isMegaOpen}
                      className="flex items-center gap-1 text-white/90 hover:text-white"
                    >
                      {item.label}
                      <span className={`transition-transform duration-200 ${isMegaOpen ? "rotate-180" : ""}`}>▾</span>
                    </button>
                  ) : (
                    <TransitionLink
                      key={item.label}
                      href={withLanguage(item.href)}
                      className="text-white/90 hover:text-white"
                      onClick={() => setIsMegaOpen(false)}
                    >
                    <span data-translate={item.translateKey}>{item.label}</span>
                    </TransitionLink>
                  )
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="lang-switch-container">
                  <button
                    type="button"
                    onClick={() => syncLanguage("en")}
                    className={`lang-switch-button lang-switch-button--compact ${
                      activeLanguage === "en" ? "lang-switch-button--active" : ""
                    }`}
                    aria-pressed={activeLanguage === "en"}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => syncLanguage("ar")}
                    className={`lang-switch-button lang-switch-button--compact ${
                      activeLanguage === "ar" ? "lang-switch-button--active" : ""
                    }`}
                    aria-pressed={activeLanguage === "ar"}
                  >
                    AR
                  </button>
                </div>
                <Button variant="outline" size="sm" className="border-white/40 text-white hover:bg-white/15" asChild>
                  <a href={`tel:+${phone}`} data-translate="button.call_now">
                    Call Now
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-white px-5 text-[#5f724f] shadow-sm hover:bg-[#efe9d7]"
                  asChild
                >
                  <a href={whatsappUrl} data-translate="button.appointment">
                    Appointment
                  </a>
                </Button>
              </div>
            </nav>
          </div>

          <div
            ref={megaRef}
            className={`absolute left-1/2 top-full z-40 mt-4 hidden w-[calc(100%+1rem)] max-w-4xl -translate-x-1/2 transition-all duration-200 lg:block ${
              isMegaOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="rounded-2xl border border-black/10 bg-white p-4 text-[#0f172a] shadow-[0_20px_60px_rgba(15,23,42,0.15)] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Our Services</p>

              <div className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-fr">
                {serviceCards.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="block rounded-xl border border-black/5 bg-[#f8f9fb] p-4 shadow-sm transition-colors hover:border-black/10 hover:shadow-md sm:p-5"
                    onClick={() => setIsMegaOpen(false)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-base sm:h-10 sm:w-10 sm:text-lg flex-shrink-0">
                        {service.emoji}
                      </span>
                      <h3 className="text-sm font-semibold sm:text-base lg:text-lg">{service.title}</h3>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-black/60 sm:mt-3 sm:text-sm">{service.description}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-4 space-y-2 sm:mt-6 sm:space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">Quick links</p>
                <div className="flex flex-wrap gap-2">
                  {toolChips.map((chip) => (
                    <Link
                      key={chip.label}
                      href={chip.href}
                      className="inline-flex items-center rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-black/70 transition-colors hover:border-black/30 hover:text-black sm:px-3 sm:py-1.5 sm:text-xs"
                      onClick={() => setIsMegaOpen(false)}
                    >
                      {chip.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

