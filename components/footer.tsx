import Link from "next/link";

import { AnchorLink } from "@/components/anchor-link";
import { Code2, Globe, Share2 } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Backend Engineering", href: "#capabilities" },
    { label: "DevOps & Cloud", href: "#capabilities" },
    { label: "Frontend Systems", href: "#capabilities" },
    { label: "Distributed Systems", href: "#capabilities" },
  ],
  resources: [
    { label: "Architecture Guide", href: "#" },
    { label: "Engineering Blog", href: "#" },
    { label: "System Design Docs", href: "#" },
    { label: "Open Source", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

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
  return (
    <footer className="border-t border-border bg-footer">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="flex size-8 items-center justify-center rounded-lg bg-ruby/15 ring-1 ring-ruby/30"
              >
                <span className="size-3 rounded-full bg-ruby" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Ruby<span className="text-ruby">Tech</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium software engineering services for teams building
              mission-critical systems at scale.
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
            <h3 className="text-sm font-semibold">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} RubyTech. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Built with precision. Deployed with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
}
