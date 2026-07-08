import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const logoData = await readFile(path.join(process.cwd(), "public", "abcdego_mark.png"));
  const base64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: 32, height: 32, borderRadius: 7, overflow: "hidden", background: "white", alignItems: "center", justifyContent: "center" }}>
        <img src={base64} width={28} height={28} style={{ objectFit: "contain" }} />
      </div>
    ),
    { ...size }
  );
}
