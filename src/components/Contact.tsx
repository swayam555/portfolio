import QRCode from "qrcode";
import { site } from "@/data/site";
import { ContactRows } from "./ContactRows";
import { Chapter, Reveal } from "./Reveal";

// Rendered at build time: a QR code that opens a WhatsApp chat. Colour follows the theme via currentColor.
async function whatsappQr() {
  const svg = await QRCode.toString(site.whatsapp, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#000000", light: "#0000" } });
  return svg.replace(/fill="#000000"/g, 'fill="currentColor"').replace(/stroke="#000000"/g, 'stroke="currentColor"').replace("<svg ", '<svg role="img" aria-label="QR code: chat on WhatsApp" ');
}

export async function Contact() {
  const qr = await whatsappQr();
  return (
    <section id="contact" className="graph">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
        <Chapter n="05" title="Let's talk" meta="Open to SDE roles · back end / full-stack" />

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <Reveal className="min-w-0">
            <p className="max-w-2xl text-xl leading-snug text-ink-2 md:text-2xl">
              Call or message me on WhatsApp. It&apos;s the fastest way to reach me. Email works too, and I reply within a day.
            </p>
            <a href={site.phoneHref} className="display mt-8 block text-[clamp(2.6rem,11vw,8rem)] whitespace-nowrap transition-colors hover:text-accent">
              {site.phone}
            </a>
            <div className="mt-8">
              <ContactRows big />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col">
            <div className="border-2 border-ink bg-card">
              <div className="flex items-center justify-between border-b border-ink px-4 py-2 font-mono text-[10px] tracking-wider uppercase">
                <span className="text-accent">Scan → WhatsApp</span>
                <span className="text-muted">{site.phone}</span>
              </div>
              <div className="p-6 text-ink [&_svg]:h-auto [&_svg]:w-full" dangerouslySetInnerHTML={{ __html: qr }} />
            </div>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-3 flex h-12 items-center justify-center gap-2 bg-accent font-mono text-sm font-semibold tracking-wider text-on-accent uppercase transition-[filter] hover:brightness-110"
            >
              Open WhatsApp chat
            </a>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted uppercase">
              Based in {site.location} · IST (UTC+5:30)
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
