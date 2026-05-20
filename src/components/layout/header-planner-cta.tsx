"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinned } from "lucide-react";

interface Props {
  href: string;
  label: string;
}

// CTA "Planifier mon voyage". Quand on est deja sur la page planner, on
// la transforme en pill discrete avec etat actif au lieu du bouton accent
// (evite de proposer un CTA vers la page courante).
export function HeaderPlannerCta({ href, label }: Props) {
  const pathname = usePathname() ?? "";
  const active = pathname === href || pathname.startsWith(`${href}/`);

  if (active) {
    return (
      <span
        aria-current="page"
        className="hidden items-center gap-1.5 rounded-full bg-surface-muted px-4 text-sm font-medium text-foreground md:inline-flex"
        style={{ height: "2.25rem" }}
      >
        <MapPinned className="size-4 text-accent" />
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="hidden h-9 items-center gap-1.5 rounded-full bg-accent px-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover md:inline-flex"
    >
      {label}
    </Link>
  );
}
