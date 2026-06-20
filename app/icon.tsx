import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: 32, height: 32, borderRadius: 7, overflow: "hidden", background: "white", alignItems: "center", justifyContent: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://www.abcdego.com/AbcdeGo Logo.png" width={24} height={24} alt="" style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size }
  );
}
