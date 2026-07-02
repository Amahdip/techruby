"use client";

import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

/**
 * Brand wordmark. Renders the ruby dot mark plus a LOCALE-AWARE logotype:
 * Latin "TechRuby" for English, Farsi «تک‌روبی» for Persian (the Farsi logotype
 * was previously missing — the header/footer always showed the Latin form).
 * Extracted so the nav + footer share one source of truth.
 */
export function Wordmark({ glow = true }: { glow?: boolean }) {
  const { locale } = useTranslation();

  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="flex size-8 items-center justify-center rounded-lg bg-ruby/15 ring-1 ring-ruby/30">
        <span className={cn("size-3 rounded-full bg-ruby", glow && "ruby-glow")} />
      </span>
      <span className="text-lg font-semibold" aria-label="TechRuby">
        {locale === "fa" ? (
          <>
            تک‌<span className="text-ruby">روبی</span>
          </>
        ) : (
          <>
            Tech<span className="text-ruby">Ruby</span>
          </>
        )}
      </span>
    </span>
  );
}
