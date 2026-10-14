import type { Metadata } from "next";
import JoiningUs from "@/components/joining-us-page";

export const metadata: Metadata = {
  title: "Joining Us",
  description:
    "PhD openings at CBIM, Rutgers University: multimodal diffusion models, agentic AI and LLM reasoning.",
};

export default function JoiningUsPage() {
  return <JoiningUs />;
}
