export type Season = {
  slug: string;
  title: string;
  synopsis: string;
  poster: string;
  /** Trailer/teaser YouTube video ID — used for the homepage's autoplaying panel. */
  youtubeId?: string;
  /** Full episode/movie YouTube video ID — used on the production detail page. */
  fullEpisodeYoutubeId?: string;
  /** Path to a locally-hosted full episode/movie video file (e.g. /images/happy.mp4).
   *  Used instead of fullEpisodeYoutubeId when the episode isn't on YouTube —
   *  rendered as a real <video> tag rather than an iframe. */
  localVideoSrc?: string;
};

export type BroadcastSlot = {
  network: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  time: string;
  /** Path to the network's logo. Drop the real file at this path and it
   *  swaps in automatically; until then, a placeholder with the network's
   *  initials shows instead. */
  logo?: string;
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
  /** Linear TV broadcast schedule — where and when the show airs. */
  broadcastSchedule?: BroadcastSlot[];
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
    crew: [],
    seasons: [
      {
        slug: "affiong-go-lagos",
        title: "Affiong Go Lagos",
        synopsis:
          "The first season of Sands of Time, following the family's story as it begins to unfold in Lagos.",
        poster: "/images/productions/affiong-go-lagos/poster.jpg",
        youtubeId: "Y_6D-x9NdjI",
        fullEpisodeYoutubeId: "fMHjYLxT0AU"
      },
      {
        slug: "we-happy-people",
        title: "We Happy People",
        synopsis:
          "The second season of Sands of Time, deepening the drama, ambition, and resilience of the family at its heart.",
        poster: "/images/productions/we-happy-people/poster.jpg",
        youtubeId: "axUFFszPm4U",
        localVideoSrc: "/images/happy.mp4"
      }
    ],
    gallery: [],
    awards: [
      "Nominated — Best Television Series, TINFF",
      "Selected — Best Television Series (Drama), TICAFF",
      "Selected — Best Television Series (Drama), BINFF"
    ],
    broadcastSchedule: [
      { network: "RSTV PH", day: "Monday", time: "7:00–7:30PM", logo: "/images/12.png" },
      { network: "ITV Benin", day: "Monday", time: "9:30–10:00PM", logo: "/images/11.png" },
      { network: "EBS TV", day: "Monday", time: "12:00–12:30PM", logo: "/images/13.png" },
      { network: "OGTV", day: "Tuesday", time: "7:30–8:00PM", logo: "/images/10.png" },
      { network: "TVC", day: "Tuesday", time: "8:00–8:30PM", logo: "/images/9.png" },
      { network: "ITV Abuja", day: "Tuesday", time: "8:30–9:00PM", logo: "/images/8.png" },
      { network: "NTA2CH5", day: "Wednesday", time: "8:00–8:30PM", logo: "/images/7.png" },
      { network: "Wazobia Max Lagos", day: "Thursday", time: "6:00–6:30PM", logo: "/images/6.png" },
      { network: "PRTV Jos (Plateau & Jos)", day: "Thursday", time: "8:30–9:00PM", logo: "/images/5.png" },
      { network: "Wazobia PH", day: "Friday", time: "6:30–7:00PM", logo: "/images/networks/4.png" },
      { network: "STV", day: "Saturday", time: "11:00–11:30AM", logo: "/images/3.png" },
      { network: "Wazobia Max Abuja", day: "Saturday", time: "6:30–7:00PM", logo: "/images/2.png" },
      { network: "WAPTV", day: "Sunday", time: "5:30–6:00PM", logo: "/images/1.png" }
    ]
  }
];