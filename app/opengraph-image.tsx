import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zuza | Onchain Trust Agent";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at 20% 20%, #42127a 0%, #190f35 42%, #0a0818 100%)",
          color: "#f3ecff"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 34,
            opacity: 0.92
          }}
        >
          Zuza
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 86, fontWeight: 700, lineHeight: 1.02, maxWidth: 980 }}>
            Reputation greater than hype.
          </div>
          <div style={{ fontSize: 34, opacity: 0.88 }}>
            Onchain trust dapps on Base. ERC-8004 identity. zScore + $ZUZA.
          </div>
        </div>
      </div>
    ),
    size
  );
}
