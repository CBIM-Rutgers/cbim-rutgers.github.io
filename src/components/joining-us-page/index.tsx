import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@images/home/bg.png";
import redArrow from "@images/shared/red-arrow.svg";
import {
  COMPUTE_RESOURCES,
  CONTACT_EMAIL,
  CANDIDATE_QUALIFICATIONS,
  OPENING,
  PHD_PROGRAM_URL,
  RESEARCH_DIRECTIONS,
} from "@/utils/mock-data/joining-us";

function SectionTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <h3 className="text-2xl font-semibold font-pt-serif border-b border-gray-200 pb-1 mb-6">
      {children}
    </h3>
  );
}

export default function JoiningUs() {
  const emailSubject = encodeURIComponent(OPENING.emailSubject);

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
              Joining Us
            </h2>
            <p className="mt-4 tracking-wide text-secondary-text max-w-3xl">
              We are always looking for curious, driven researchers who want to
              push the frontier of generative and reasoning-capable AI. Join a
              collaborative group led by Prof. Dimitris Metaxas, with a strong
              publication record at CVPR, ICCV, ECCV, NeurIPS, ICML, ICLR and
              ACL.
            </p>
          </div>

          {/* Opening callout */}
          <div className="border-l-4 border-primary-red bg-gray-50 px-6 py-6 my-6">
            <div className="px-3 py-1.5 mb-4 border-2 border-primary-red w-fit text-sm font-bold tracking-wider uppercase">
              Now recruiting
            </div>
            <p className="text-xl md:text-2xl font-pt-serif font-semibold text-gray-900">
              {OPENING.headline}
            </p>
            <p className="mt-3 text-secondary-text max-w-3xl">
              {OPENING.description}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${emailSubject}`}
              className="mt-6 inline-block bg-primary-red text-white font-semibold tracking-wide px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Apply by email
            </a>
          </div>

          {/* Research directions */}
          <section className="py-10">
            <SectionTitle>Research Directions</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6">
              {RESEARCH_DIRECTIONS.map((direction) => (
                <div
                  key={direction.title}
                  className="border border-gray-200 border-t-4 border-t-primary-red p-6
                  hover:shadow-lg transition-shadow duration-300"
                >
                  <h4 className="text-lg font-semibold font-pt-serif mb-3">
                    {direction.title}
                  </h4>
                  <p className="text-secondary-text text-sm leading-relaxed">
                    {direction.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Compute */}
          <section className="py-10">
            <SectionTitle>Computing Resources</SectionTitle>
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
              <div className="flex md:flex-col gap-8">
                {COMPUTE_RESOURCES.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-5xl font-bold font-pt-serif text-primary-red leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm font-semibold tracking-wide text-gray-600 uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-secondary-text tracking-wide leading-relaxed">
                {COMPUTE_RESOURCES.description}
              </p>
            </div>
          </section>

          {/* Who we are looking for */}
          <section className="py-10">
            <SectionTitle>Who We Are Looking For</SectionTitle>
            <ul className="space-y-3">
              {CANDIDATE_QUALIFICATIONS.map((item) => (
                <li key={item} className="flex gap-3 text-secondary-text">
                  <span className="mt-2 size-2 flex-shrink-0 bg-primary-red"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How to apply */}
          <section className="py-10 pb-20">
            <SectionTitle>How to Apply</SectionTitle>
            <ol className="space-y-8">
              <li className="flex gap-5">
                <span className="text-3xl font-bold font-pt-serif text-primary-red leading-none w-8 flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Apply to the Rutgers Computer Science PhD program
                  </h4>
                  <p className="text-secondary-text">
                    All PhD students are admitted through the department&apos;s
                    official application. Please mention Prof. Dimitris Metaxas
                    and CBIM in your statement of purpose.
                  </p>
                  <Link
                    href={PHD_PROGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-primary-red font-semibold hover:underline group inline-flex items-center"
                  >
                    <span>Rutgers CS PhD program</span>
                    <Image
                      src={redArrow}
                      alt=""
                      className="h-5 w-[20px] ml-2 group-hover:ml-3 transition-all duration-300 ease-in-out"
                    />
                  </Link>
                </div>
              </li>
              <li className="flex gap-5">
                <span className="text-3xl font-bold font-pt-serif text-primary-red leading-none w-8 flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-lg mb-1">
                    Email your CV to Prof. Metaxas
                  </h4>
                  <p className="text-secondary-text">
                    Send your CV to Prof. Dimitris Metaxas at{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=${emailSubject}`}
                      className="text-primary-red font-semibold hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>{" "}
                    with the subject line{" "}
                    <span className="font-mono text-sm bg-gray-100 px-1.5 py-0.5">
                      {OPENING.emailSubject}
                    </span>
                    .
                  </p>
                </div>
              </li>
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
