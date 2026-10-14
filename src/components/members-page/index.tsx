import Image from "next/image";
import backgroundImage from "@images/home/bg.png";
import MemberListItem from "./member-list-item";
import AlumniListItem from "./alumni-list-item";
import ScrollPanel from "@/components/scroll-panel";
import { mockPeople, groupPeopleByPosition } from "@/utils/mock-data/members";
import { getAlumniFromCSV } from "@/utils/lib/get-alumni";

function normalizeName(name: string): string {
  return name.trim().toLowerCase();
}

export default async function Members() {
  const allFromCSV = await getAlumniFromCSV();
  const postdocs = allFromCSV.filter(
    (e) => e.position.toLowerCase() === "postdoc"
  );
  const alumni = allFromCSV.filter(
    (e) => e.position.toLowerCase() !== "postdoc"
  );
  const alumniNames = new Set(allFromCSV.map((a) => normalizeName(a.name)));
  const currentMembersOnly = mockPeople.filter(
    (person) => !alumniNames.has(normalizeName(person.name))
  );
  const groupedPeople = groupPeopleByPosition(currentMembersOnly);

  return (
    <main className="w-full bg-white relative">
      <div className="w-full flex flex-col items-center">
        <Image
          src={backgroundImage}
          alt="CBIM at Rutgers University"
          className="object-cover w-full h-[360px]"
        />
        <div
          className="w-full 
          xl:max-w-[1140px] 2xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]
          pt-8 px-3 
        "
        >
          {/* Section title */}
          <div className="py-5 w-full">
            <h2 className="xl:text-5xl text-3xl font-bold tracking-wide font-pt-serif">
              Members
            </h2>
          </div>

          {/* Current members by position – professor with picture, others list only */}
          <div className="space-y-10 pb-12">
            {groupedPeople.map((group) => (
              <div key={group.position} className="space-y-1">
                <div
                  className="border-b border-gray-200 flex md:flex-row flex-col justify-start
                items-start md:items-center
                md:gap-4 gap-1"
                >
                  <h3 className="text-2xl font-semibold font-pt-serif ">
                    {group.position}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 font-semibold tracking-wide">
                    {group.people.length} Member
                    {group.people.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="mt-2">
                  {group.position === "Faculty" && group.people.length > 0 ? (
                    <>
                      <div className="flex flex-col sm:flex-row items-start gap-4 py-4 border-b border-gray-100">
                        <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded-md shadow-md">
                          <Image
                            src={group.people[0].profileImage}
                            alt={`${group.people[0].name} profile`}
                            fill
                            className="object-cover"
                            sizes="128px"
                          />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <a
                            href={
                              group.people[0].personalPageUrl?.startsWith("http")
                                ? group.people[0].personalPageUrl
                                : "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-red font-semibold hover:underline text-lg"
                          >
                            {group.people[0].name}
                          </a>
                          {group.people[0].interest && (
                            <span className="text-sm text-gray-600 mt-0.5">
                              {group.people[0].interest}
                            </span>
                          )}
                        </div>
                      </div>
                      {group.people.slice(1).map((person) => (
                        <MemberListItem key={person.id} person={person} />
                      ))}
                    </>
                  ) : (
                    group.people.map((person) => (
                      <MemberListItem key={person.id} person={person} />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Postdoc section */}
          {postdocs.length > 0 && (
            <div className="space-y-4 pb-12">
              <div
                className="border-b border-gray-200 flex md:flex-row flex-col justify-start
                items-start md:items-center md:gap-4 gap-1"
              >
                <h3 className="text-2xl font-semibold font-pt-serif">
                  Postdoc
                </h3>
                <p className="text-sm text-gray-600 mt-1 font-semibold tracking-wide">
                  {postdocs.length} Postdoc{postdocs.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="mt-2">
                {postdocs.map((entry) => (
                  <AlumniListItem
                    key={`${entry.name}-${entry.year}`}
                    entry={entry}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Alumni section */}
          <div className="space-y-4 pb-20">
            <div className="border-b border-gray-200 flex md:flex-row flex-col justify-start items-start md:items-center md:gap-4 gap-1">
              <h3 className="text-2xl font-semibold font-pt-serif">
                Alumni
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-semibold tracking-wide">
                {alumni.length} Alumni
              </p>
            </div>
            <p className="text-secondary-text text-sm">
              Our alumni hold positions at leading companies and universities.
              Links go to Google Scholar or personal research profiles when
              available.
            </p>
            <ScrollPanel className="max-h-[520px] mt-2 pb-8">
              {alumni.map((entry) => (
                <AlumniListItem key={`${entry.name}-${entry.year}`} entry={entry} />
              ))}
            </ScrollPanel>
          </div>
        </div>
      </div>
    </main>
  );
}
