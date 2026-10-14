export const CONTACT_EMAIL = "dnm@cs.rutgers.edu";

export const PHD_PROGRAM_URL = "https://www.cs.rutgers.edu/academics/graduate/ph-d-program";

export const OPENING = {
  headline: "1–2 PhD positions for the 2027 academic year",
  description:
    "We are recruiting one to two PhD students to start in the 2027 academic year. Successful candidates will work on generative models, agentic AI and LLM reasoning, with access to the lab's dedicated GPU infrastructure.",
  emailSubject: "PhD application - Your Name",
};

export const RESEARCH_DIRECTIONS = [
  {
    title: "Multimodal Diffusion Models",
    description:
      "Diffusion and flow-based generative models across modalities: image, video and language. We study efficient architectures and training, controllable generation and editing, and unified models that understand and generate multiple modalities.",
  },
  {
    title: "Agentic AI",
    description:
      "Autonomous agents that plan, use tools and act in complex environments. We are interested in multi-step decision making, memory, self-improvement and reliable evaluation of agent behavior.",
  },
  {
    title: "LLM Reasoning",
    description:
      "Improving the reasoning ability, faithfulness and efficiency of large language models, including post-training and reinforcement learning, test-time scaling, uncertainty estimation and reducing hallucination.",
  },
];

export const COMPUTE_RESOURCES = {
  stats: [
    { value: "5", label: "NVIDIA A100 servers" },
    { value: "Growing", label: "Additional GPU servers" },
  ],
  description:
    "Students have access to the lab's dedicated computing cluster, which includes five NVIDIA A100 servers alongside multiple additional GPU machines. The cluster is actively expanding, so members can train and evaluate large-scale generative and language models without depending solely on shared university resources.",
};

export const CANDIDATE_QUALIFICATIONS = [
  "A B.S. or M.S. in Computer Science, Electrical Engineering, Mathematics, or a related field.",
  "Solid foundations in machine learning, linear algebra, probability and optimization.",
  "Strong programming skills in Python and hands-on experience with deep learning frameworks such as PyTorch.",
  "Prior research experience in generative models, computer vision, NLP or reinforcement learning. Publications at top venues are a plus but not required.",
  "Curiosity, independence and the ability to communicate ideas clearly.",
];
