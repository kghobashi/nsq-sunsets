const EXPECTED_USER = "sunsets";
const EXPECTED_PASS_SHA256 = "f6bc7760b06542a3097ba248f301d7702ebe5fe2622a50735e57199c84cd4219";

const DISPLAY_WEIGHT_FIX = `
<style id="sunsets-display-weight-fix">
  html, body { font-synthesis: none !important; }

  /* Keep all primary SUNSETS display typography at the same elegant POINA weight. */
  .hero-title,
  .hero-slogan,
  .editorial-title,
  .scene-title,
  .network-title,
  .destination-copy h3,
  .more-head .editorial-title,
  .footer-cta h2,
  .slide-title,
  .closing-title,
  .section-heading,
  .hero-title,
  .investment-heading,
  .contact-heading,
  .thesis-title,
  .market-context-heading,
  .system-name,
  .phase-badge-title,
  .roadmap-title,
  .sourcing-card h3 {
    font-weight: 400 !important;
    font-synthesis: none !important;
  }
</style>
`;
const BRAND_HEAD = `
<meta id="sunsets-brand-head" name="theme-color" content="#07131F">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/brand/favicon-180.png">
<link rel="manifest" href="/assets/brand/site.webmanifest">
`;

async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function unauthorized() {
  return new Response("SUNSETS private preview", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="SUNSETS Private Preview", charset="UTF-8"',
      "Cache-Control": "no-store, private",
      "X-Robots-Tag": "noindex, nofollow, noarchive"
    }
  });
}

export async function onRequest(context) {
  const auth = context.request.headers.get("Authorization") || "";
  if (!auth.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(":");
  if (separator < 0) return unauthorized();

  const username = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);
  const passwordHash = await sha256Hex(password);

  if (username !== EXPECTED_USER || passwordHash !== EXPECTED_PASS_SHA256) {
    return unauthorized();
  }

  const response = await context.next();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, private");
  headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");

  const contentType = headers.get("Content-Type") || "";
  if (contentType.includes("text/html")) {
    let html = await response.text();
    const additions =
      (html.includes('id="sunsets-brand-head"') ? "" : BRAND_HEAD) +
      (html.includes('id="sunsets-display-weight-fix"') ? "" : DISPLAY_WEIGHT_FIX);
    if (additions) {
      html = html.includes("</head>")
        ? html.replace("</head>", additions + "\n</head>")
        : additions + html;
    }
    headers.delete("Content-Length");
    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }

  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
