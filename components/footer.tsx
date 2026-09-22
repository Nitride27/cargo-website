import Link from "next/link";
import SocialIcon from "@/components/social-icons";
import { footer } from "@/content/copy";

// Lucide ships no brand icons — these circle chips render real SVGs.
const socials = [
  { label: "LinkedIn", name: "linkedin", href: "https://www.linkedin.com" },
  { label: "X", name: "x", href: "https://x.com" },
  { label: "Instagram", name: "instagram", href: "https://www.instagram.com" },
  { label: "YouTube", name: "youtube", href: "https://www.youtube.com" },
] as const;

/** Shared footer: wordmark / links / socials / legal. Cream, hairline top. */
export default function Footer() {
  return (
    <footer
      data-footer="root"
      data-reveal="footer"
      className="border-t border-mist bg-warm-cream text-obsidian"
    >
      <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-24 px-16 py-40 md:flex-row md:items-center md:justify-between md:px-24">
        <Link href="/" data-footer="wordmark" className="text-body font-bold">
          {footer.brand}
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-16">
            {footer.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  data-footer-link={link.label}
                  className="rounded-full text-body-sm hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-12" aria-label="Social links">
          {socials.map(({ label, name, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-40 w-40 items-center justify-center rounded-full border border-mist text-obsidian transition-colors hover:border-obsidian"
              >
                <SocialIcon name={name} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto flex w-full max-w-[var(--page-max-width)] flex-col gap-8 px-16 pb-24 text-caption text-driftwood md:flex-row md:items-center md:justify-between md:px-24">
        <p>{footer.legal}</p>
        <p className="flex gap-16">
          <span>{footer.privacyLabel}</span>
          <span>{footer.termsLabel}</span>
        </p>
      </div>
    </footer>
  );
}
