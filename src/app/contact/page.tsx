"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, Zap, Shield } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "", "bot-field": "" });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form["bot-field"]) return;
    const data = new FormData();
    data.append("form-name", "contact");
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try { await fetch("/", { method: "POST", body: data }); } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center" style={{ background: "#f0fdf4" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md mx-auto"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#dcfce7" }}>
              <CheckCircle size={32} style={{ color: "#16a34a" }} />
            </div>
            <h1 className="text-2xl font-extrabold mb-3" style={{ color: "#111827" }}>Message Received!</h1>
            <p className="mb-6" style={{ color: "#6b7280" }}>We&apos;ll get back to you within 1 business hour.</p>
            <Link href="/" className="btn-primary w-full justify-center">Back to Home</Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="hero-gradient py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="section-title mb-4">Contact Us</h1>
            <p className="section-subtitle mx-auto" style={{ color: "#374151" }}>
              Questions about ghost WC policies? We&apos;re happy to help.
            </p>
          </motion.div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Get in Touch</h2>
                <div className="flex flex-col gap-6 mb-8">
                  {[
                    { icon: <Phone size={20} />, label: "Phone", value: "844-967-5247", href: "tel:8449675247" },
                    { icon: <Mail size={20} />, label: "Email", value: "quotes@ghostworkerscompinsurance.com", href: "mailto:quotes@ghostworkerscompinsurance.com" },
                    { icon: <MapPin size={20} />, label: "Coverage Area", value: "All 47 eligible states", href: null },
                    { icon: <Clock size={20} />, label: "Hours", value: "Mon–Fri 8am–6pm CT", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#dcfce7", color: "#16a34a" }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: "#6b7280" }}>{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="font-medium hover:underline" style={{ color: "#16a34a" }}>{item.value}</a>
                        ) : (
                          <span className="font-medium" style={{ color: "#111827" }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6 border" style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} style={{ color: "#16a34a" }} />
                    <span className="font-bold" style={{ color: "#111827" }}>Need Coverage Fast?</span>
                  </div>
                  <p className="text-sm mb-4" style={{ color: "#374151" }}>
                    Skip the contact form and get a quote right now. Most applicants are covered within 2 hours.
                  </p>
                  <Link href="/quote" className="btn-primary w-full justify-center text-sm">
                    Get Instant Quote
                  </Link>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <form
                  data-netlify="true"
                  name="contact"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl shadow-sm border p-8"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <input
                    name="bot-field"
                    style={{ display: "none" }}
                    value={form["bot-field"]}
                    onChange={(e) => set("bot-field", e.target.value)}
                  />
                  <h2 className="text-xl font-bold mb-6" style={{ color: "#111827" }}>Send Us a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Full Name *</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={(e) => set("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                        style={{ borderColor: "#d1fae5", color: "#111827" }}
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Email *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={(e) => set("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                        style={{ borderColor: "#d1fae5", color: "#111827" }}
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Phone</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={(e) => set("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                        style={{ borderColor: "#d1fae5", color: "#111827" }}
                        placeholder="(555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Subject</label>
                      <select
                        name="subject" value={form.subject} onChange={(e) => set("subject", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                        style={{ borderColor: "#d1fae5", color: "#111827" }}
                      >
                        <option value="">Select topic</option>
                        <option>Ghost WC Policy Question</option>
                        <option>Quote Request</option>
                        <option>Certificate Issue</option>
                        <option>Billing Question</option>
                        <option>State Availability</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Message *</label>
                    <textarea
                      name="message" required rows={5} value={form.message} onChange={(e) => set("message", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none resize-none"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                      placeholder="Tell us about your coverage needs..."
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-6 text-sm" style={{ color: "#6b7280" }}>
                    <Shield size={16} style={{ color: "#16a34a" }} />
                    Your information is private and secure. We never sell your data.
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
