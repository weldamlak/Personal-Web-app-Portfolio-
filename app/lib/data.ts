import type { ComponentType } from "react";
import { Code, Rocket, Award } from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaXTwitter,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa6";

type IconType = ComponentType<{ className?: string }>;

/* ----------------------------- Navigation ----------------------------- */

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "saying-more", label: "Blog" },
  { id: "contact", label: "Get In Touch" },
];

export const NAV_SOCIALS: { label: string; href: string; Icon: IconType }[] = [
  {
    label: "LinkedIn Profile",
    href: "https://www.linkedin.com/in/weldamlak-ayenew",
    Icon: FaLinkedin,
  },
  { label: "GitHub Profile", href: "https://github.com", Icon: FaGithub },
  {
    label: "Twitter/X Profile",
    href: "https://x.com/WeldamlakAyenew",
    Icon: FaXTwitter,
  },
];

/* ------------------------------ Gallery ------------------------------- */

export const GALLERY_IMAGES = Array.from({ length: 10 }, (_, i) => `/${i + 1}.jpg`);

/* -------------------------------- Home -------------------------------- */

export const HIGHLIGHTS: {
  Icon: IconType;
  title: string;
  desc: string;
  className?: string;
}[] = [
  {
    Icon: Code,
    title: "Full-Stack & Embedded Systems",
    desc: "Next.js, React, Tailwind CSS, Python, C++, Arduino, and ML models, from web apps to microcontrollers.",
  },
  {
    Icon: Rocket,
    title: "Initiatives",
    desc: "Founding AXION Tech, FOCUS, and Winger Academy to build assistive technology and support students across Ethiopia.",
  },
  {
    Icon: Award,
    title: "Recognized Innovator",
    desc: "Addis Ababa City Science Fair Champion, Sub-City 1st Place Winner, and Bruh-Ethiopia Innovative Business Idea Winner.",
    className: "sm:col-span-2 md:col-span-1",
  },
];

/* -------------------------------- About ------------------------------- */

export const TRAINING_ITEMS = [
  {
    label: "2026",
    href: "https://aii.et/",
    linkTitle: "Visit EAII website",
    logo: "/EAII.jpg",
    logoAlt: "EAII Logo",
    title: "Ethiopian Artificial Intelligence Institute (EAII) Summer Camp",
    desc: "Selected for the Machine Learning track to advance skills in core AI technologies.",
  },
  {
    label: "2025",
    href: "https://www.insa.gov.et/",
    linkTitle: "Visit INSA website",
    logo: "/INSA.jpg",
    logoAlt: "INSA Logo",
    title: "INSA Summer Camp (Embedded Systems)",
    desc: "One of 40 students accepted into Robotics & Electrical Engineering. Selected as 1 of 3 students to present a final project directly to the head of the institute.",
  },
  {
    label: "Mentorship",
    href: "https://www.sci-mi.org/",
    linkTitle: "Visit Sci-Mi website",
    logo: "/SCI-MI.jpg",
    logoAlt: "Sci-Mi Logo",
    title: "Sci-Mi Mentorship",
    desc: "Completed specialized Computer Science studies under the Sci-Mi summer mentorship program.",
  },
];

export const SKILL_GROUPS = [
  {
    category: "Frontend & Web",
    skills: ["Next.js", "React", "Tailwind CSS", "TypeScript", "JavaScript"],
  },
  {
    category: "AI & Data Science",
    skills: ["Python", "Pandas", "NumPy", "Plotly", "Pygame", "Scikit-Learn"],
  },
  {
    category: "Robotics & Hardware",
    skills: ["C++", "Arduino", "Embedded Systems", "Sensors & IoT"],
  },
  {
    category: "Tools & Backend",
    skills: ["Supabase", "Git & GitHub", "Vercel", "VS Code", "Linux / Kali"],
  },
];

/* ------------------------------ Experience ---------------------------- */

export interface Experience {
  role: string;
  organization: string;
  period: string;
  image: string;
  desc: string;
  highlights?: { title: string; period: string }[];
  link?: { url: string; label: string };
}

export const EXPERIENCES: Experience[] = [
  
  {
    role: "Volunteer Teacher",
    organization: "Wegene Foundation",
    period: "July 2026",
    image: "/R3.jpg",
    desc: "Teach high school mathematics, science, and English by transforming complex study materials into highly organized, step-by-step guides and delivering engaging, interactive lessons.",
  },

  
  {
    role: "STEM Leader & Tech Educator",
    organization: "Saint Joseph School",
    period: "2024 - 2026",
    image: "/R4.jpg",
    desc: "Served in key student leadership and technology roles at Saint Joseph School, driving STEM initiatives, managing school-wide extracurricular activities, and teaching robotics and web development during the summer internship program.",
    highlights: [
      { title: "STEM Club President", period: "2025 - 2026" },
      { title: "Innovation Club President", period: "2024 - 2025" },
      { title: "Web Developer & Summer Camp Robotics Teacher", period: "July 2026" },
    ],
    link: {
      url: "https://sjs,edu,et/",
      label: "Visit Website",
    },
  },

   {
    role: "Founder & Lead Developer and Engineer",
    organization: "AXION Tech",
    period: "Jan 2026 - Present",
    image: "/R1.jpg",
    desc: "Engineered the AXION Smart Wheelchair prototype featuring Arduino microcontroller integration, custom mobile app controls, sensor obstacle detection, camera tracking, and solar auxiliary charging.",
  },
  {
    role: "Founder and Tutor",
    organization: "Winger Academy",
    period: "Apr 2026 - Present",
    image: "/R2.jpg",
    desc: "Established an academic outreach platform designed to provide instruction, peer mentorship, and STEM resources to high school students across Ethiopia.",
  },

  {
    role: "Volunteer, Researcher & Space Science Advocate",
    organization: "Ethiopian Space Science Society (ESSS)",
    period: "2022 - Present",
    image: "/R5.jpg",
    desc: "Participating in Citizen Science asteroid research while conducting outreach and advocating for space science, aerospace engineering, and satellite technology development in Ethiopia.",
    highlights: [
      { title: "Citizen Science Asteroid Research Project", period: "2025 - Present" },
      { title: "Youth Volunteer & Summer Camp Educator", period: "2024 - Present" },
      { title: "Keynote Speaker: Cosmology & Big Bang Theory", period: "2022 - 2023" },
    ],
    link: {
      url: "https://www.ethiosss.org/esss-branch/",
      label: "Visit ESSS Branch Website",
    },
  },

  
{
  role: "Youth Ambassador & Advisor",
  organization: "Empowering Next Generation (ENG) Ethiopia",
  period: "Aug 2024 - Nov 2025",
  image: "/R5.png",
  desc: "First Place Winner of the 2024 Digital Literacy and Advocacy Program sponsored by Meta. Led a team to victory in a competitive challenge among Youth Ambassador groups by reaching more than 50,000 users. Championed digital inclusion through outreach, public speaking and social media campaigns, and taught digital skills to youth. Appointed to the Youth Ambassadors Advisory team, where I mentored fellow ambassadors and worked with a wider group to reach over 500,000 people online with lessons on digital literacy, online safety, business and more. Took part in the program's closing ceremony and helped open digital literacy clubs in schools across Addis Ababa.",
},
];

/* ------------------------------- Contact ------------------------------ */

export const CONTACT_SOCIALS: { name: string; url: string; Icon: IconType }[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/weldamlak-ayenew",
    Icon: FaLinkedin,
  },
  { name: "GitHub", url: "https://github.com/weldamlak", Icon: FaGithub },
  {
    name: "Instagram",
    url: "https://www.instagram.com/weldamlak.a",
    Icon: FaInstagram,
  },
  {
    name: "Discord",
    url: "https://discord.com/users/1503749867770609845",
    Icon: FaDiscord,
  },
  { name: "X", url: "https://x.com/WeldamlakAyenew", Icon: FaXTwitter },
];
