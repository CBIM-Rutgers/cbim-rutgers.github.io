import type { Metadata } from "next";
import Members from "@/components/members-page";

export const metadata: Metadata = {
  title: "Members",
  description: "Faculty, students, postdocs and alumni of CBIM at Rutgers University.",
};

export default function MembersPage() {
  return <Members />;
}
