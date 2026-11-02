// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.
import type { CSSProperties } from "react";
import { ArchivePosts } from "@/components/articles/ArchivePosts";

export function BlogContent() {
  return (
<main id={"main"} className={"page-wrap wrap blog-index"} tabIndex={-1} data-blog-index={true}>
{"\n    "}
<header className={"blog-heading"}>
{"\n        "}
<div className={"blog-heading-copy"}>
{"\n            "}
<p className={"eyebrow"}>
{"WRITING / FIELD NOTES"}
</p>
{"\n            "}
<h1>
{"Blog"}
</h1>
{"\n            "}
<p className={"blog-deck"}>
{"Notes from the work of making complex technology useful: practical experiments, engineering decisions, and the people and systems behind them."}
</p>
{"\n        "}
</div>
{"\n        "}
<figure className={"blog-drawing"} aria-hidden={"true"}>
{"\n            "}
<svg viewBox={"0 0 420 280"} role={"presentation"}>
{"\n                "}
<g className={"blog-drawing-grid"}>
<path d={"M20 30H400M20 70H400M20 110H400M20 150H400M20 190H400M20 230H400M40 15V250M80 15V250M120 15V250M160 15V250M200 15V250M240 15V250M280 15V250M320 15V250M360 15V250M400 15V250"}>

</path>
</g>
{"\n                "}
<path className={"blog-drawing-path"} d={"M54 188h63l36-62h74l41-58h94"}>

</path>
{"\n                "}
<circle className={"blog-drawing-node"} cx={"54"} cy={"188"} r={"7"}>

</circle>
<circle className={"blog-drawing-node"} cx={"153"} cy={"126"} r={"7"}>

</circle>
<circle className={"blog-drawing-node"} cx={"227"} cy={"126"} r={"7"}>

</circle>
<circle className={"blog-drawing-node"} cx={"268"} cy={"68"} r={"7"}>

</circle>
<circle className={"blog-drawing-node"} cx={"362"} cy={"68"} r={"7"}>

</circle>
{"\n                "}
<path className={"blog-drawing-dim"} d={"M54 210v23h308v-23M54 222h308M20 26h14m-7-7v14M386 26h14m-7-7v14"}>

</path>
{"\n                "}
<text x={"59"} y={"250"}>
{"QUESTION → TEST → EVIDENCE"}
</text>
<text x={"22"} y={"16"}>
{"DWG 01 / WORKING MODEL"}
</text>
{"\n            "}
</svg>
{"\n            "}
<figcaption>
{"FIELD NOTES / SERIES 01"}
</figcaption>
{"\n        "}
</figure>
{"\n    "}
</header>
{"\n\n            "}
<ArchivePosts />
</main>
  );
}
