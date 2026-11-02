import test from "node:test";
import assert from "node:assert/strict";
import { formspreeRequest } from "../lib/contact-formspree.ts";

test("Formspree delivery preserves the enquiry fields and uses a JSON request", () => {
  const lead = { name: "Jordan Lee", email: "jordan@example.com", intent: "advisory", message: "Could we discuss the project?", request_id: "contact-12345678" };
  const request = formspreeRequest(lead);

  assert.equal(request.url, "https://formspree.io/f/mkjjpwkj");
  assert.equal(request.init.method, "POST");
  assert.equal(request.init.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(request.init.body), {
    ...lead,
    _subject: "New website enquiry: advisory",
  });
});
