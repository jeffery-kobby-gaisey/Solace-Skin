import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#8A9A82",
          color: "#FBF8F3",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 30, letterSpacing: 6, textTransform: "uppercase", opacity: 0.85 }}>
          Solace Skin
        </div>
        <div style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.05, marginTop: 20, maxWidth: 900 }}>
          Reveal Your Best Skin
        </div>
        <div style={{ fontSize: 34, marginTop: 28, opacity: 0.9 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 26, marginTop: 40, opacity: 0.8 }}>
          Skincare & Wellness Spa · {site.location}
        </div>
      </div>
    ),
    { ...size }
  );
}
