import Link from "next/link";

export default function NotFound() {
  return (
    <section className="graph grid min-h-[85dvh] place-items-center px-4 pt-14 text-center">
      <div>
        <p className="font-mono text-sm tracking-wider text-accent uppercase">Error · HTTP 404</p>
        <h1 className="display mt-4 text-[clamp(5rem,22vw,16rem)]">
          Not found<span className="text-accent">.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-2">This page doesn&apos;t exist. No retries needed: it&apos;s a 4xx.</p>
        <Link href="/" className="mt-8 inline-flex h-11 items-center bg-accent px-5 font-mono text-sm font-semibold tracking-wider text-on-accent uppercase">
          Back home
        </Link>
      </div>
    </section>
  );
}
