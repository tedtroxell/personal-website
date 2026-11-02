import { appendFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { formspreeRequest } from "@/lib/contact-formspree";

export const runtime = "nodejs";
const intents = new Set(["leadership", "advisory", "speaking", "partner", "other"]);
const failure = (message: string, status = 400) => Response.json({ ok: false, message }, { status });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return failure("Please submit the form from this website.", 403);
  const raw = await request.text();
  if (raw.length > 12000) return failure("Your message is too long.");
  let fields: Record<string, unknown>;
  try { fields = JSON.parse(raw); } catch { return failure("Please check your message and try again."); }
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) return failure("Please check your message and try again.");
  if (fields.website) return Response.json({ ok: true });
  const text = (key: string) => typeof fields[key] === "string" ? fields[key].trim() : "";
  const lead = { name: text("name"), email: text("email"), intent: text("intent"), message: text("message"), request_id: text("request_id") };
  if (!lead.name || lead.name.length > 300 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.email.length > 254 || !lead.message || lead.message.length > 5000 || !intents.has(lead.intent) || !/^[a-zA-Z0-9-]{8,120}$/.test(lead.request_id)) return failure("Please check your name, email and message, then try again.");
  try {
    const destination = process.env.CONTACT_WEBHOOK_URL;
    if (destination) {
      const headers: Record<string, string> = { "Content-Type": "application/json", "Idempotency-Key": lead.request_id };
      if (process.env.CONTACT_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}`;
      const result = await fetch(destination, { method: "POST", headers, body: JSON.stringify(lead), signal: AbortSignal.timeout(12000) });
      if (!result.ok) throw new Error("The message service did not accept the enquiry.");
    } else if (process.env.VERCEL) {
      const formspree = formspreeRequest(lead);
      const result = await fetch(formspree.url, formspree.init);
      if (!result.ok) throw new Error("The message service did not accept the enquiry.");
    } else {
      // Local preview keeps enquiries on this machine. Vercel requires a durable destination.
      const directory = join(process.cwd(), ".local");
      const file = join(directory, "leads.jsonl");
      await mkdir(directory, { recursive: true });
      const existing = await readFile(file, "utf8").catch(() => "");
      const duplicate = existing.split("\n").some((line) => line && JSON.parse(line).request_id === lead.request_id);
      if (!duplicate) await appendFile(file, JSON.stringify({ ...lead, received_at: new Date().toISOString() }) + "\n", { mode: 0o600 });
    }
    return Response.json({ ok: true });
  } catch {
    return failure("Your message did not save. Your draft is preserved; please retry or email ted@tedtroxell.com.", 503);
  }
}
