"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, CheckCircle, Phone, ArrowRight, Mail } from "lucide-react";
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
    streetAddress: "", city: "", zip: "", priorYearGrossSales: "", priorYearSubcontractorExpenses: "", priorYearEmployeeCount: "", priorYearEmployeePayroll: "", estimatedGrossSales: "", estimatedSubcontractorExpenses: "", estimatedEmployeeCount: "", estimatedEmployeePayroll: "", estimatedMaterialCosts: "", subcontractorsHaveInsurance: "", percentSubcontractorsInsured: "", coverageForUninsuredSubcontractors: "", coverageTypes: "", annualGrossSales: "", yearBusinessStarted: "", businessDescription: "", classCode1: "", classCode2: "", classCode3: "", classCode4: "", classCode5: "", residentialVsCommercial: "", newVsExistingConstruction: "", largestProjects: "", priorCarrierName: "", priorPolicyNumber: "", priorPolicyExpiration: "", ownerNames: "", ownerDateOfBirth: "", ownerOwnershipPct: "", numberOfEmployees: "", amountOfPayroll: "", hasClericalStaff: "", clericalStaffCount: "", hasSalesStaff: "", salesStaffCount: "", officeVsFieldSplit: "",
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
    const params = new URLSearchParams();
    params.append("form-name", "quote");
    Object.entries(form).forEach(([k, v]) => params.append(k, v));
    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
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
            <a href="/contact" className="btn-primary mb-4 w-full justify-center">
              <Mail size={18} /> Contact Us
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
        <section className="py-20 md:py-28 text-center" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
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
                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Business details</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>What the business does and how long it has been running.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Year business started</label>
                    <input type="text" name="yearBusinessStarted" value={form.yearBusinessStarted} onChange={(e) => set("yearBusinessStarted", e.target.value)} placeholder="2015" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Description of the business</label>
                    <textarea name="businessDescription" rows={3} value={form.businessDescription} onChange={(e) => set("businessDescription", e.target.value)} placeholder="What the business does, day to day" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Annual gross sales</label>
                    <input type="text" name="annualGrossSales" value={form.annualGrossSales} onChange={(e) => set("annualGrossSales", e.target.value)} placeholder="$1,200,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Residential vs commercial split</label>
                    <input type="text" name="residentialVsCommercial" value={form.residentialVsCommercial} onChange={(e) => set("residentialVsCommercial", e.target.value)} placeholder="70% residential / 30% commercial" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>New vs existing construction</label>
                    <input type="text" name="newVsExistingConstruction" value={form.newVsExistingConstruction} onChange={(e) => set("newVsExistingConstruction", e.target.value)} placeholder="Mostly existing structures" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Largest projects</label>
                    <textarea name="largestProjects" rows={3} value={form.largestProjects} onChange={(e) => set("largestProjects", e.target.value)} placeholder="Three largest jobs in the last year — value and scope" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Business address</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Where your operation is based.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Street address</label>
                    <input type="text" name="streetAddress" value={form.streetAddress} onChange={(e) => set("streetAddress", e.target.value)} placeholder="123 Main St, Suite 200" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>City</label>
                    <input type="text" name="city" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Phoenix" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>ZIP code</label>
                    <input type="text" name="zip" value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="85001" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Payroll and class codes</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Employees, payroll and how the work is classified.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Number of employees</label>
                    <input type="text" name="numberOfEmployees" value={form.numberOfEmployees} onChange={(e) => set("numberOfEmployees", e.target.value)} placeholder="8" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Amount of payroll</label>
                    <input type="text" name="amountOfPayroll" value={form.amountOfPayroll} onChange={(e) => set("amountOfPayroll", e.target.value)} placeholder="$420,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 1</label>
                    <input type="text" name="classCode1" value={form.classCode1} onChange={(e) => set("classCode1", e.target.value)} placeholder="5403" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 2</label>
                    <input type="text" name="classCode2" value={form.classCode2} onChange={(e) => set("classCode2", e.target.value)} placeholder="5645" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 3</label>
                    <input type="text" name="classCode3" value={form.classCode3} onChange={(e) => set("classCode3", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 4</label>
                    <input type="text" name="classCode4" value={form.classCode4} onChange={(e) => set("classCode4", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 5</label>
                    <input type="text" name="classCode5" value={form.classCode5} onChange={(e) => set("classCode5", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Office vs field split</label>
                    <input type="text" name="officeVsFieldSplit" value={form.officeVsFieldSplit} onChange={(e) => set("officeVsFieldSplit", e.target.value)} placeholder="2 office / 6 field" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Any clerical staff?</label>
                    <select name="hasClericalStaff" value={form.hasClericalStaff} onChange={(e) => set("hasClericalStaff", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Clerical staff — count and payroll</label>
                    <input type="text" name="clericalStaffCount" value={form.clericalStaffCount} onChange={(e) => set("clericalStaffCount", e.target.value)} placeholder="2 clerical, $90,000 payroll" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Any outside sales staff?</label>
                    <select name="hasSalesStaff" value={form.hasSalesStaff} onChange={(e) => set("hasSalesStaff", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Sales staff — count and payroll</label>
                    <input type="text" name="salesStaffCount" value={form.salesStaffCount} onChange={(e) => set("salesStaffCount", e.target.value)} placeholder="1 outside sales, $60,000 payroll" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
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

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Prior year</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Your last completed 12 months. Best estimates are fine.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year gross sales</label>
                    <input type="text" name="priorYearGrossSales" value={form.priorYearGrossSales} onChange={(e) => set("priorYearGrossSales", e.target.value)} placeholder="$1,200,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year subcontractor expenses</label>
                    <input type="text" name="priorYearSubcontractorExpenses" value={form.priorYearSubcontractorExpenses} onChange={(e) => set("priorYearSubcontractorExpenses", e.target.value)} placeholder="$250,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year employee count</label>
                    <input type="text" name="priorYearEmployeeCount" value={form.priorYearEmployeeCount} onChange={(e) => set("priorYearEmployeeCount", e.target.value)} placeholder="8" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year employee payroll</label>
                    <input type="text" name="priorYearEmployeePayroll" value={form.priorYearEmployeePayroll} onChange={(e) => set("priorYearEmployeePayroll", e.target.value)} placeholder="$400,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Next twelve months — estimates</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Projected figures for the coming policy period.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated gross sales</label>
                    <input type="text" name="estimatedGrossSales" value={form.estimatedGrossSales} onChange={(e) => set("estimatedGrossSales", e.target.value)} placeholder="$1,400,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated subcontractor expenses</label>
                    <input type="text" name="estimatedSubcontractorExpenses" value={form.estimatedSubcontractorExpenses} onChange={(e) => set("estimatedSubcontractorExpenses", e.target.value)} placeholder="$300,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated employee count</label>
                    <input type="text" name="estimatedEmployeeCount" value={form.estimatedEmployeeCount} onChange={(e) => set("estimatedEmployeeCount", e.target.value)} placeholder="10" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated employee payroll</label>
                    <input type="text" name="estimatedEmployeePayroll" value={form.estimatedEmployeePayroll} onChange={(e) => set("estimatedEmployeePayroll", e.target.value)} placeholder="$500,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated material costs</label>
                    <input type="text" name="estimatedMaterialCosts" value={form.estimatedMaterialCosts} onChange={(e) => set("estimatedMaterialCosts", e.target.value)} placeholder="$180,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Coverage needed</label>
                    <textarea name="coverageTypes" rows={3} value={form.coverageTypes} onChange={(e) => set("coverageTypes", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Subcontractor insurance</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>How subcontracted work is covered.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do your subcontractors carry their own insurance?</label>
                    <select name="subcontractorsHaveInsurance" value={form.subcontractorsHaveInsurance} onChange={(e) => set("subcontractorsHaveInsurance", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Percentage of subcontractors insured</label>
                    <input type="text" name="percentSubcontractorsInsured" value={form.percentSubcontractorsInsured} onChange={(e) => set("percentSubcontractorsInsured", e.target.value)} placeholder="100" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do you need coverage for uninsured subcontractors?</label>
                    <select name="coverageForUninsuredSubcontractors" value={form.coverageForUninsuredSubcontractors} onChange={(e) => set("coverageForUninsuredSubcontractors", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Current or prior coverage</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Who covers you today, if anyone.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Current or prior carrier</label>
                    <input type="text" name="priorCarrierName" value={form.priorCarrierName} onChange={(e) => set("priorCarrierName", e.target.value)} placeholder="Carrier name" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Policy number</label>
                    <input type="text" name="priorPolicyNumber" value={form.priorPolicyNumber} onChange={(e) => set("priorPolicyNumber", e.target.value)} placeholder="Policy number" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Policy expiration date</label>
                    <input type="date" name="priorPolicyExpiration" value={form.priorPolicyExpiration} onChange={(e) => set("priorPolicyExpiration", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Owners and officers</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Each owner or officer to be included or excluded.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Owners and officers</label>
                    <textarea name="ownerNames" rows={3} value={form.ownerNames} onChange={(e) => set("ownerNames", e.target.value)} placeholder="One owner or officer per line, with role" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Owner date of birth</label>
                    <input type="date" name="ownerDateOfBirth" value={form.ownerDateOfBirth} onChange={(e) => set("ownerDateOfBirth", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Ownership percentage</label>
                    <input type="text" name="ownerOwnershipPct" value={form.ownerOwnershipPct} onChange={(e) => set("ownerOwnershipPct", e.target.value)} placeholder="100" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
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
