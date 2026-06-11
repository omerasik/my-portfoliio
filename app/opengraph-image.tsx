import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Ömer Faruk Aşık (Omer Asik) — Full-Stack & Automation Developer in Ghent, Belgium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Every glyph rendered below (incl. Turkish ş / ı / Ö) so Google returns one consolidated font file.
const TEXT =
  "FULL-STACK · AUTOMATION · AI Ömer Faruk Aşık (Omer Asik) Full-Stack & Automation Developer Ghent · Belgium omerasik.dev";

async function loadInter(weight: number): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(TEXT)}`;
    const css = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/);
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, bold] = await Promise.all([loadInter(500), loadInter(800)]);

  const fonts = [
    regular ? { name: "Inter", data: regular, weight: 500 as const, style: "normal" as const } : null,
    bold ? { name: "Inter", data: bold, weight: 800 as const, style: "normal" as const } : null
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 800; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(circle at 80% 0%, #143a44 0%, #0e141b 60%)",
          color: "#e9f2f4",
          fontFamily: "Inter, sans-serif",
          borderTop: "10px solid #34f0b2"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, letterSpacing: 6, color: "#34f0b2", fontWeight: 800 }}>
          FULL-STACK · AUTOMATION · AI
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2 }}>
            Ömer Faruk Aşık
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 500, color: "#97adb2", marginTop: 6 }}>
            (Omer Asik)
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800, color: "#56c6ff", marginTop: 22 }}>
            Full-Stack &amp; Automation Developer
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 500 }}>
          <div style={{ display: "flex", color: "#97adb2" }}>Ghent · Belgium</div>
          <div style={{ display: "flex", color: "#34f0b2", fontWeight: 800 }}>omerasik.dev</div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
