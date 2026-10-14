import type { Paper } from "@/types/research/research-types";

/**
 * Publication year of a paper. Safe for client.
 *
 * Google Scholar often dates a paper by its proceedings release rather than the
 * conference (e.g. "CVPR 2024, 2023" or NeurIPS 2024 listed as "... Systems 37, ..., 2025"),
 * so we prefer the NeurIPS volume number, then the latest year in the publisher string,
 * and only then fall back to paper.date.
 */
export function getPaperDisplayYear(paper: Paper): number {
  const pub = paper.publisher ?? "";

  // NeurIPS volume N corresponds to the conference held in 1987 + N
  const neuripsVolume = pub.match(/Neural Information Processing Systems\s+(\d{2})\b/i);
  if (neuripsVolume) return 1987 + parseInt(neuripsVolume[1], 10);

  const years = [...pub.matchAll(/\b(20\d{2})\b/g)].map((m) => parseInt(m[1], 10));
  if (years.length > 0) return Math.max(...years);

  if (paper.date) {
    const y = new Date(paper.date).getFullYear();
    if (!Number.isNaN(y)) return y;
  }
  return 0;
}
