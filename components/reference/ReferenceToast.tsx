// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.
import type { CSSProperties } from "react";
import { publishedArticles } from "@/lib/article-index";

export function ReferenceToast() {
  const article = publishedArticles[0];
  return (
<aside className={"latest-article-toast"} data-latest-article-toast={true} data-article-id={article.slug} aria-labelledby={"tt-latest-article-title-97"} hidden>
{"\n  "}
<div className={"latest-article-toast-titleblock"}>
{"\n    "}
<div className={"latest-article-toast-titleblock-brand"}>
{"\n      "}
<svg className={"latest-article-toast-drafting-mark"} viewBox={"0 0 32 32"} aria-hidden={"true"} focusable={"false"}>
{"\n        "}
<circle cx={"16"} cy={"16"} r={"10.5"} fill={"none"} stroke={"currentColor"} strokeWidth={"1"} strokeDasharray={"48 18"} transform={"rotate(-32 16 16)"}>

</circle>
{"\n        "}
<path d={"M16 2v8m0 12v8M2 16h8m12 0h8"} fill={"none"} stroke={"currentColor"} strokeWidth={"1"}>

</path>
{"\n        "}
<circle cx={"16"} cy={"16"} r={"2.5"} fill={"#e87558"}>

</circle>
{"\n      "}
</svg>
{"\n      "}
<span>
{"TT "}
<i aria-hidden={"true"}>
{"/"}
</i>
{" FIELD NOTES"}
</span>
{"\n    "}
</div>
{"\n    "}
<span className={"latest-article-toast-dwg"}>
{"DWG / EDITORIAL"}
</span>
{"\n  "}
</div>
{"\n  "}
<div className={"latest-article-toast-head"}>
{"\n    "}
<p className={"eyebrow"}>
{"Latest article "}
<span aria-hidden={"true"}>
{"·"}
</span>
{" " + article.date}
</p>
{"\n    "}
<button className={"latest-article-toast-dismiss"} type={"button"} data-dismiss-article-toast={true} aria-label={"Dismiss latest article notice"}>
{"×"}
</button>
{"\n  "}
</div>
{"\n  "}
<a className={"latest-article-toast-link"} data-open-article-toast={true} href={`/${article.slug}/`}>
{"\n    "}
<strong id={"tt-latest-article-title-97"}>
{article.title}
</strong>
{"\n    "}
<span className={"latest-article-toast-excerpt"}>
{article.excerpt}
</span>
{"\n    "}
<span className={"latest-article-toast-action"}>
{"Read the article "}
<span aria-hidden={"true"}>
{"↗"}
</span>
</span>
{"\n  "}
</a>
{"\n"}
</aside>
  );
}
