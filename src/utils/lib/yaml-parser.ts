import "server-only";
import { z } from "zod";
import YAML from "yaml";
import path from "path";
import { promises as fs } from "fs";
import { Paper, YearGroup } from "@/types/research/research-types";
import { getPaperDisplayYear } from "./paper-display-year";
import { normalizeVenue } from "@/utils/consts/venues";


/**
 * Generic YAML content parser class with schema validation.
 * 
 * This class handles parsing YAML files with Zod schema validation to ensure
 * type safety and data integrity. It's used for various data sources in the application.
 * 
 * @template T - The expected type of the parsed data
 */
export class YamlContentParser<T> {
  private readonly schema: z.ZodType<T>;
  private readonly filePath: string;

  constructor(schema: z.ZodType<T>, filePath: string) {
    this.schema = schema;
    this.filePath = filePath;
  }

  /**
   * Parses the YAML file and validates its contents against the schema
   * 
   * @returns The parsed and validated data
   * @throws Error if the file cannot be read or the data fails validation
   */
  async parse(): Promise<T> {
    const content = await fs.readFile(this.filePath, 'utf8');
    const data = YAML.parse(content);

    try {
      return this.schema.parse(data);
    } catch (error) {
      console.error(`Error validating content in ${this.filePath}:`, error);
      throw error;
    }
  }
}

let researchCache: YearGroup[] | null = null;

const PaperSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()).default([]),
  date: z.string().default(""),
  id: z.string(),
  link: z.string().url(),
  tags: z.array(z.string()).optional(),
  image: z.string().url().nullable().optional(),
  publisher: z.string().nullable().optional(),
  venue: z.string().nullable().optional(),
});

export const getYamlResearchPapers = async (): Promise<Paper[]> => {
  const parser = new YamlContentParser<unknown>(
    z.array(PaperSchema),
    path.join(process.cwd(), '_data', 'citations.yaml')
  );
  return (await parser.parse()) as Paper[];
};

/** Load CBIM papers (Metaxas + students 2024-2026) if available; otherwise null. */
export const getCbimPapers = async (): Promise<Paper[] | null> => {
  const cbimPath = path.join(process.cwd(), '_data', 'cbim_papers.yaml');
  try {
    await fs.access(cbimPath);
  } catch {
    return null;
  }
  const content = await fs.readFile(cbimPath, 'utf8');
  const data = YAML.parse(content);
  const parsed = z.array(PaperSchema).parse(Array.isArray(data) ? data : []) as Paper[];
  return parsed;
};

/** Papers for the publications page: prefer cbim_papers.yaml, else citations.yaml. */
export const getResearchPapersForPage = async (): Promise<Paper[]> => {
  const cbim = await getCbimPapers();
  if (cbim != null && cbim.length > 0) return cbim;
  return getYamlResearchPapers();
};

function paperHasMetaxas(paper: Paper): boolean {
  const authors = paper.authors ?? [];
  return authors.some((a) => (a ?? "").toLowerCase().includes("metaxas"));
}

export const getYamlResearchPapersGroupedByYear = async (): Promise<YearGroup[]> => {
  if (researchCache) {
    return researchCache;
  }
  const papers = await getResearchPapersForPage();

  const DISPLAY_YEAR_MIN = 2023;
  const DISPLAY_YEAR_MAX = new Date().getFullYear();
  const TITLE_BLOCKLIST = ["TokenSeek"];

  // Scholar often lists the same paper twice (e.g. proceedings and journal version)
  const seenTitles = new Set<string>();
  const titleKey = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, "");

  const groups = papers.reduce((acc: Record<number, Paper[]>, paper) => {
    if (!paperHasMetaxas(paper)) return acc;
    // Published papers only: preprints and unrecognized venues have no venue
    const venue = normalizeVenue(paper.publisher);
    if (!venue) return acc;
    const year = getPaperDisplayYear(paper);
    if (year < DISPLAY_YEAR_MIN || year > DISPLAY_YEAR_MAX) return acc;
    if (TITLE_BLOCKLIST.some((bl) => paper.title.includes(bl))) return acc;
    const key = titleKey(paper.title);
    if (seenTitles.has(key)) return acc;
    seenTitles.add(key);
    if (!acc[year]) acc[year] = [];
    acc[year].push({ ...paper, venue });
    return acc;
  }, {});

  // Convert the grouped object into the YearGroup interface.
  researchCache = Object.entries(groups).map(([year, papers]) => ({
    year: parseInt(year, 10),
    papers,
  }));

  return researchCache;
};
