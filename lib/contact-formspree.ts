export type ContactLead = {
  name: string;
  email: string;
  intent: string;
  message: string;
  request_id: string;
};

const defaultEndpoint = "https://formspree.io/f/mkjjpwkj";

export function formspreeRequest(lead: ContactLead, endpoint = process.env.FORMSPREE_ENDPOINT || defaultEndpoint) {
  return {
    url: endpoint,
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...lead, _subject: `New website enquiry: ${lead.intent}` }),
      signal: AbortSignal.timeout(12000),
    },
  };
}
