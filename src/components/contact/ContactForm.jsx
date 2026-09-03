"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function ContactForm() {
  const [form, setForm] = useState({
    parentName: "",
    email: "",
    phone: "",
    childName: "",
    dob: "",
    reason: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function update(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    // minimal client validation
    if (!form.parentName || !form.email) {
      setStatus({ type: "error", message: "Please provide name and email." });
      return;
    }
 
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submission failed");

      setStatus({
        type: "success",
        message: "Thanks — we received your enquiry.",
      });
      setForm({
        parentName: "",
        email: "",
        phone: "",
        childName: "",
        dob: "",
        reason: "",
      });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  }

  /* `border-rule-weak` and `text-ink-muted` were used here but neither exists
     in the theme, so the border and placeholder rendered unstyled. The real
     tokens are `rule` and `ink-soft` — see globals.css.

     focus:outline-none is also gone: the global :focus-visible ring in
     globals.css is the site's single focus treatment, and suppressing it here
     left keyboard users with only a colour change to go on. */
  const inputClass =
    "w-full rounded-xl border border-rule bg-canvas-lift px-4 py-3 text-body-sm text-ink placeholder:text-ink-soft transition-colors duration-300 hover:border-rule-strong";

  /* TWO COLUMNS FROM `sm` UP. The form used to be a single 384px column
     centred in the 1120px page, which left it floating in the middle of a
     mostly empty screen — the most developer-built-looking thing on the site.
     The six short fields pair off naturally, the two long ones span, and the
     whole block then fills a proper editorial measure without a single field
     growing wider than is comfortable to read. */
  const fieldWrap = "block sm:col-span-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full gap-x-8 gap-y-5 sm:grid-cols-2"
    >
      <label className={fieldWrap}>
        <div className="text-eyebrow font-sans uppercase text-purple mb-2">Parent Name</div>
        <input
          name="parentName"
          required
          value={form.parentName}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className={fieldWrap}>
        <div className="text-eyebrow font-sans uppercase text-purple mb-2">Email</div>
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className={fieldWrap}>
        <div className="text-eyebrow font-sans uppercase text-purple mb-2">Phone Number</div>
        <input
          name="phone"
          value={form.phone}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className={fieldWrap}>
        <div className="text-eyebrow font-sans uppercase text-purple mb-2">Child Name</div>
        <input
          name="childName"
          value={form.childName}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className={fieldWrap}>
        <div className="text-eyebrow font-sans uppercase text-purple mb-2">
          Date Of Birth (Child)
        </div>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={update}
          className={`${inputClass} py-3`}
        />
      </label>

      <label className="block sm:col-span-2">
        <div className="text-eyebrow font-sans uppercase text-purple mb-2">Reason for Enquiry</div>
        <textarea
          name="reason"
          value={form.reason}
          onChange={update}
          className={`${inputClass} h-32 resize-none`}
        />
      </label>

      {status && (
        <div
          role="status"
          aria-live="polite"
          className={`text-body-sm sm:col-span-2 ${
            status.type === "success" ? "text-teal" : "text-danger"
          }`}
        >
          {status.message}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-2 w-full sm:col-span-2 sm:w-auto sm:justify-self-start"
        disabled={loading}
      >
        {loading ? "Sending…" : "Submit"}
      </Button>

      {/* A phone number and an email address were hardcoded here — both
          invented. They are removed rather than replaced: the real details
          belong in `contact` in src/content/site.js, which the contact page
          and the footer already read from, and which is currently null
          because the client has not supplied them. */}
    </form>
  );
}
