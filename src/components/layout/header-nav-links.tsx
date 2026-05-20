"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  /** Path prefix that activates this link (sans query string). */
  match: string;
}

interface Props {
  links: NavLink[];
}

// Bandeau de navigation desktop avec detection d'etat actif via usePathname.
// La CTA planner reste a part dans le header ; son etat actif est gere
// par HeaderPlannerCta.
export function HeaderNavLinks({ links }: Props) {
  const pathname = usePathname() ?? "";

  const isActive = (match: string) => {
    if (match === pathname) return true;
    return pathname.startsWith(`${match}/`);
  };

  const itemClass = (active: boolean) =>
    `rounded-full px-3 py-2 text-sm transition-colors ${
      active
        ? "bg-surface-muted text-foreground"
        : "text-muted hover:bg-surface-muted hover:text-foreground"
    }`;

  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Sinora">
      {links.map((link) => {
        const active = isActive(link.match);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={itemClass(active)}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
