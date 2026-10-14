"use client";

import Image from "next/image";
import Link from "next/link";
import { YearGroup } from "@/types/research/research-types";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { matchesQuery, splitQuery } from "@/utils/lib/research-search";
import PublicationCard from "./publication-card";
import { VENUE_OPTIONS, SORT_OPTIONS, type SortOption } from "@/utils/consts/venues";

import backgroundImage from "@images/home/bg.png";
import searchIcon from "@images/shared/search.svg";

const DIMITRIS_SCHOLAR_URL = "https://scholar.google.com/citations?user=a7VNhCIAAAAJ&hl=en";

interface PublicationsProps {
  readonly publications: YearGroup[];
}

export default function Publications({ publications }: PublicationsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentSearch = searchParams.get("search") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const currentInputValue = useRef(currentSearch);
  const debouncedUrlUpdate = useDebounce(currentInputValue.current, 300);

  const selectedVenues = useMemo(
    () => searchParams.getAll("venue").filter((v) => VENUE_OPTIONS.includes(v as (typeof VENUE_OPTIONS)[number])),
    [searchParams]
  );
  const selectedYears = useMemo(
    () =>
      searchParams
        .getAll("year")
        .map((y) => parseInt(y, 10))
        .filter((y) => !Number.isNaN(y) && y > 0),
    [searchParams]
  );
  const sort = (searchParams.get("sort") as SortOption) || "year-desc";
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());

  const toggleYearExpanded = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  const filteredPublications = useMemo(() => {
    if (!Array.isArray(publications)) return [];
    let result: YearGroup[] = [...publications];

    if (currentSearch) {
      const { phrases, terms } = splitQuery(currentSearch);
      result = result
        .map((yearGroup) => ({
          ...yearGroup,
          papers: (yearGroup.papers ?? []).filter((paper) => {
            const searchableText = [
              paper.title,
              (paper.authors ?? []).join(" "),
              paper.publisher ?? "",
            ].join(" ");
            return matchesQuery(searchableText, phrases, terms);
          }),
        }))
        .filter((yg) => (yg.papers?.length ?? 0) > 0);
    }

    if (selectedVenues.length > 0) {
      result = result
        .map((yearGroup) => ({
          ...yearGroup,
          papers: (yearGroup.papers ?? []).filter(
            (paper) => paper.venue && selectedVenues.includes(paper.venue)
          ),
        }))
        .filter((yg) => (yg.papers?.length ?? 0) > 0);
    }

    if (selectedYears.length > 0) {
      result = result.filter((yg) => selectedYears.includes(yg.year));
    }

    if (sort === "year-asc") {
      result = [...result].sort((a, b) => a.year - b.year);
    } else if (sort === "year-desc") {
      result = [...result].sort((a, b) => b.year - a.year);
    } else if (sort === "venue") {
      result = [...result].sort((a, b) => b.year - a.year);
      result = result.map((yg) => ({
        ...yg,
        papers: [...(yg.papers ?? [])].sort((a, b) => {
          const va = a.venue ?? "";
          const vb = b.venue ?? "";
          return va.localeCompare(vb);
        }),
      }));
    } else {
      result = [...result].sort((a, b) => b.year - a.year);
    }

    return result;
  }, [publications, currentSearch, selectedVenues, selectedYears, sort]);

  // Get all matched terms for highlighting
  const highlightTerms = useMemo(() => {
    if (!currentSearch) return [];
    const { phrases, terms } = splitQuery(currentSearch);
    return [...phrases, ...terms];
  }, [currentSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    currentInputValue.current = e.target.value;
    router.refresh();
  };

  const updateParams = (updates: {
    venue?: string[];
    year?: number[];
    sort?: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (updates.venue !== undefined) {
      params.delete("venue");
      updates.venue.forEach((v) => params.append("venue", v));
    }
    if (updates.year !== undefined) {
      params.delete("year");
      updates.year.forEach((y) => params.append("year", String(y)));
    }
    if (updates.sort !== undefined) {
      if (updates.sort) params.set("sort", updates.sort);
      else params.delete("sort");
    }
    router.replace(`/publications?${params.toString()}`, { scroll: false });
  };

  const toggleVenue = (venue: string) => {
    const next = selectedVenues.includes(venue)
      ? selectedVenues.filter((v) => v !== venue)
      : [...selectedVenues, venue];
    updateParams({ venue: next });
  };

  const toggleYear = (year: number) => {
    const next = selectedYears.includes(year)
      ? selectedYears.filter((y) => y !== year)
      : [...selectedYears, year];
    updateParams({ year: next });
  };

  const yearsInData = useMemo(() => {
    const set = new Set<number>();
    publications.forEach((g) => set.add(g.year));
    return [...set].sort((a, b) => b - a);
  }, [publications]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedUrlUpdate) {
      params.set("search", debouncedUrlUpdate);
    } else {
      params.delete("search");
    }
    if (params.toString() !== searchParams.toString()) {
      router.replace(`/publications?${params.toString()}`, { scroll: false });
    }
  }, [debouncedUrlUpdate, router, searchParams]);

  return (
    <main className="w-full bg-white relative">
      <div className="w-full flex flex-col items-center">
        {/* Thumbnail image */}
        <Image
          src={backgroundImage}
          alt="CBIM at Rutgers University"
          className="object-cover  w-full h-[360px]"
        />
        {/* Main content */}
        <div
          className="w-full 
          xl:max-w-[1140px] 2xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]
          pt-8 px-3 
        "
        >
          {/* section title */}
          <div className="py-5 w-full">
            <h2 className="xl:text-5xl text-3xl font-bold tracking-wide font-pt-serif">
              Publications
            </h2>
            <p className="mt-2 text-secondary-text text-sm md:text-base">
              For further information, please visit{" "}
              <Link
                href={DIMITRIS_SCHOLAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-red font-semibold hover:underline"
              >
                Google Scholar
              </Link>
              .
            </p>
          </div>

          {/* search input */}
          <div className="sticky top-[60px] z-50">
            <div
              className="relative w-fit md:w-full bg-white
            border-b border-b-gray-700 flex items-center
            hover:scale-105 focus:scale-105 hover:shadow-lg focus:shadow-lg shadow-md
            transition-all duration-200 ease-in-out 
            md:px-3 md:py-2 px-1.5 py-1
            md:gap-10 gap-4 
            "
            >
              <input
                ref={inputRef}
                type="text"
                defaultValue={currentSearch}
                onChange={handleSearchChange}
                placeholder="Search Publications"
                className="w-full px-4 pt-4 md:pb-6 pb-4   
                focus:outline-none md:text-xl text-base tracking-wider
                relative z-10
                "
              />
              <Image
                src={searchIcon}
                alt="Search Icon"
                className="size-5 md:size-8"
              />
            </div>
          </div>

          {/* filter by venue, year; sort */}
          <div className="sticky top-[120px] z-40 bg-white border-b border-gray-200 py-3 md:px-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-sm font-semibold text-gray-700">
                Venue:
              </span>
              <div className="flex flex-wrap gap-2">
                {VENUE_OPTIONS.map((venue) => (
                  <button
                    key={venue}
                    type="button"
                    onClick={() => toggleVenue(venue)}
                    className={`px-2.5 py-1 text-sm font-medium rounded border transition-colors ${
                      selectedVenues.includes(venue)
                        ? "bg-primary-red text-white border-primary-red"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary-red"
                    }`}
                  >
                    {venue}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
              <span className="text-sm font-semibold text-gray-700">Year:</span>
              <div className="flex flex-wrap gap-2">
                {yearsInData.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => toggleYear(y)}
                    className={`px-2.5 py-1 text-sm font-medium rounded border transition-colors ${
                      selectedYears.includes(y)
                        ? "bg-primary-red text-white border-primary-red"
                        : "bg-white text-gray-700 border-gray-300 hover:border-primary-red"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-sm font-semibold text-gray-700">Sort:</span>
              <select
                value={sort}
                onChange={(e) =>
                  updateParams({ sort: e.target.value as SortOption })
                }
                className="px-2.5 py-1.5 text-sm font-medium rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-red"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* publications list - dropdown per year (Rutgers R red styling) */}
          <div className="mt-8 pb-20 md:px-3 w-full flex flex-col gap-4">
            {filteredPublications.map((yearGroup) => {
              const isExpanded = expandedYears.has(yearGroup.year);
              const count = yearGroup.papers.length;
              return (
                <div
                  key={yearGroup.year}
                  className="rounded-lg overflow-hidden shadow-md border border-gray-200/80
                    hover:shadow-lg transition-shadow duration-200"
                >
                  <button
                    type="button"
                    onClick={() => toggleYearExpanded(yearGroup.year)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left
                      bg-white hover:bg-primary-red/5
                      border-l-4 border-primary-red
                      transition-colors duration-200"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-pt-serif font-bold text-2xl text-primary-red tabular-nums"
                        aria-hidden
                      >
                        {yearGroup.year}
                      </span>
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
                          bg-primary-red/10 text-primary-red border border-primary-red/30"
                      >
                        {count} paper{count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <span
                      className={`flex items-center justify-center w-10 h-10 rounded-full
                        bg-primary-red/10 text-primary-red
                        transition-all duration-200 ${isExpanded ? "rotate-180 bg-primary-red text-white" : ""}`}
                      aria-hidden
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="border-t-2 border-primary-red/20 bg-gray-50/60 px-5 py-6">
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {yearGroup.papers.map((paper) => (
                          <PublicationCard
                            key={paper.id}
                            publication={paper}
                            searchTerms={highlightTerms}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
