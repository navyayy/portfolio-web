import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 36,
          background: "#FAF7F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 100,
            color: "#1A1A1A",
            letterSpacing: -4,
          }}
        >
          NS
        </span>
        <span
          style={{
            position: "absolute",
            right: 16,
            bottom: 28,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#C4703F",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
