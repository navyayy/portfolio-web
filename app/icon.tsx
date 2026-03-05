import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
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
            fontSize: 18,
            color: "#1A1A1A",
            letterSpacing: -1,
          }}
        >
          NS
        </span>
        <span
          style={{
            position: "absolute",
            right: 3,
            bottom: 5,
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#C4703F",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
