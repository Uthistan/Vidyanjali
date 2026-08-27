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

      setStatus({ type: "success", message: "Thanks — we received your enquiry." });
      setForm({ parentName: "", email: "", phone: "", childName: "", dob: "", reason: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed" });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-rule-weak bg-canvas px-3 py-2 text-body placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-purple";

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
      <label className="block mb-3">
        <div className="text-eyebrow text-purple mb-2">Parent Name</div>
        <input
          name="parentName"
          value={form.parentName}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className="block mb-3">
        <div className="text-eyebrow text-purple mb-2">Email</div>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className="block mb-3">
        <div className="text-eyebrow text-purple mb-2">Phone Number</div>
        <input
          name="phone"
          value={form.phone}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className="block mb-3">
        <div className="text-eyebrow text-purple mb-2">Child Name</div>
        <input
          name="childName"
          value={form.childName}
          onChange={update}
          className={inputClass}
          placeholder=""
        />
      </label>

      <label className="block mb-3">
        <div className="text-eyebrow text-purple mb-2">Date Of Birth (Child)</div>
        <input
          name="dob"
          type="date"
          value={form.dob}
          onChange={update}
          className={`${inputClass} py-3`}
        />
      </label>

      <label className="block mb-3">
        <div className="text-eyebrow text-purple mb-2">Reason for Enquiry</div>
        <textarea
          name="reason"
          value={form.reason}
          onChange={update}
          className={`${inputClass} h-28 resize-none`}
        />
      </label>

      {status && (
        <div
          className={`mb-4 text-sm ${
            status.type === "success" ? "text-teal" : "text-red-600"
          }`}
        >
          {status.message}
        </div>
      )}

      <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={loading}>
        {loading ? "Sending…" : "Submit"}
      </Button>

      <div className="mt-6 text-center text-body text-ink-body">
        <p className="mb-2">Phone number: +91 9150047110</p>
        <p>Email: fourcups@thelovehopecompany.com</p>
      </div>
    </form>
  );
}
