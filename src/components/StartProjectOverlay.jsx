/**
 * Fixed overlay — links to tronzlabs.com/contact with this template in the form message.
 * Same query shape as the main site Lab → Contact flow.
 */
const TEMPLATE_TITLE = "Maison Seven";
const TEMPLATE_DESCRIPTION =
  "Interior design studio template with elegant visual hierarchy.";

const CONTACT_HREF = (() => {
  const p = new URLSearchParams();
  p.set("template", TEMPLATE_TITLE);
  p.set("description", TEMPLATE_DESCRIPTION);
  return `https://tronzlabs.com/contact?${p.toString()}`;
})();

export default function StartProjectOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[10000] flex justify-center px-3 sm:px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 sm:pb-6"
      role="complementary"
      aria-label="Open Tronzlabs contact to use this template"
    >
      <a
        href={CONTACT_HREF}
        target="_blank"
        rel="noreferrer"
        className="pointer-events-auto flex w-full min-h-[48px] max-w-sm touch-manipulation items-center justify-center gap-2 rounded-full border border-white/20 bg-black/80 px-4 py-3 text-center text-[11px] font-semibold uppercase leading-tight tracking-wide text-white shadow-2xl backdrop-blur-md transition sm:min-h-0 sm:max-w-none sm:w-auto sm:px-6 sm:py-3.5 sm:text-sm sm:leading-normal sm:tracking-[0.1em] hover:border-white/35 hover:bg-black/90 active:bg-black/95"
      >
        Use this template
        <span aria-hidden className="shrink-0">↗</span>
      </a>
    </div>
  );
}
