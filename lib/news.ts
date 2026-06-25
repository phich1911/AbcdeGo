export type NewsItem = {
  id: string;
  date: string; // "YYYY-MM-DD"
  tag: "ก.พ." | "ราชการ" | "ทั่วไป";
  title: string;
  body: string;
  link?: string;
  linkLabel?: string;
  pinned?: boolean;
};

export const NEWS: NewsItem[] = [
  {
    id: "kp-2568-schedule",
    date: "2025-06-25",
    tag: "ก.พ.",
    title: "ก.พ. ภาค ก. ปี 2568 — กำหนดการสอบ",
    body: "สำนักงาน ก.พ. ประกาศกำหนดการสอบภาค ก. ประจำปี 2568 สมัครผ่านเว็บไซต์ job.ocsc.go.th ติดตามข้อมูลล่าสุดได้ที่เว็บไซต์ก.พ.โดยตรง",
    link: "https://job.ocsc.go.th",
    linkLabel: "ดูรายละเอียดที่เว็บ ก.พ.",
    pinned: true,
  },
];
