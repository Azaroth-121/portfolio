import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const contentType = "image/png";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.name;
  const subtitle = searchParams.get("subtitle") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#f7f6f3",
          color: "#0b0b0a",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 2, color: "#a8501f" }}>
          {siteConfig.name.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 600,
            marginTop: 24,
            lineHeight: 1.2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ display: "flex", fontSize: 28, marginTop: 24, color: "#6b675f" }}>
            {subtitle}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
