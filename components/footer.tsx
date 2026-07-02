"use client";

import Link from "next/link";

import { useTranslation } from "@/hooks/use-translation";
import { AnchorLink } from "@/components/anchor-link";
import { Wordmark } from "@/components/wordmark";
import { Code2, Globe, Share2 } from "lucide-react";

const socialLinks = [
  { label: "GitHub", href: "#", icon: Code2 },
  { label: "LinkedIn", href: "#", icon: Share2 },
  { label: "Website", href: "#", icon: Globe },
];

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const className =
    "text-sm text-muted-foreground transition-colors hover:text-foreground";

  if (href.startsWith("#") && href.length > 1) {
    return (
      <AnchorLink href={href} className={className}>
        {label}
      </AnchorLink>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    services: [
      { label: t("nav.items.backend"), href: "#capabilities" },
      { label: t("nav.items.devops"), href: "#capabilities" },
      { label: t("nav.items.frontend"), href: "#capabilities" },
      { label: t("nav.items.distributed"), href: "#capabilities" },
    ],
    resources: [
      { label: t("footer.resources.guide"), href: "#" },
      { label: t("footer.resources.blog"), href: "#" },
      { label: t("footer.resources.docs"), href: "#" },
      { label: t("footer.resources.oss"), href: "#" },
    ],
    company: [
      { label: t("footer.company.about"), href: "#" },
      { label: t("footer.company.caseStudies"), href: "#case-studies" },
      { label: t("footer.company.process"), href: "#process" },
      { label: t("footer.company.contact"), href: "#contact" },
    ],
    legal: [
      { label: t("footer.legal.privacy"), href: "#" },
      { label: t("footer.legal.terms"), href: "#" },
      { label: t("footer.legal.security"), href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border bg-footer">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 grid-cols-2 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" aria-label="TechRuby" className="flex items-center">
              <Wordmark glow={false} />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.brand_desc")}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-ruby/30 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("footer.sections.services")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("footer.sections.resources")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("footer.sections.company")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">{t("footer.sections.legal")}</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:flex-row sm:text-start">
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-xs">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-xs">
            {t("footer.tagline")}
          </p>
        </div>
      </div>
    </footer>
  );
}
