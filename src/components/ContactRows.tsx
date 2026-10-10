"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      /* clipboard blocked: the row's own link still works */
    }
  };
  return { copied, copy };
}

// Contact block styled as a spec table. Every row is a real link; phone and email also copy.
export function ContactRows({ big = false }: { big?: boolean }) {
  const { copied, copy } = useCopy();
  const rows = [
    { key: "phone", label: "Phone", value: site.phone, href: site.phoneHref, Icon: PhoneIcon, copy: "+918707705446", action: "Call" },
    { key: "whatsapp", label: "WhatsApp", value: site.phone, href: site.whatsapp, Icon: WhatsAppIcon, external: true, action: "Chat" },
    { key: "email", label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, copy: site.email, action: "Write" },
    { key: "linkedin", label: "LinkedIn", value: "in/swayam-bajpai", href: site.linkedin, Icon: LinkedInIcon, external: true, action: "Open" },
    { key: "github", label: "GitHub", value: "github.com/swayam555", href: site.github, Icon: GitHubIcon, external: true, action: "Open" },
  ];

  return (
    <ul className="border-t-2 border-ink" aria-label="Contact details">
      {rows.map((r) => (
        <li key={r.key} className="group relative flex items-stretch border-b border-ink">
          <a
            href={r.href}
            target={r.external ? "_blank" : undefined}
            rel={r.external ? "noreferrer" : undefined}
            className={`flex min-w-0 flex-1 items-center gap-3 px-1 transition-colors group-hover:bg-ink group-hover:text-bg sm:gap-5 ${big ? "py-4 sm:py-5" : "py-3"}`}
          >
            <span className="hidden w-24 shrink-0 font-mono text-[11px] tracking-wider text-muted uppercase group-hover:text-bg/70 sm:block">{r.label}</span>
            <r.Icon className="size-4 shrink-0 text-accent" />
            <span className={`semi-condensed min-w-0 truncate font-semibold ${big ? "text-xl sm:text-3xl" : "text-base sm:text-lg"}`}>{r.value}</span>
            <span className="ml-auto flex shrink-0 items-center gap-1 pr-2 font-mono text-[11px] tracking-wider uppercase">
              {r.action} <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
          {r.copy && (
            <button
              type="button"
              onClick={() => copy(r.copy!, r.key)}
              aria-label={`Copy ${r.label.toLowerCase()}`}
              className="w-20 shrink-0 border-l border-ink font-mono text-[11px] tracking-wider uppercase transition-colors hover:bg-accent hover:text-on-accent"
            >
              <span aria-live="polite">{copied === r.key ? "Copied ✓" : "Copy"}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
