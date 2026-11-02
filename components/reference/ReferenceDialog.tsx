// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.
import type { CSSProperties, ReactNode } from "react";

export function ReferenceDialog({ children }: { children?: ReactNode }) {
  return (
<dialog className={"contact-dialog"} id={"contact-dialog"} aria-labelledby={"contact-dialog-title"} aria-describedby={"contact-dialog-intro"} data-contact-dialog={true}>
{"\n  "}
<div className={"contact-dialog-header"}>
{"\n    "}
<p className={"eyebrow"}>
{"LET’S TALK"}
</p>
{"\n    "}
<button type={"button"} className={"contact-dialog-close"} data-contact-close={true} aria-label={"Close contact form"}>
{"Close "}
<span aria-hidden={"true"}>
{"×"}
</span>
</button>
{"\n  "}
</div>
{"\n  "}
<div className={"contact-dialog-content"}>
{"\n    "}
<h2 id={"contact-dialog-title"} tabIndex={-1}>
{"Good work starts"}
<br />
{"with a conversation."}
</h2>
{"\n    "}
<p id={"contact-dialog-intro"}>
{"A challenge, an opportunity, or an idea. Tell me what you have in mind."}
</p>
{"\n    "}
<div data-contact-modal-body={true}>{children}
{"\n          "}
</div>
{"\n    "}
<p className={"contact-dialog-email"}>
{"Prefer email? "}
<a href={"mailto:ted@tedtroxell.com"}>
{"ted@tedtroxell.com"}
</a>
</p>
{"\n  "}
</div>
{"\n"}
</dialog>
  );
}
