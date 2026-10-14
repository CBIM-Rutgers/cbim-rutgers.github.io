import upcomingEvents, { type NewsTag } from "@/utils/mock-data/upcoming-events";
import ScrollPanel from "@/components/scroll-panel";

const TAG_STYLES: Record<NewsTag, string> = {
  Publication: "bg-primary-red/10 text-primary-red",
  "Public Service": "bg-[#003153]/10 text-[#003153]",
};

export default function News() {
  return (
    <div className="py-5 my-10 w-full">
      <div className="flex items-end justify-between border-b border-gray-200 pb-2">
        <h2 className="xl:text-3xl text-xl font-bold tracking-wide font-pt-serif">
          News and Events
        </h2>
        <span className="text-sm text-gray-500 font-semibold tracking-wide">
          {upcomingEvents.length} updates
        </span>
      </div>

      <ScrollPanel className="max-h-[480px] mt-6">
        <ol className="relative border-l-2 border-gray-200 ml-2 pb-8">
          {upcomingEvents.map((event, index) => (
            <li key={index} className="relative pl-8 pb-6 last:pb-0 group">
              {/* Timeline dot */}
              <span
                className={`absolute -left-[9px] top-5 size-4 rounded-full border-4 border-white
                ${index === 0 ? "bg-primary-red ring-4 ring-primary-red/20" : "bg-gray-300 group-hover:bg-primary-red"}
                transition-colors duration-300`}
              ></span>

              <div
                className="border border-gray-200 bg-white p-4 md:p-5
                group-hover:shadow-lg group-hover:border-gray-300 group-hover:-translate-y-0.5
                transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-700 tracking-wide">
                    {event.date}
                  </span>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${TAG_STYLES[event.tag]}`}
                  >
                    {event.tag}
                  </span>
                  {index === 0 && (
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-primary-red text-white">
                      New
                    </span>
                  )}
                </div>
                <h3 className="font-semibold md:text-lg text-gray-900 leading-snug">
                  {event.title}
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </ScrollPanel>
    </div>
  );
}
