export type Season = {
  slug: string;
  title: string;
  synopsis: string;
  poster: string;
  /** YouTube video ID (the part after /embed/ or ?v=), e.g. "Y_6D-x9NdjI". */
  youtubeId?: string;
};

export type Production = {
  slug: string;
  title: string;
  logline: string;
  synopsis: string;
  poster: string;
  trailerUrl?: string;
  cast: string[];
  crew: { role: string; name: string }[];
  seasons: Season[];
  gallery: string[];
  awards: string[];
};

export const productions: Production[] = [
  {
    slug: "sands-of-time",
    title: "Sands of Time",
    logline: "A family's loyalty is tested by love, ambition, and buried secrets.",
    synopsis:
      "Sands of Time is a compelling Nollywood family drama series that explores love, ambition, and the bonds that hold families together. Follow the journey of the family at its center as they navigate challenges, uncover secrets, and learn the true meaning of loyalty and resilience. With a talented ensemble cast and rich storytelling, Sands of Time captivates audiences with drama, emotion, and cultural depth.",
    poster: "/images/productions/sands-of-time/poster.jpg",
    trailerUrl: undefined,
    cast: [],
    crew: [{ role: "Executive Producer", name: "Stellamaris Duru" }],
    seasons: [
      {
        slug: "affiong-go-lagos",
        title: "Affiong Go Lagos",
        synopsis:
          "The first season of Sands of Time, following the family's story as it begins to unfold in Lagos.",
        poster: "/images/productions/affiong-go-lagos/poster.jpg",
        youtubeId: "Y_6D-x9NdjI"
      },
      {
        slug: "we-happy-people",
        title: "We Happy People",
        synopsis:
          "The second season of Sands of Time, deepening the drama, ambition, and resilience of the family at its heart.",
        poster: "/images/productions/we-happy-people/poster.jpg",
        youtubeId: "axUFFszPm4U"
      }
    ],
    gallery: [],
    awards: [
      "Nominated — Best Television Series, TINFF",
      "Selected — Best Television Series (Drama), TICAFF",
      "Selected — Best Television Series (Drama), BINFF"
    ]
  }
];