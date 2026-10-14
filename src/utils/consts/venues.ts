/**
 * Venues displayed on the publications page. A paper is listed only if its
 * publisher string matches one of these, which also keeps preprints out.
 */
export const VENUE_OPTIONS = [
  "CVPR",
  "ICCV",
  "ECCV",
  "NeurIPS",
  "ICML",
  "ICLR",
  "AAAI",
  "WACV",
  "ACL",
  "EMNLP",
  "NAACL",
  "MICCAI",
  "IPMI",
  "ISBI",
  "TPAMI",
  "IJCV",
  "TMI",
  "MedIA",
] as const;

export type VenueOption = (typeof VENUE_OPTIONS)[number];

/**
 * Patterns that map Google Scholar publisher strings (often truncated with "…")
 * to a venue. Order matters: the first match wins, so more specific names
 * (e.g. EMNLP inside "Findings of the ACL: EMNLP") come first.
 */
export const VENUE_PATTERNS: ReadonlyArray<[VenueOption, RegExp]> = [
  ["WACV", /\bWACV\b|Winter Conference on Applications of Computer/i],
  ["ECCV", /\bECCV\b|European Conference on Computer Vision/i],
  ["CVPR", /\bCVPR\b|Conference on Computer Vision and Pattern/i],
  ["ICCV", /\bICCV\b|International Conference on Computer Vision/i],
  ["NeurIPS", /\bNeurIPS\b|\bNIPS\b|Neural Information Processing Systems/i],
  ["ICML", /\bICML\b|International Conference on Machine Learning(?!\s+and)/i],
  ["ICLR", /\bICLR\b|International Conference on Learning Representations/i],
  ["AAAI", /\bAAAI\b/i],
  ["EMNLP", /\bEMNLP\b|Empirical Methods in Natural Language Processing/i],
  ["NAACL", /\bNAACL\b|North American Chapter of the Association for Computational/i],
  ["ACL", /\bACL\b|Association for Computational Linguistics/i],
  ["MICCAI", /\bMICCAI\b|Medical Image Computing and Computer[- ]Assisted/i],
  ["IPMI", /\bIPMI\b|Information Processing in Medical Imaging/i],
  ["ISBI", /\bISBI\b|International Symposium on Biomedical Imaging/i],
  ["TPAMI", /\bT-?PAMI\b|Transactions on Pattern Analysis and Machine Intelligence/i],
  ["IJCV", /\bIJCV\b|International Journal of Computer Vision/i],
  ["TMI", /Transactions on Medical Imaging/i],
  ["MedIA", /^Medical Image Analysis\b/i],
];

/** Preprints and workshop papers are not listed. */
const EXCLUDED_PUBLISHER =
  /arxiv|preprint|\bCoRR\b|biorxiv|medrxiv|openreview|ssrn|research square|techrxiv|workshop/i;

/** Returns the venue for a published paper, or null for preprints and unknown venues. */
export function normalizeVenue(publisher: string | null | undefined): VenueOption | null {
  if (!publisher || EXCLUDED_PUBLISHER.test(publisher)) return null;
  for (const [venue, pattern] of VENUE_PATTERNS) {
    if (pattern.test(publisher)) return venue;
  }
  return null;
}

export const SORT_OPTIONS = [
  { value: "year-desc", label: "Year (newest first)" },
  { value: "year-asc", label: "Year (oldest first)" },
  { value: "venue", label: "Venue (A–Z)" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
