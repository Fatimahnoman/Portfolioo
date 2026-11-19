import { ImageResponse } from "next/og";

export const alt =
  "Fatimah Noman — Full Stack Developer & AI Specialist, Founder of SFlyra Labs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Site share thumbnail — dark obsidian canvas, warm gold ramp type,
 * hairline frame. Rendered at build time by Next's ImageResponse; no
 * external assets are fetched, so it works fully offline too.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: "#0a0a0a",
          padding: "52px 68px",
        }}
      >
        {/* ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -220,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(212,175,55,0.30) 0%, rgba(212,175,55,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -200,
            width: 660,
            height: 660,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(244,228,188,0.16) 0%, rgba(244,228,188,0) 68%)",
          }}
        />
        {/* hairline frame */}
        <div
          style={{
            position: "absolute",
            top: 18,
            left: 18,
            right: 18,
            bottom: 18,
            border: "1px solid rgba(212,175,55,0.35)",
            borderRadius: 18,
          }}
        />

        {/* ── top row: wordmark + verified chip ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* FN monogram */}
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(160deg, #f8efc9 0%, #d4af37 42%, #b8860b 100%)",
                color: "#171204",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              FN
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#f4e4bc",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: 4,
                }}
              >
                SFLYRA LABS
              </span>
              <span
                style={{
                  color: "#8f887a",
                  fontSize: 11,
                  letterSpacing: 2,
                  marginTop: 2,
                }}
              >
                FOUNDER &amp; CEO
              </span>
            </div>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: "#d4af37",
              fontSize: 12,
              letterSpacing: 3,
              border: "1px solid rgba(212,175,55,0.45)",
              borderRadius: 999,
              padding: "10px 18px",
              background: "rgba(212,175,55,0.08)",
            }}
          >
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </div>

        {/* ── name block ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            marginTop: 8,
          }}
        >
          <span
            style={{
              color: "#9a9a9a",
              fontSize: 16,
              letterSpacing: 8,
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            HELLO, I&apos;M
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 104,
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            <span
              style={{
                backgroundImage:
                  "linear-gradient(178deg, #fbf6e9 0%, #f4e4bc 25%, #d4af37 52%, #8a6a1f 78%, #f4e4bc 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Fatimah
            </span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(178deg, #fbf6e9 0%, #f4e4bc 25%, #d4af37 52%, #8a6a1f 78%, #f4e4bc 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Noman
            </span>
          </div>
        </div>

        {/* ── footer row ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              height: 1,
              width: "100%",
              background:
                "linear-gradient(90deg, rgba(212,175,55,0.55) 0%, rgba(212,175,55,0.12) 55%, rgba(212,175,55,0) 100%)",
              marginBottom: 20,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                color: "#ece7d9",
                fontSize: 17,
                letterSpacing: 3,
                fontWeight: 600,
              }}
            >
              FULL STACK DEVELOPER{" "}
              <span style={{ color: "#d4af37" }}>&middot;</span> AGENTIC AI
              SPECIALIST
            </span>
            <span
              style={{
                color: "#d4af37",
                fontSize: 18,
                letterSpacing: 2,
                fontWeight: 600,
              }}
            >
              fatimah-ai.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
