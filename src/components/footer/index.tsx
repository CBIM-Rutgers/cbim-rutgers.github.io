import Image from "next/image";
import Link from "next/link";
import logo from "@images/logo.png";
import PAGE_ROUTES from "@/utils/consts/routes";
import { CONTACT_EMAIL } from "@/utils/mock-data/joining-us";

const EXTERNAL_LINKS = [
  { name: "Rutgers Computer Science", url: "https://www.cs.rutgers.edu/" },
  { name: "Rutgers University", url: "https://www.rutgers.edu/" },
  {
    name: "Prof. Metaxas on Google Scholar",
    url: "https://scholar.google.com/citations?user=a7VNhCIAAAAJ&hl=en",
  },
];

export default function Footer() {
  return (
    <footer className="w-full relative flex justify-center bg-gray-50 border-t-4 border-primary-red">
      <div
        className="w-full
        xl:max-w-[1140px] 2xl:max-w-[1320px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px]
        px-4 md:px-0 relative py-12
    "
      >
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-10">
          {/* Lab name and address */}
          <div>
            <div className="flex items-end justify-start gap-2">
              <Image src={logo} alt="CBIM Logo" width={40} height={40} />
              <div className="border-l-2 pl-2 text-3xl font-bold leading-none">
                CBIM
              </div>
            </div>
            <p className="mt-4 font-pt-serif font-semibold text-gray-900">
              Center for Computational Biomedicine Imaging and Modeling
            </p>
            <address className="mt-2 not-italic text-sm text-secondary-text leading-relaxed">
              Department of Computer Science, Rutgers University
              <br />
              617 Bowser Road, Piscataway, NJ 08854
              <br />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary-red hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
            </address>
          </div>

          {/* Site navigation */}
          <nav>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {PAGE_ROUTES.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className="text-secondary-text hover:text-primary-red transition-colors"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* External links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">
              Links
            </h3>
            <ul className="space-y-2 text-sm">
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-text hover:text-primary-red transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gray-300 mt-10 mb-4"></div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} CBIM, Rutgers, The State University of
          New Jersey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
