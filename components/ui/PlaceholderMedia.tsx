import ApertureIcon from "./ApertureIcon";

type PlaceholderMediaProps = {
  label: string;
  ratio?: "video" | "portrait" | "square";
  className?: string;
  dark?: boolean;
};

const ratios: Record<NonNullable<PlaceholderMediaProps["ratio"]>, string> = {
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  square: "aspect-square"
};

/**
 * Standing in for media assets the client hasn't supplied yet (hero video,
 * posters, founder photo, trailers). Swap for next/image or a video embed
 * once real files land in /public/images.
 */
export default function PlaceholderMedia({
  label,
  ratio = "video",
  className = "",
  dark = true
}: PlaceholderMediaProps) {
  return (
    <div
      className={`relative flex ${ratios[ratio]} w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border ${
        dark ? "border-offwhite/10 bg-charcoal-800 text-offwhite/40" : "border-charcoal/10 bg-offwhite-dim text-charcoal/40"
      } ${className}`}
    >
      <ApertureIcon size={36} open={false} className="opacity-60" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
