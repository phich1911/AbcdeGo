"use client";


export default function ContactPage() {
  return (
    <>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Contact</h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.7 }}>
          ติดต่อทีมงาน AbcdeGo ได้หลายช่องทาง
        </p>

        <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {[
            {
              name: "Email",
              handle: "hello@abcdego.com",
              href: "mailto:hello@abcdego.com",
              color: "#10b981",
              svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
            },
            {
              name: "Facebook",
              handle: "AbcdeGo",
              href: "https://www.facebook.com/AbcdeGoOfficial",
              color: "#1877f2",
              svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
            },
            {
              name: "YouTube",
              handle: "@AbcdeGoOfficial",
              href: "https://www.youtube.com/@AbcdeGoOfficial",
              color: "#ff0000",
              svg: <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
            },
          ].map((ch) => (
            <a key={ch.name} href={ch.href} target="_blank" rel="noopener noreferrer"
              className="card-lg flex items-center gap-4 p-5 transition-colors hover:border-[color:var(--primary)]"
              style={{ textDecoration: "none" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${ch.color}18`, color: ch.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {ch.svg}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)" }}>{ch.name}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
