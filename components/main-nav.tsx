"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

import { AnchorLink } from "@/components/anchor-link";
import { PremiumButton } from "@/components/ui/premium-button";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/wordmark";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const { t, locale, setLocale } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const services = [
    { label: t("nav.items.backend"), href: "#capabilities" },
    { label: t("nav.items.devops"), href: "#capabilities" },
    { label: t("nav.items.frontend"), href: "#capabilities" },
    { label: t("nav.items.microservices"), href: "#capabilities" },
    { label: t("nav.items.distributed"), href: "#capabilities" },
  ];

  const navLinks = [
    { label: t("nav.capabilities"), href: "#capabilities" },
    { label: t("nav.architecture"), href: "#engine" },
    { label: t("nav.caseStudies"), href: "#case-studies" },
    { label: t("nav.process"), href: "#process" },
  ];

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 px-0 sm:px-3">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-6xl items-center justify-between border-b border-border/60 bg-background/95 px-4 py-3 shadow-sm backdrop-blur-md sm:mt-4 sm:w-[calc(100%-3rem)] sm:rounded-2xl sm:border sm:bg-[var(--glass-strong-bg)] sm:shadow-none sm:backdrop-blur-xl sm:px-6"
      >
        <Link href="/" aria-label="TechRuby" className="flex items-center">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
              >
                {t("nav.services")}
                <ChevronDown className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              {services.map((service) => (
                <DropdownMenuItem key={service.label} asChild>
                  <AnchorLink href={service.href}>{service.label}</AnchorLink>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((link) => (
            <AnchorLink
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
            >
              {link.label}
            </AnchorLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => setLocale(locale === "en" ? "fa" : "en")}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-panel-muted text-xs font-bold tracking-wider text-muted-foreground hover:bg-hover hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Toggle language"
          >
            {locale === "en" ? "FA" : "EN"}
          </button>
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <AnchorLink href="#contact">{t("nav.contact")}</AnchorLink>
          </Button>
          <PremiumButton href="#contact" size="default">
            {t("nav.schedule")}
          </PremiumButton>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            onClick={() => setLocale(locale === "en" ? "fa" : "en")}
            className="inline-flex size-10 items-center justify-center rounded-lg text-xs font-bold tracking-wider text-muted-foreground hover:bg-hover hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Toggle language"
          >
            {locale === "en" ? "FA" : "EN"}
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "mx-0 mt-2 overflow-hidden border-b border-border/60 bg-background/95 transition-all duration-300 backdrop-blur-md md:hidden sm:mx-3 sm:rounded-2xl sm:border sm:bg-[var(--glass-strong-bg)] sm:backdrop-blur-xl",
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <AnchorLink
              key={link.href}
              href={link.href}
              onClick={handleMobileNavClick}
              className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
            >
              {link.label}
            </AnchorLink>
          ))}
          <Button className="mt-2 w-full" asChild>
            <AnchorLink href="#contact" onClick={handleMobileNavClick}>
              {t("nav.schedule")}
            </AnchorLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
