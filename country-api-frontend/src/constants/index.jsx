import { BarChartIcon, BotMessageSquare, GlobeIcon, LanguagesIcon, MapIcon, SearchCheckIcon, UsersIcon } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "/countries" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];

export const testimonials = [
  {
    user: "Alex Turner",
    company: "TravelWithAlex Blog",
    image: user1,
    text: "This app made planning my trip so much easier. I could learn about each country’s culture, currency, and visa info in one place!",
  },
  {
    user: "Maria Chen",
    company: "Global Studies Professor",
    image: user2,
    text: "I use this tool in my classroom to teach students about geography and global demographics. It's accurate, fast, and very user-friendly.",
  },
  {
    user: "Daniel Osei",
    company: "UN Data Analyst",
    image: user3,
    text: "A fantastic resource for quickly pulling up stats on any country. It’s now a part of my daily toolkit.",
  },
  {
    user: "Sofia Martinez",
    company: "Digital Nomad",
    image: user4,
    text: "I travel full-time and use this app to check important details before visiting a new country—like time zones, currencies, and language tips.",
  },
  {
    user: "Liam Foster",
    company: "EduQuest Learning",
    image: user5,
    text: "We integrated this app into our online learning platform. It makes geography interactive and exciting for students.",
  },
  {
    user: "Nina Hassan",
    company: "Freelance Researcher",
    image: user6,
    text: "I love how easy it is to explore and compare countries. The interface is intuitive and the data is always up to date.",
  },
];


export const features = [
  {
    icon: <GlobeIcon />,
    text: "Explore Any Country",
    description:
      "Access detailed information on every country including flags, languages, population, and time zones.",
  },
  {
    icon: <SearchCheckIcon />,
    text: "Powerful Search",
    description:
      "Find countries instantly by name, capital, region, or ISO code with a fast, responsive search experience.",
  },
  {
    icon: <MapIcon />,
    text: "Interactive Maps",
    description:
      "Visualize countries and their borders using interactive maps with zoom, drag, and region highlights.",
  },
  {
    icon: <UsersIcon />,
    text: "Demographic Data",
    description:
      "Get insights into population, density, life expectancy, and other key statistics with clear visualizations.",
  },
  {
    icon: <LanguagesIcon />,
    text: "Languages & Culture",
    description:
      "Learn what languages are spoken, along with interesting cultural facts about each nation.",
  },
  {
    icon: <BarChartIcon />,
    text: "Economy & Infrastructure",
    description:
      "View GDP, currency, internet usage, and more to understand each country's economic profile.",
  },
];

export const checklistItems = [
  {
    title: "Instant Search Results",
    description: "Quickly find any country with real-time filtering and responsive suggestions.",
  },
  {
    title: "Up-to-Date Information",
    description: "All data is pulled from trusted, frequently updated global sources.",
  },
  {
    title: "Accessible from Any Device",
    description: "Whether you're on desktop, tablet, or mobile, our app adapts to your screen.",
  },
  {
    title: "Educational and Fun",
    description: "Perfect for students, travelers, or curious minds who want to explore the world.",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Basic country search",
      "Interactive map view",
      "Access to essential data",
      "Mobile responsive",
    ],
  },
  {
    title: "Pro",
    price: "$9",
    features: [
      "Save favorite countries",
      "Downloadable data",
      "Ad-free experience",
      "Priority support",
    ],
  },
  {
    title: "Enterprise",
    price: "$99",
    features: [
      "Bulk data exports",
      "API access for integration",
      "Custom dashboards",
      "Team collaboration tools",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];
