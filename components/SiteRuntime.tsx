"use client";
import { useEffect } from "react";

declare global { interface Window { TT_LEADS?: { url: string; nonceUrl: string; nonce: string; contactUrl: string } } }

export function SiteRuntime() {
  useEffect(() => {
    // Reference anchors use full page navigation, as in WordPress. Mount once per document.
    if (document.documentElement.dataset.ttRuntime === "ready") return;
    document.documentElement.dataset.ttRuntime = "ready";
    window.TT_LEADS = { url: "/api/contact", nonceUrl: "/api/contact", nonce: "", contactUrl: new URL("/#contact", location.origin).href };
    const names = ["navigation", "story", "latest-article-toast", "contact", "contact-modal", "blog-index"];
    for (const name of names) {
      const script = document.createElement("script");
      script.src = `/assets/${name}.js`; script.async = false;
      document.body.appendChild(script);
    }
  }, []);
  return null;
}
