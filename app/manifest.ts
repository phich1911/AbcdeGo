import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AbcdeGo — Learn. Play. Level Up.",
    short_name: "AbcdeGo",
    description: "แพลตฟอร์มเรียนออนไลน์ฟรี ม.ปลาย + สอบราชการ ก.พ. / ภาค ข. สะสม XP แข่ง Leaderboard ทั่วประเทศ",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#007aff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
