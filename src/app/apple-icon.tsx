import { ImageResponse } from "next/og";

// Touch icon iOS / Android : Next.js sert le PNG genere via ImageResponse a
// l'URL /apple-icon. Taille recommandee 180x180. Pictogramme Sinora (sommets
// karstiques + soleil) sur fond accent #d8443a.

export const runtime = "edge";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d8443a",
          borderRadius: 40,
        }}
      >
        <svg
          width={120}
          height={120}
          viewBox="0 0 24 24"
          fill="#ffffff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17" cy="6.5" r="2.5" />
          <path d="M2 20.5 L8 9 L12.5 17 L15.5 11.5 L22 20.5 Z" />
        </svg>
      </div>
    ),
    size,
  );
}
