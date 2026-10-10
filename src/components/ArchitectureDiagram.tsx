"use client";

import { motion } from "motion/react";
import type { Diagram, NodeKind } from "@/data/projects";

// Node styles use CSS variables so the diagram follows the paper / blueprint theme.
const kindStyle: Record<NodeKind, { fill: string; stroke: string; dash?: string }> = {
  client: { fill: "var(--card)", stroke: "var(--ink)" },
  service: { fill: "var(--ink)", stroke: "var(--ink)" },
  data: { fill: "var(--card)", stroke: "var(--ink)", dash: "4 3" },
  event: { fill: "var(--accent)", stroke: "var(--accent)" },
  external: { fill: "var(--bg-2)", stroke: "var(--muted)", dash: "2 3" },
};
const textColor = (k: NodeKind) => (k === "service" ? "var(--bg)" : k === "event" ? "var(--on-accent)" : "var(--ink)");
const subColor = (k: NodeKind) => (k === "service" ? "var(--bg)" : k === "event" ? "var(--on-accent)" : "var(--muted)");

const NW = 140;
const NH = 52;

function clip(ax: number, ay: number, bx: number, by: number, w = NW, h = NH) {
  const dx = bx - ax;
  const dy = by - ay;
  const sx = dx === 0 ? Infinity : w / 2 / Math.abs(dx);
  const sy = dy === 0 ? Infinity : h / 2 / Math.abs(dy);
  const s = Math.min(sx, sy);
  return { x: bx - dx * s, y: by - dy * s };
}

export function ArchitectureDiagram({ diagram, title }: { diagram: Diagram; title: string }) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const legend = Array.from(new Set(diagram.nodes.map((n) => n.kind)));

  return (
    <figure className="border-2 border-ink bg-card">
      <div className="flex items-center justify-between border-b border-ink px-4 py-2 font-mono text-[10px] tracking-wider text-muted uppercase">
        <span>Fig. 1 · {title} architecture</span>
        <span className="hidden sm:inline">Scale: not to scale</span>
      </div>
      <div className="graph overflow-x-auto">
        <svg viewBox={`0 0 ${diagram.width} ${diagram.height}`} className="block h-auto w-full min-w-[640px]" role="img" aria-label={`Architecture diagram for ${title}`}>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 10 5 0 10z" fill="var(--ink)" />
            </marker>
          </defs>
          {diagram.edges.map((e, i) => {
            const a = byId[e.from];
            const b = byId[e.to];
            const end = clip(a.x, a.y, b.x, b.y);
            const start = clip(b.x, b.y, a.x, a.y);
            const mx = (start.x + end.x) / 2;
            const my = (start.y + end.y) / 2;
            return (
              <g key={i}>
                <motion.line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="var(--ink)"
                  strokeWidth={1.3}
                  className="flow"
                  markerEnd="url(#arrow)"
                  markerStart={e.both ? "url(#arrow)" : undefined}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.75 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                />
                {e.label && (
                  <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.9 + i * 0.08 }}>
                    <rect x={mx - e.label.length * 3.4 - 6} y={my - 10} width={e.label.length * 6.8 + 12} height={18} fill="var(--bg)" stroke="var(--ink)" strokeWidth={0.8} />
                    <text x={mx} y={my + 3} textAnchor="middle" fontSize={10.5} fill="var(--ink)" fontFamily="var(--font-plex-mono)">
                      {e.label}
                    </text>
                  </motion.g>
                )}
              </g>
            );
          })}
          {diagram.nodes.map((n, i) => {
            const st = kindStyle[n.kind];
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <rect x={n.x - NW / 2 + 4} y={n.y - NH / 2 + 4} width={NW} height={NH} fill="var(--ink)" opacity={0.12} />
                <rect x={n.x - NW / 2} y={n.y - NH / 2} width={NW} height={NH} fill={st.fill} stroke={st.stroke} strokeWidth={1.5} strokeDasharray={st.dash} />
                <text x={n.x} y={n.sub ? n.y - 3 : n.y + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill={textColor(n.kind)} fontFamily="var(--font-archivo)">
                  {n.label.toUpperCase()}
                </text>
                {n.sub && (
                  <text x={n.x} y={n.y + 14} textAnchor="middle" fontSize={10} fill={subColor(n.kind)} opacity={0.85} fontFamily="var(--font-plex-mono)">
                    {n.sub}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>
      <figcaption className="flex flex-wrap gap-x-5 gap-y-2 border-t border-ink px-4 py-2.5 font-mono text-[11px] text-muted capitalize">
        {legend.map((k) => (
          <span key={k} className="inline-flex items-center gap-2">
            <span className="size-3 border" style={{ background: kindStyle[k].fill, borderColor: kindStyle[k].stroke, borderStyle: kindStyle[k].dash ? "dashed" : "solid" }} />
            {k}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

// Thumbnail schematic for cards: boxes and lines only.
export function MiniDiagram({ diagram }: { diagram: Diagram }) {
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  return (
    <svg viewBox={`0 0 ${diagram.width} ${diagram.height}`} className="block h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {diagram.edges.map((e, i) => {
        const a = byId[e.from];
        const b = byId[e.to];
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeWidth={3} strokeOpacity={0.5} className="flow" />;
      })}
      {diagram.nodes.map((n) => (
        <rect
          key={n.id}
          x={n.x - NW / 2}
          y={n.y - NH / 2}
          width={NW}
          height={NH}
          fill={n.kind === "service" ? "currentColor" : n.kind === "event" ? "var(--accent)" : "var(--card)"}
          stroke={n.kind === "event" ? "var(--accent)" : "currentColor"}
          strokeWidth={4}
        />
      ))}
    </svg>
  );
}
