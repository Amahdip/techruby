"use client";

import { useEffect, type AnchorHTMLAttributes, type MouseEvent } from "react";

import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";

type AnchorLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export function AnchorLink({
  href,
  onClick,
  className,
  children,
  ...props
}: AnchorLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !href.startsWith("#") || href === "#") return;

    event.preventDefault();
    scrollToSection(href.slice(1));
  };

  return (
    <a href={href} onClick={handleClick} className={cn(className)} {...props}>
      {children}
    </a>
  );
}

export function HashScrollHandler() {
  useEffect(() => {
    const scrollFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (id) scrollToSection(id);
    };

    scrollFromHash();
    window.addEventListener("hashchange", scrollFromHash);

    return () => window.removeEventListener("hashchange", scrollFromHash);
  }, []);

  return null;
}
