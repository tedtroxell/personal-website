"use client";

import { useEffect } from "react";

export function ArticleRuntime({ kind }: { kind: "data" | "pareto" | "note" }) {
  useEffect(() => {
    if (kind === "note") return;
    const id = `tt-article-runtime-${kind}`;
    if (document.getElementById(id)) return;
    const path = kind === "data" ? "/assets/data-center-story.js" : "/assets/pareto-mold-fill.js";
    const script = document.createElement("script");
    script.id = id;
    script.src = path;
    script.async = true;
    document.body.appendChild(script);
    // Native anchors replace the document; retain the script through Strict Mode effect replay.
  }, [kind]);
  return null;
}
