// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.
import type { CSSProperties } from "react";

export function ReferenceHeader() {
  return (
<header className={"site-header"}>
{"\n  "}
<a className={"brand"} href={"/"} aria-label={"Ted Troxell home"}>
<span className={"brand-mark"} aria-hidden={"true"}>
{"t"}
<span>
{"t"}
</span>
</span>
<span>
{"Ted Troxell"}
<span className={"brand-caption"}>
{"TECHNOLOGY. PEOPLE. POSSIBILITY."}
</span>
</span>
</a>
{"\n  "}
<button className={"menu-toggle"} hidden aria-expanded={"false"} aria-controls={"site-nav"}>
{"Menu "}
<span aria-hidden={"true"}>
{"+"}
</span>
</button>
{"\n  "}
<nav id={"site-nav"} aria-label={"Main navigation"}>
{"\n    "}
<a href={"/blog/"}>
{"Writing"}
</a>
{"\n    "}
<a href={"/#work"}>
{"Work"}
</a>
{"\n    "}
<a href={"/#leadership"}>
{"Approach"}
</a>
{"\n    "}
<a href={"/#lab"}>
{"The lab"}
</a>
{"\n    "}
<a href={"/#community"}>
{"Community"}
</a>
{"\n    "}
<a className={"nav-contact"} href={"/#contact"}>
{"Let’s talk "}
<span aria-hidden={"true"}>
{"↗"}
</span>
</a>
{"\n  "}
</nav>
{"\n"}
</header>
  );
}
