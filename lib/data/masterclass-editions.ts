// Real event details from The Main Character Journey masterclass materials.
// Nothing fabricated — headliners, schedule, and partners are transcribed
// directly from the official event flyer and program.

export type HeadlinerRole = "Special Guest of Honor" | "Speaker" | "Panelist" | "Host" | "Guest Appearance";

export type Headliner = {
  name: string;
  role: HeadlinerRole;
  /** Optional photo path — falls back to initials until a real file exists here. */
  photo?: string;
};

export type MasterclassEdition = {
  title: string;
  date: string;
  venue: string;
  schedule: { label: string; time: string }[];
  headliners: Headliner[];
  partners: string[];
};

export const masterclassTagline = "Be Seen. Be Heard. Be the Main Character.";

export const pastMasterclasses: MasterclassEdition[] = [
  {
    title: "The Main Character",
    date: "March 28, 2026",
    venue: "2b Residence Road, off NCI Bus-Stop, Gbagada, Lagos",
    schedule: [
      { label: "Registration & Accreditation", time: "8:00 AM" },
      { label: "Red Carpet", time: "9:00 AM" },
      { label: "Doors Close", time: "10:00 AM" }
    ],
    headliners: [
      { name: "Wale Adenuga MFR", role: "Special Guest of Honor", photo: "/images/masterclass/headliners/wale-adenuga.jpg" },
      { name: "John Njamah", role: "Speaker", photo: "/images/masterclass/headliners/john-njamah.jpg" },
      { name: "Yinka Adebayo", role: "Speaker", photo: "/images/masterclass/headliners/yinka-adebayo.jpg" },
      { name: "Ireti Doyle", role: "Speaker", photo: "/images/masterclass/headliners/ireti-doyle.jpg" },
      { name: "Saheed Balogun", role: "Panelist", photo: "/images/masterclass/headliners/saheed-balogun.jpg" },
      { name: "Patience Oghre Imobhio", role: "Panelist", photo: "/images/masterclass/headliners/patience-oghre-imobhio.jpg" },
      { name: "Steve Onu (Yaw)", role: "Panelist", photo: "/images/masterclass/headliners/steve-onu.jpg" },
      { name: "Blessing Obasi-Nze", role: "Panelist", photo: "/images/masterclass/headliners/blessing-obasi-nze.jpg" },
      { name: "Alexis Ukpabia", role: "Host", photo: "/images/masterclass/headliners/alexis-ukpabia.jpg" },
      { name: "Titilola Aboyade-Cole", role: "Guest Appearance", photo: "/images/masterclass/headliners/titilola-aboyade-cole.jpg" },
      { name: "Gina Ehikodi-Ojo", role: "Guest Appearance", photo: "/images/masterclass/headliners/gina-ehikodi-ojo.jpg" }
    ],
    partners: ["PEFTI", "Potter's Ville Church"]
  }
];