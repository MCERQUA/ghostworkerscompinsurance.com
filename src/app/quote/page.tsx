"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, CheckCircle, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","West Virginia","Wisconsin",
];

const TRADES = [
  "General Contractor","Electrical","Plumbing","HVAC","Roofing","Carpentry/Framing",
  "Painting","Drywall","Flooring","Landscaping","Masonry/Concrete","Excavation",
  "Insulation","Tile/Stone","Cleaning Services","Other Construction",
];

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", state: "", trade: "", yearsInBusiness: "",
    coverageStart: "", limitsNeeded: "100/500",
    currentlyHaveWC: "no", additionalInsured: "no",
    "bot-field": "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form["bot-field"]) return;
    // Deliver lead directly to the leads webhook (SSR Netlify form capture is unreliable).
    try {
      const WEBHOOK_URL = `https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=ghostworkerscompinsurance.com`;
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_name: "quote", source: "ghostworkerscompinsurance.com", ...form }),
      });
    } catch {
      // lead webhook failed — do not block submission UX
    }
    const data = new FormData();
    data.append("form-name", "quote");
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      await fetch("/", { method: "POST", body: data });
    } catch {}
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
            className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg mx-auto"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
              style={{ background: "#dcfce7" }}
            >
              <CheckCircle size={40} style={{ color: "#16a34a" }} />
            </div>
            <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#111827" }}>
              Quote Request Received!
            </h1>
            <p className="text-lg mb-6" style={{ color: "#6b7280" }}>
              A licensed advisor will contact you within 1 business hour with your ghost WC quote.
              If you need immediate assistance, call us now.
            </p>
            <a href="tel:8449675247" className="btn-primary mb-4 w-full justify-center">
              <Phone size={18} /> Call 844-967-5247
            </a>
            <Link href="/" className="btn-secondary w-full justify-center">Back to Home</Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#f0fdf4" }}>

        {/* Header */}
        <section className="py-12 text-center" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "white", color: "#15803d" }}>
              <Zap size={14} />
              Free Instant Quote — No Obligation
            </div>
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "#111827" }}>
              Get Your Ghost WC Quote
            </h1>
            <p className="text-lg" style={{ color: "#374151" }}>
              Takes 90 seconds. No phone call required.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: step >= s ? "#16a34a" : "#d1fae5",
                    color: step >= s ? "white" : "#6b7280",
                  }}
                >
                  {s}
                </div>
                {s < 3 && <div className="w-12 h-1 rounded" style={{ background: step > s ? "#16a34a" : "#d1fae5" }} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-2 text-xs" style={{ color: "#6b7280" }}>
            <span>Your Info</span>
            <span>Business</span>
            <span>Coverage</span>
          </div>
        </section>

        {/* Form */}
        <div className="container-wide max-w-2xl pb-20">
          <form
            data-netlify="true"
            name="quote"
            method="POST"
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 mt-8 border"
            style={{ borderColor: "#d1fae5" }}
          >
            <input type="hidden" name="form-name" value="quote" />
            <input
              type="hidden"
              name="bot-field"
              value={form["bot-field"]}
              onChange={(e) => set("bot-field", e.target.value)}
              style={{ display: "none" }}
            />

            {/* Step 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Your Contact Info</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                    placeholder="(555) 000-0000"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!form.firstName || !form.lastName || !form.email || !form.phone}
                  className="btn-primary w-full justify-center"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Your Business</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                    placeholder="Smith Electrical LLC"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>State *</label>
                    <select
                      name="state"
                      required
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                    >
                      <option value="">Select state</option>
                      {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Trade / Industry *</label>
                    <select
                      name="trade"
                      required
                      value={form.trade}
                      onChange={(e) => set("trade", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                    >
                      <option value="">Select trade</option>
                      {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Years in Business</label>
                  <select
                    name="yearsInBusiness"
                    value={form.yearsInBusiness}
                    onChange={(e) => set("yearsInBusiness", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                  >
                    <option value="">Select range</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do you currently have workers comp coverage?</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => set("currentlyHaveWC", v)}
                        className="flex-1 py-3 rounded-xl border font-medium text-sm capitalize transition-all"
                        style={{
                          background: form.currentlyHaveWC === v ? "#dcfce7" : "white",
                          borderColor: form.currentlyHaveWC === v ? "#16a34a" : "#d1fae5",
                          color: form.currentlyHaveWC === v ? "#15803d" : "#6b7280",
                        }}
                      >
                        {v === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">Back</button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!form.businessName || !form.state || !form.trade}
                    className="btn-primary flex-1 justify-center"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Coverage Details</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Desired Coverage Start Date</label>
                  <input
                    type="date"
                    name="coverageStart"
                    value={form.coverageStart}
                    onChange={(e) => set("coverageStart", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-3" style={{ color: "#374151" }}>Coverage Limits Needed</label>
                  <div className="flex flex-col gap-3">
                    {[
                      { value: "100/500", label: "$100K / $500K (Standard — most states)", badge: "Most Common" },
                      { value: "500/500", label: "$500K / $500K (Enhanced)", badge: null },
                      { value: "1M/1M", label: "$1M / $1M (Maximum)", badge: null },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("limitsNeeded", opt.value)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                        style={{
                          background: form.limitsNeeded === opt.value ? "#dcfce7" : "white",
                          borderColor: form.limitsNeeded === opt.value ? "#16a34a" : "#d1fae5",
                          color: form.limitsNeeded === opt.value ? "#15803d" : "#374151",
                        }}
                      >
                        <span>{opt.label}</span>
                        {opt.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#16a34a", color: "white" }}>
                            {opt.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do you need to list an Additional Insured?</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => set("additionalInsured", v)}
                        className="flex-1 py-3 rounded-xl border font-medium text-sm capitalize transition-all"
                        style={{
                          background: form.additionalInsured === v ? "#dcfce7" : "white",
                          borderColor: form.additionalInsured === v ? "#16a34a" : "#d1fae5",
                          color: form.additionalInsured === v ? "#15803d" : "#6b7280",
                        }}
                      >
                        {v === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trust reminder */}
                <div className="flex flex-col gap-2 mb-6 p-4 rounded-xl" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  {[
                    { icon: <Shield size={14} />, text: "A-rated carrier partners" },
                    { icon: <Clock size={14} />, text: "Same-day certificate delivery" },
                    { icon: <CheckCircle size={14} />, text: "No commitment — free quote" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "#15803d" }}>
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 justify-center">Back</button>
                  <button type="submit" className="btn-primary flex-1 justify-center">
                    <Zap size={18} /> Get My Quote
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Side trust */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: <Shield size={20} />, text: "Secure & Private" },
              { icon: <Zap size={20} />, text: "Instant Quote" },
              { icon: <Clock size={20} />, text: "Same-Day Coverage" },
            ].map((item) => (
              <div key={item.text} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#d1fae5" }}>
                <div className="flex justify-center mb-2" style={{ color: "#16a34a" }}>{item.icon}</div>
                <div className="text-sm font-medium" style={{ color: "#374151" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
