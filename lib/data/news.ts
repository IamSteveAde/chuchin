export type NewsPost = {
  slug: string;
  category: "Premiere" | "Recognition" | "Behind the Scenes";
  title: string;
  excerpt: string;
  date: string;
};

export const news: NewsPost[] = [
  {
    slug: "sands-of-time-season-2-premiere",
    category: "Premiere",
    title: "Sands of Time Season 2 Premieres Soon",
    excerpt:
      "Chuchin Ultimate Productions proudly announces the premiere of Sands of Time Season 2. Fans can look forward to even more drama, suspense, and heartwarming stories — plus exclusive behind-the-scenes content and cast interviews.",
    date: "2026"
  },
  {
    slug: "international-recognition-2026",
    category: "Recognition",
    title: "Sands of Time Earns International Recognition",
    excerpt:
      "In 2026, Sands of Time received a nomination for Best Television Series at the Toronto International Nollywood Film Festival, with further selections at TICAFF and BINFF — recognition of storytelling that celebrates Nigerian culture on a global stage.",
    date: "2026"
  },
  {
    slug: "behind-the-scenes-update",
    category: "Behind the Scenes",
    title: "Behind the Camera: New Episodes in Production",
    excerpt:
      "The team is hard at work on new episodes of Sands of Time, bringing fresh stories and memorable performances to viewers — with exciting plot twists and the production value Chuchin Ultimate Productions is known for.",
    date: "2026"
  }
];
