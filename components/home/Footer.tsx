"use client";

import { useSearchParams } from "next/navigation";
import { Facebook, Instagram } from "lucide-react";
import TransitionLink from "@/components/TransitionLink";

type HomeFooterProps = {
  storeDescription: string;
  instagramUrl: string;
  facebookUrl: string;
};

export default function HomeFooter({ storeDescription, instagramUrl, facebookUrl }: HomeFooterProps) {
  const currentYear = new Date().getFullYear();
  const searchParams = useSearchParams();
  const language = searchParams?.get("lang");

  const withLanguage = (href: string) => {
    if (!href.startsWith("/")) return href;
    if (!language) return href;
    const separator = href.includes("?") ? "&" : "?";
    return `${href}${separator}lang=${language}`;
  };

  return (
    <footer className="bg-[#5f724f] py-12 text-white">
      <div className="container">
        <div className="grid gap-8 text-center md:grid-cols-[1.2fr_0.8fr_0.8fr] md:text-left">
          <div>
            <TransitionLink href={withLanguage("/")} className="inline-flex items-center">
              <img src="/svg/logo-light.svg" alt="V Dental Clinics" width="150" height="60" className="h-12 w-auto" />
            </TransitionLink>
            <p className="mt-4 text-sm text-white/80">
              <span className="font-semibold text-white">V Dental Clinics</span>{" "}
              <span data-translate="footer.tagline">{storeDescription}</span>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 list-none p-0 text-sm text-white/80">
              <li>
                <TransitionLink href={withLanguage("/")} className="text-white/90 hover:text-white">Home</TransitionLink>
              </li>
              <li>
                <TransitionLink href={withLanguage("/about")} className="text-white/90 hover:text-white">About</TransitionLink>
              </li>
              <li>
                <TransitionLink href={withLanguage("/before-after")} className="text-white/90 hover:text-white" data-translate="nav.before_after">
                  Before & After
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href={withLanguage("/blogs")} className="text-white/90 hover:text-white">Blogs</TransitionLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Social</h4>
            <div className="mt-4 flex items-center justify-center gap-3 text-white/90 md:justify-start">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white/90 transition-colors hover:border-white hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={facebookUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white/90 transition-colors hover:border-white hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-white/30 pt-6 text-center text-xs uppercase tracking-[0.18em] text-white/70 md:justify-between md:text-left">
          <p>
            © {currentYear} <span className="text-white">V Dental Clinics</span>
          </p>
          <span data-translate="footer.copyright">All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}

