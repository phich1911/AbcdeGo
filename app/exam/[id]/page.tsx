import ExamClient from "./ExamClient";

// Known exam ids, prerendered at build time instead of server-rendered per
// request. Hardcoded (not imported from lib/exam-data) since that module is
// guarded to throw if ever pulled into the client-bundled ExamClient.
export async function generateStaticParams() {
  return [{ id: "kp-mock-1" }, { id: "kp-mock-2" }, { id: "toeic-mock-1" }];
}

export default async function ExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ExamClient id={id} />;
}
