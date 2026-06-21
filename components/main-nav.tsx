"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

import { AnchorLink } from "@/components/anchor-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const services = [
  { label: "Backend Engineering", href: "#capabilities" },
  { label: "DevOps & Cloud", href: "#capabilities" },
  { label: "Frontend Systems", href: "#capabilities" },
  { label: "Microservices", href: "#capabilities" },
  { label: "Distributed Systems", href: "#capabilities" },
];

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Architecture", href: "#engine" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Process", href: "#process" },
];

export function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        aria-label="Main navigation"
        className="glass-strong mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-lg bg-ruby/15 ring-1 ring-ruby/30"
          >
            <span className="size-3 rounded-full bg-ruby ruby-glow" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Ruby<span className="text-ruby">Tech</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-hover hover:text-foreground"
              >
                Services
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
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <AnchorLink href="#contact">Contact</AnchorLink>
          </Button>
          <Button size="sm" asChild>
            <AnchorLink href="#contact">Schedule Discovery</AnchorLink>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
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
          "glass-strong mx-4 mt-2 overflow-hidden rounded-2xl transition-all duration-300 md:hidden",
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
              Schedule Discovery
            </AnchorLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
