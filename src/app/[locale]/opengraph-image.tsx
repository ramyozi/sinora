import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "Sinora";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image Open Graph generee a la volee : titre + tagline + branding.
// Une par locale, en fallback de l'image dynamique d'une page enfant.
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const useLocale = isLocale(locale) ? locale : "fr";
  const dict = await getDictionary(useLocale);

  const title = dict.hero.title;
  const accent = dict.hero.titleAccent;
  const subtitle = dict.meta.description;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "72px",
          background:
            "linear-gradient(135deg, #1a1714 0%, #221d18 60%, #d8443a 100%)",
          color: "#faf9f7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            opacity: 0.9,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: "#d8443a",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            S
          </div>
          Sinora
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}{" "}
            <span style={{ color: "#f0594b" }}>{accent}</span>
          </div>
          <div
            style={{
              fontSize: 26,
              opacity: 0.75,
              maxWidth: "900px",
              lineHeight: 1.3,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
