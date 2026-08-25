export type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  cta: { label: string; href: string };
  /** Desktop / landscape still. Path stays as the client-supplied filename,
   *  e.g. /images/hero/tot.png. */
  image?: string;
  /** Mobile / portrait crop of the same still. Same filename with an "m"
   *  appended before the extension, e.g. /images/hero/tot.png. Swapped in
   *  below 768px via a <picture><source media> so the browser only ever
   *  downloads the one it needs — never both. */
  imageMobile?: string;
  imageLabel: string;
  gradient: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "chuchin-ultimate-productions",
    eyebrow: "An award-winning production company",
    title: "Chuchin",
    titleAccent: "Ultimate Productions",
    description:
      "An award-winning Nigerian production company creating films, dramas, and digital content that celebrate family, culture, and resilience.",
    cta: { label: "Learn Our Story", href: "/#" },
    image: "/images/hero/tot.png",
    imageMobile: "/images/hero/award.jpg",
    imageLabel: "Chuchin Ultimate Productions",
    gradient: "from-[#1e1a16] via-charcoal-950 to-[#221407]"
  },
   {
    id: "main-character-journey",
    eyebrow: "The Main Character Journey",
    title: "Every creative",
    titleAccent: "has an edge to find.",
    description:
      "Stellamaris Chinasa Duru's masterclass for actors, filmmakers, screenwriters, and media entrepreneurs building a career in the industry.",
    cta: { label: "Discover the Masterclass", href: "/#" },
    image: "/images/hero/simm.png",
    imageMobile: "/images/hero/sum.png",
    imageLabel: "The Main Character Journey — Still",
    gradient: "from-[#191512] via-charcoal-950 to-[#241610]"
  },
  {
    id: "sands-of-time",
    eyebrow: "Flagship Series",
    title: "Sands of Time",
    titleAccent: "carries the family forward.",
    description:
      "A Nollywood drama of love, ambition, and the loyalty that holds a family together across two acclaimed seasons.",
    cta: { label: "Watch the Story", href: "/#" },
    image: "/images/hero/tot.png",
    imageMobile: "/images/hero/award.jpg",
    imageLabel: "Sands of Time — Still",
    gradient: "from-[#1c1815] via-charcoal-950 to-[#2a1508]"
  },
  {
    id: "affiong-go-lagos",
    eyebrow: "Season One",
    title: "Affiong Go Lagos",
    titleAccent: "a city, a beginning.",
    description:
      "The season that opened Sands of Time to the world — ambition meeting the pull of home.",
    cta: { label: "Explore Season One", href: "/#" },
    image: "/images/hero/agl.png",
    imageMobile: "/images/hero/ep.jpg",
    imageLabel: "Affiong Go Lagos — Still",
    gradient: "from-[#1a1611] via-charcoal-950 to-[#231a0a]"
  },
 
];