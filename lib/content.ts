/**
 * Local, typed site content.
 *
 * Phase 1 keeps content here so the site is fully editable without a CMS.
 * When we build /work and /reads we'll move case studies + posts to Sanity;
 * this profile data can stay local or move to the Sanity `Profile` singleton.
 *
 * 👉 Neha: replace the placeholder copy below with your real details.
 */

export const profile = {
  name: "Neha Thakkar",
  role: "Experience Designer",
  tagline: "Crafting interfaces that feel alive",
  // ~60 words, first person.
  bio: "I came to design from engineering, so I think in flows and edge cases as much as in pixels. These days I lead design at Zoop, shaping products from the first rough sketch to the shipped release. What I care about most is clarity, restraint, and the small moments that make something feel considered.",
  location: "India",
  availability: "Open to select projects",
  email: "neha@zoop.one",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/" },
    { label: "Behance", href: "https://behance.net/" },
    { label: "Dribbble", href: "https://dribbble.com/" },
  ],
  // Shown in the hero marquee strip.
  skills: [
    "Interaction Design",
    "Prototyping",
    "Design Systems",
    "Motion",
    "User Research",
    "Product Strategy",
  ],
  // Tools shown in the About section.
  tools: ["Figma", "Framer", "Protopie", "After Effects", "Webflow", "Notion"],
};

// Hero stats. 👉 Adjust the numbers to whatever you're comfortable claiming.
export const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 8, suffix: "+", label: "Products Shipped" },
  { value: 9, label: "Certifications" },
  { value: 6, label: "Designers Mentored" },
];

export type ExperienceItem = {
  role: string;
  company: string;
  start: string;
  end: string;
  highlights: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Senior Product Designer",
    company: "Zoop",
    start: "Nov 2025",
    end: "Present",
    highlights: [
      "Lead multi-product design across B2B and B2C verticals, owning the experience end to end from discovery to delivery.",
      "Drive UX strategy, design execution, and cross-functional alignment toward user-centric, scalable, business-aligned outcomes.",
      "Partner with product and tech leadership to shape product strategy, feature prioritisation, and GTM design direction.",
      "Craft human-focused UX copy and micro-interactions that lift usability, clarity, and emotional resonance.",
      "Mentor and guide designers, strengthening design thinking and a collaborative team culture.",
    ],
  },
  {
    role: "Product Designer",
    company: "Zoop",
    start: "Nov 2022",
    end: "Nov 2025",
    highlights: [
      "Led the complete revamp of Zoop Wallet, reimagining the UX and UI to modernise the product and lift user satisfaction.",
      "Owned end-to-end design for document management, scanning, editing, and sharing, from ideation to high-fidelity flows including edge cases.",
      "Ran usability studies and folded the findings back into the design.",
      "Drove the monetisation of Zoop Wallet, mapping user psychology for paid features into a clear conversion strategy.",
      "Designed concepts for Global Fintech Fest, a consent-driven document-sharing ecosystem and Zoop Wallet 2.0, and mentored a team of six.",
    ],
  },
  {
    role: "UX/UI Intern",
    company: "Zoop",
    start: "Aug 2022",
    end: "Nov 2022",
    highlights: [
      "Helped revamp Zoop Solutions' B2B client-facing dashboard to streamline workflows.",
      "Designed key B2C app features, including a trending-automobiles knowledge base and an interactive resale-value checker.",
      "Built admin dashboard modules for client-service operations and payment management.",
      "Revamped the Offers and Benefits section in the Zoop Wallet app for better engagement.",
    ],
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Zoop",
    start: "Jan 2022",
    end: "May 2022",
    highlights: [
      "Built features and modules for StudentOffers, optimising the front end for speed, SEO, and Firebase analytics.",
      "Developed the ZoopID web app UI pixel by pixel with React and Next.js.",
      "Improved the ZoopID operations dashboard through debugging and UI refinements with a senior developer.",
      "Used Strapi to build backend APIs and manage content delivery across devices.",
    ],
  },
  {
    role: "Front-End React Intern",
    company: "Jio",
    start: "May 2021",
    end: "Jul 2021",
    highlights: [
      "Built a GitHub Organisations explorer with React Hooks and Router, paginated listing, and detailed org views off the GitHub API.",
      "Designed, built, and tested Fashionista, a MERN e-commerce site with a CMS.",
      "Implemented user and admin auth, product, category and order APIs, cart, and order history.",
    ],
  },
];

export type EducationItem = {
  institution: string;
  qualification: string;
  year: string;
};

export const education: EducationItem[] = [
  {
    institution: "Indus University, Ahmedabad",
    qualification: "Bachelor of Computer Applications (BCA)",
    year: "2017 to 2020",
  },
  {
    institution: "Dhirubhai Ambani University",
    qualification: "Master of Science in Information Technology (MScIT)",
    year: "Aug 2020 to May 2022",
  },
];

export type Certificate = {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  href?: string;
};

export const certificates: Certificate[] = [
  {
    name: "Create High Fidelity Designs and Prototypes in Figma",
    issuer: "Google",
    year: "Jul 2022",
    credentialId: "WSJW2BT6Q93Z",
  },
  {
    name: "Conduct UX Research and Test Early Concepts",
    issuer: "Google",
    year: "Jun 2022",
    credentialId: "5WTN2PKKEV6R",
  },
  {
    name: "Build Wireframes and Low-Fidelity Prototypes",
    issuer: "Google",
    year: "May 2022",
    credentialId: "A8QUP945VVRP",
  },
  {
    name: "Start the UX Design Process: Empathize, Define, and Ideate",
    issuer: "Google",
    year: "May 2022",
    credentialId: "7K96J8TDB956",
  },
  {
    name: "Foundations of User Experience Design",
    issuer: "Google",
    year: "Feb 2022",
    credentialId: "5ZKL76NMR2TE",
  },
  {
    name: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    year: "Jan 2022",
    credentialId: "nehathakkar25",
  },
  {
    name: "MEVN Stack Development",
    issuer: "Udemy",
    year: "May 2021",
    credentialId: "UC-d5e9c181-7e41-4cd5-98d7-292998af242a",
  },
  {
    name: "Learn Python Programming Masterclass",
    issuer: "Udemy",
    year: "May 2021",
    credentialId: "UC-efc29bcd-fbda-4bee-b3ee-571203d6d9f2",
  },
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "Jan 2021",
    credentialId: "nehathakkar25",
  },
];

export type Offering = {
  name: string;
  summary: string;
  tools: string[];
};

export const offerings: Offering[] = [
  {
    name: "UI/UX Design",
    summary: "End-to-end product design: flows, wireframes, and polished interfaces.",
    tools: ["Figma", "Protopie"],
  },
  {
    name: "UX Audits",
    summary: "Heuristic and usability reviews that surface friction and quick wins.",
    tools: ["Figma", "Maze"],
  },
  {
    name: "Branding",
    summary: "Visual identity, logo, and brand systems that feel cohesive everywhere.",
    tools: ["Illustrator", "Figma"],
  },
  {
    name: "Product Strategy",
    summary: "Shaping what to build and why: positioning, priorities, and roadmaps.",
    tools: ["Miro", "Notion"],
  },
  {
    name: "Framer Development",
    summary: "Production-ready, animated sites built and shipped in Framer.",
    tools: ["Framer"],
  },
  {
    name: "Design Systems",
    summary: "Scalable component libraries and tokens that keep teams consistent.",
    tools: ["Figma", "Storybook"],
  },
  {
    name: "Prototyping",
    summary: "High-fidelity, interactive prototypes to validate ideas fast.",
    tools: ["Protopie", "Figma"],
  },
  {
    name: "Workshops",
    summary: "Facilitated sessions for discovery, ideation, and design thinking.",
    tools: ["Miro", "FigJam"],
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
};

// UI shape for a Read card (adds an optional resolved cover image URL).
export type ReadCard = Post & { coverUrl?: string };

export const posts: Post[] = [
  {
    slug: "designing-for-the-moment-of-doubt",
    title: "Designing for the moment of doubt",
    excerpt:
      "The instant a user hesitates is the most honest feedback a product gives. Here is how I design for it.",
    category: "Craft",
    date: "Jun 2026",
    readTime: "6 min",
  },
  {
    slug: "what-a-design-system-actually-buys-you",
    title: "What a design system actually buys you",
    excerpt:
      "It is not consistency. It is the freedom to stop re-deciding the same thing every single week.",
    category: "Systems",
    date: "Apr 2026",
    readTime: "5 min",
  },
  {
    slug: "the-quiet-power-of-defaults",
    title: "The quiet power of defaults",
    excerpt: "Most people never change a setting. The default is the design, so choose it like one.",
    category: "Craft",
    date: "Mar 2026",
    readTime: "4 min",
  },
  {
    slug: "from-engineering-to-design",
    title: "From engineering to design, and what stuck",
    excerpt:
      "Thinking in flows, edge cases, and constraints turned out to be the most useful design training I had.",
    category: "Career",
    date: "Jan 2026",
    readTime: "7 min",
  },
  {
    slug: "usability-test-in-an-afternoon",
    title: "How I run a usability test in an afternoon",
    excerpt:
      "You do not need a lab or a budget. Five people and the right questions will humble any assumption.",
    category: "Process",
    date: "Nov 2025",
    readTime: "5 min",
  },
  {
    slug: "figma-framer-knowing-when-to-switch",
    title: "Figma, Framer, and knowing when to switch",
    excerpt:
      "Every tool quietly pushes you toward a way of thinking. The skill is noticing when it stops serving the work.",
    category: "Tools",
    date: "Sep 2025",
    readTime: "4 min",
  },
  {
    slug: "saying-no-is-a-design-decision",
    title: "Saying no is a design decision",
    excerpt:
      "Every feature you add is a promise. The hardest, best work is often what you choose to leave out.",
    category: "Process",
    date: "Jul 2025",
    readTime: "5 min",
  },
  {
    slug: "microcopy-that-earns-its-place",
    title: "Microcopy that earns its place",
    excerpt:
      "A few honest words can do what an entire onboarding flow cannot. Less explaining is often better designing.",
    category: "Craft",
    date: "May 2025",
    readTime: "4 min",
  },
  {
    slug: "designing-trust-into-a-fintech-wallet",
    title: "Designing trust into a fintech wallet",
    excerpt:
      "When money is involved, every interaction is really about trust. Here is what that meant for Zoop Wallet.",
    category: "Systems",
    date: "Feb 2025",
    readTime: "8 min",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Offerings", href: "/offerings" },
  { label: "Work", href: "/work" },
  { label: "Reads", href: "/reads" },
  { label: "Contact", href: "/contact" },
];
