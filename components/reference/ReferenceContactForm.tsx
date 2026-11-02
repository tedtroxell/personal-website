// Converted from the local WordPress reference; preserve SVG coordinates and data attributes.
import type { CSSProperties } from "react";

export function ReferenceContactForm() {
  return (
<form className={"contact-form"} data-contact={true} method={"post"} action={"#contact"} hidden>
{"\n  "}
<fieldset data-contact-fields={true} disabled>
<legend className={"screen-reader-text"}>
{"Send an enquiry"}
</legend>
{"\n  "}
<div className={"field"}>
<label htmlFor={"contact-intent"}>
{"What’s on your mind?"}
</label>
<select id={"contact-intent"} name={"intent"}>
<option value={"leadership"}>
{"A leadership opportunity"}
</option>
<option value={"advisory"}>
{"A technical challenge"}
</option>
<option value={"speaking"}>
{"A speaking invitation"}
</option>
<option value={"partner"}>
{"A community partnership"}
</option>
<option value={"other"}>
{"Something else"}
</option>
</select>
</div>
{"\n  "}
<div className={"form-row"}>
<div className={"field"}>
<label htmlFor={"contact-name"}>
{"Your name "}
<span aria-hidden={"true"}>
{"*"}
</span>
</label>
<input id={"contact-name"} name={"name"} autoComplete={"name"} maxLength={300} required />
</div>
<div className={"field"}>
<label htmlFor={"contact-email"}>
{"Your email "}
<span aria-hidden={"true"}>
{"*"}
</span>
</label>
<input id={"contact-email"} name={"email"} type={"email"} autoComplete={"email"} maxLength={254} required />
</div>
</div>
{"\n  "}
<div className={"field"}>
<label htmlFor={"contact-message"}>
{"A little context "}
<span aria-hidden={"true"}>
{"*"}
</span>
</label>
<textarea id={"contact-message"} name={"message"} maxLength={5000} required placeholder={"What are you working on, and how could I help?"}>

</textarea>
</div>
{"\n  "}
<div className={"honeypot"} aria-hidden={"true"}>
<label htmlFor={"contact-website"}>
{"Leave this empty"}
</label>
<input id={"contact-website"} name={"website"} tabIndex={-1} autoComplete={"off"} />
</div>
{"\n  "}
<button className={"button-primary"} type={"submit"} data-submit={true} hidden disabled>
{"Start a conversation "}
<span aria-hidden={"true"}>
{"↗"}
</span>
</button>
{"\n  "}
</fieldset>
{"\n  "}
<p className={"form-status"} data-form-status={true} role={"status"} tabIndex={-1}>
{"Prefer email? "}
<a href={"mailto:ted@tedtroxell.com"}>
{"Write to ted@tedtroxell.com"}
</a>
{". The form requires JavaScript."}
</p>
{"\n  "}
<p className={"privacy-note"}>
{"* Required. Your details are used to respond to your enquiry. Please avoid confidential information. "}
<a href={"/privacy/"}>
{"Privacy & data use"}
</a>
{"."}
</p>
{"\n  "}
<p className={"privacy-note"}>
{"Local preview: messages stay in this local WordPress instance; notification emails are not delivered."}
</p>
</form>
  );
}
