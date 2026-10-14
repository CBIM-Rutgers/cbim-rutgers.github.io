import type { Metadata } from "next";
import SuspenseSearchParamsWrapper from "@/components/publications/search-params-wrapper";
import { getYamlResearchPapersGroupedByYear } from "@/utils/lib/yaml-parser";

export const metadata: Metadata = {
  title: "Publications",
  description: "Publications from CBIM at Rutgers University.",
};

export default async function PublicationsPage() {
  const publications = await getYamlResearchPapersGroupedByYear();

  return <SuspenseSearchParamsWrapper publications={publications} />;
}
