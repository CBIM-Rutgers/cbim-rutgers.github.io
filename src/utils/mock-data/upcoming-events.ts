export type NewsTag = "Publication" | "Public Service";

const upcomingEvents: { date: string; tag: NewsTag; title: string }[] = [
  {
    date: "Sep 2026",
    tag: "Publication",
    title: "8 papers accepted to NeurIPS 2026. Congratulations to all authors!"
  },
  {
    date: "Aug 2026",
    tag: "Publication",
    title: "7 papers accepted to ACL. Congratulations to all authors!"
  },
  {
    date: "30 June 2026",
    tag: "Public Service",
    title: "Prof. Dimitris Metaxas will serve as General Chair of ICCV 2031 in Lisbon, Portugal."
  },
  {
    date: "20 June 2026",
    tag: "Publication",
    title: "3 papers accepted to ECCV 2026 on generative models and continual learning. Congratulations to Quan and Quyen!"
  },
  {
    date: "4 April 2026",
    tag: "Publication",
    title: "6 papers accepted to ICML 2026 across a diverse range of topics."
  },
  {
    date: "4 April 2026",
    tag: "Publication",
    title: "2 papers accepted to ACL 2026. Congratulations to Can and Sen!"
  },
  {
    date: "28 Feb 2026",
    tag: "Publication",
    title: "3 papers accepted to CVPR 2026: two main-conference papers, MPDiT and OT-based Continual Learning (Quan and Quyen), and one Findings paper (Yang Zhou)."
  },
  {
    date: "20 Jan 2026",
    tag: "Publication",
    title: "2 papers accepted to ICLR 2026: K-Prism and TokUR. Congratulations to Tunyu and Bangwei!"
  },
  {
    date: "19 Dec 2025",
    tag: "Public Service",
    title: "Prof. Dimitris Metaxas will serve as General Co-Chair and Prof. Vladimir Pavlovic as Program Co-Chair of CVPR 2026 (IEEE/CVF Conference on Computer Vision and Pattern Recognition), held in Denver, Colorado, in June 2026."
  },
  {
    date: "20 Sep 2025",
    tag: "Publication",
    title: "2 papers accepted to NeurIPS 2025: AutoEdit and VSS. Congratulations to Quan and Konstantinos!"
  },
  {
    date: "10 Jul 2025",
    tag: "Publication",
    title: "1 paper on image editing accepted to ICCV 2025. Congratulations to Song Wen!"
  },
  {
    date: "10 May 2025",
    tag: "Publication",
    title: "1 paper on LLM hallucination accepted to ICML 2025. Congratulations to Zhuowei!"
  },
  {
    date: "29 Jan 2025",
    tag: "Publication",
    title: "5 papers accepted to CVPR 2025 across diverse topics. Congratulations to Zhenting, Zhiyu, Zhixing, Yunhe and Di!"
  }
]

export default upcomingEvents;
