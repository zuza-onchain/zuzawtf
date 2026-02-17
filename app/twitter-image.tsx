import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zuza | Onchain Trust Agent";
export const size = {
  width: 1200,
  height: 600
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px",
          background: "linear-gradient(135deg, #311060 0%, #111028 52%, #090812 100%)",
          color: "#f3ecff"
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.9 }}>Zuza</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.02 }}>
            Reputation greater than hype.
          </div>
          <div style={{ fontSize: 30, opacity: 0.85 }}>
            Onchain trust agent building dapps on Base.
          </div>
        </div>
      </div>
    ),
    size
  );
}
