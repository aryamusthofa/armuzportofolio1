import type { PortfolioContent } from "./types";

/*
  ================================================================
  SATU-SATUNYA FILE YANG PERLU KAMU EDIT UNTUK MENGGANTI ISI WEBSITE
  ================================================================
  - Ganti teks di antara tanda kutip, jangan hapus tanda kutipnya.
  - Kosongkan link project (link: "") jika belum punya halaman studi kasus.
  - Gambar bersifat opsional. Kosongkan image: "" untuk memakai artwork otomatis.
  - Email: biarkan "" untuk memakai GitHub sebagai kanal kontak utama.
  - Untuk foto sendiri, taruh file di folder public lalu isi: "/nama-file.jpg"
*/

export const content: PortfolioContent = {
  name: "Arya Musthofa",
  initials: "AM",
  role: "Creative Developer & Designer",
  location: "Indonesia",
  email: "",
  availability: "Open for freelance & collaboration",

  hero: {
    eyebrow: "Independent developer & designer — Indonesia",
    titleStart: "Digital",
    titleAccent: "experiences",
    titleEnd: "with intent.",
    intro:
      "I build web products, code-driven video, and interactive experiences — turning ambitious ideas into things people actually use.",
  },

  marquee: [
    "Full-stack development",
    "Creative coding",
    "Motion & video",
    "Flutter apps",
  ],

  projects: [
    {
      title: "Rangka",
      subtitle: "Marketplace jasa pembuatan project IT.",
      year: "2026",
      category: "Marketplace · Full-Stack Development",
      description:
        "A marketplace connecting clients with IT project builders — from scoping to delivery, running live in production.",
      impact: "Live in production",
      tags: ["Node.js", "Full-stack", "Production"],
      link: "",
      image: "",
      visual: "orbit",
      accent: "#d7ff63",
    },
    {
      title: "Jendela Peluang",
      subtitle: "Indonesia's tech future, rendered in code.",
      year: "2026",
      category: "Explainer Video · Creative Coding",
      description:
        "A 75-second vertical video about Indonesia's path to becoming a tech power — every frame generated programmatically, no camera footage at all.",
      impact: "7 scenes · 9:16 · 100% code-rendered",
      tags: ["Remotion", "React", "Motion design"],
      link: "https://github.com/aryamusthofa/indotechremotion",
      image: "",
      visual: "type",
      accent: "#ff8c69",
    },
    {
      title: "AI Agent Workspace",
      subtitle: "Command an AI agent from the browser.",
      year: "2026",
      category: "AI Tooling · Product & Development",
      description:
        "A self-hosted web workspace for autonomous AI agents: streaming tasks, a built-in terminal, file management, and conversation memory — secured with signed sessions.",
      impact: "Self-hosted · HMAC-secured",
      tags: ["Python", "FastAPI", "AI agents"],
      link: "",
      image: "",
      visual: "blocks",
      accent: "#b9c8ff",
    },
    {
      title: "Chroma Dash",
      subtitle: "A color-driven game for the browser.",
      year: "2025",
      category: "Game · Flutter Web",
      description:
        "An interactive browser game built with Flutter — playful mechanics wrapped in a clean, reactive visual system.",
      impact: "Playable in the browser",
      tags: ["Flutter", "Dart", "Game design"],
      link: "",
      image: "",
      visual: "waves",
      accent: "#f2a7ff",
    },
  ],

  about: {
    eyebrow: "A little context",
    heading:
      "I build things that live on the internet — and make them feel alive.",
    paragraphs: [
      "I'm Arya — an independent developer and designer from Indonesia, working under the name Armuzzindotech. I move across the stack: Node.js backends, React interfaces, Flutter apps, and code-rendered video with Remotion.",
      "My motto is simple: bersatu membangun Indonesia melalui teknologi — building Indonesia through technology. Every project I take on is a small step toward that: useful products, honest data, and craft that holds up.",
    ],
    image: "",
  },

  stats: [
    { value: "4", label: "Projects shipped" },
    { value: "5", label: "Core technologies" },
    { value: "100%", label: "Built in-house" },
  ],

  experience: [
    {
      period: "2024 — Now",
      role: "Independent Developer & Designer",
      company: "Armuzzindotech",
    },
    {
      period: "Ongoing",
      role: "Client & Personal Projects",
      company: "Web apps · Code-driven video · Games",
    },
  ],

  services: [
    {
      title: "Design that gives ideas direction.",
      summary: "Strategy, identity, and interfaces with a clear point of view.",
      description:
        "From an early idea to a mature product, I shape coherent visual systems that communicate clearly and feel distinctly yours — not another version of what already exists.",
      deliverables: ["Creative direction", "UI/UX design", "Design systems"],
    },
    {
      title: "Code that makes design come alive.",
      summary: "Fast, expressive websites built with care down to the last pixel.",
      description:
        "I build responsive digital experiences where performance and personality work together. Clean implementation, thoughtful interactions, and no unnecessary complexity for the people maintaining it.",
      deliverables: ["Creative development", "Motion & interaction", "API & backend integration"],
    },
    {
      title: "From code to content.",
      summary: "Video, games, and interactive media — rendered straight from code.",
      description:
        "Beyond websites, I build with Remotion for programmatic video and Flutter for web games — the same care for detail, applied to media people watch and play.",
      deliverables: ["Code-driven video", "Flutter web apps", "Interactive prototypes"],
    },
  ],

  process: [
    {
      title: "Listen & define",
      description:
        "We align on the problem, the audience, and what success should look like before making anything.",
    },
    {
      title: "Explore & focus",
      description:
        "I turn possibilities into a clear creative direction, then test the important parts early.",
    },
    {
      title: "Design & build",
      description:
        "Design and development move together, with regular check-ins and no big-reveal surprises.",
    },
    {
      title: "Refine & launch",
      description:
        "We polish the details, test across devices, and launch with a foundation that is easy to grow.",
    },
  ],

  contact: {
    eyebrow: "Have a project in mind?",
    title: "Let's make something",
    accent: "worth remembering.",
    description:
      "Tell me what you're building, where you are in the process, and how I can help. The fastest way to reach me is GitHub — or email, once it's listed here.",
  },

  socials: [
    { label: "GitHub", url: "https://github.com/aryamusthofa" },
  ],

  seo: {
    title: "Arya Musthofa — Creative Developer & Designer",
    description:
      "Independent developer & designer from Indonesia — full-stack web apps, code-driven video with Remotion, and Flutter games. Explore selected work and ways to collaborate.",
  },
};
