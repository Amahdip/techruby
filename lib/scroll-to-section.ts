export const SECTION_SCROLL_OFFSET = 112;

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;

  const top =
    element.getBoundingClientRect().top +
    window.scrollY -
    SECTION_SCROLL_OFFSET;

  window.scrollTo({ top, behavior: "smooth" });
  window.history.pushState(null, "", `#${id}`);

  return true;
}
