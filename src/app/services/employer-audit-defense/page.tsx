"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown, Zap,
  FileText, AlertTriangle, ClipboardList, BookOpen, TrendingUp, Search, Archive,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const auditTriggers = [
  {
    icon: <ClipboardList size={22} />,
    title: "End of Policy Period",
    desc: "The most common trigger. Virtually every workers' comp policy requires an audit when it expires. The carrier needs to reconcile the payroll you estimated at policy inception against what you actually paid.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Significant Payroll Change",
    desc: "If your mid-term payroll reporting shows a substantial increase or decrease from the original estimate, the carrier may audit mid-policy to adjust your premium.",
  },
  {
    icon: <Search size={22} />,
    title: "Carrier Routine Audit",
    desc: "Some carriers conduct random audits on accounts that haven't been reviewed in several years, regardless of policy activity.",
  },
  {
    icon: <AlertTriangle size={22} />,
    title: "Claim Filed During Policy",
    desc: "If an injury claim is filed, the carrier will carefully audit payroll records surrounding the claim to ensure accurate premium calculation and proper classification.",
  },
];

const sixSteps = [
  {
    step: "01",
    title: "Locate Your Exclusion Endorsement",
    desc: "Find the owner exclusion endorsement in your policy documents. This is the legal evidence that the owner was excluded from coverage and that zero payroll was intentional — not an oversight.",
  },
  {
    step: "02",
    title: "Confirm Zero Payroll Records",
    desc: "Verify you have documentation showing no W-2 wages were paid during the policy period. Payroll registers, QuickBooks reports, or a signed statement from your CPA all work.",
  },
  {
    step: "03",
    title: "Gather Subcontractor Certificates",
    desc: "If you hired any 1099 subs during the policy period, collect their certificates of insurance. Subs without their own WC coverage may be included in your payroll during an audit.",
  },
  {
    step: "04",
    title: "Compile 1099 and Contract Records",
    desc: "Gather all 1099 forms issued, independent contractor agreements, and any evidence that subcontractors were genuinely independent (set their own hours, used their own tools, etc.).",
  },
  {
    step: "05",
    title: "Review NCCI Class Code Accuracy",
    desc: "Confirm that your classification code matches your actual work. Misclassified work can trigger reclassification and retroactive premium charges. If unsure, review with us before the audit.",
  },
  {
    step: "06",
    title: "Respond Promptly and in Writing",
    desc: "When the audit notice arrives, respond within the requested deadline. Submit all documentation in writing (email with read receipt), and keep copies of everything you send.",
  },
];

const docsToKeep = [
  { label: "Owner Exclusion Endorsement", desc: "Your policy endorsement confirming the owner opted out. Keep this for the life of the policy plus 5 years." },
  { label: "Federal Tax Returns", desc: "Schedule C or corporate returns showing business income and zero W-2 payroll for the policy year." },
  { label: "1099-NEC Forms Issued", desc: "All 1099 forms sent to subcontractors. These prove the sub relationship and the amounts paid." },
  { label: "Subcontractor COIs", desc: "Certificates of insurance from every sub showing their own workers' comp coverage." },
  { label: "Independent Contractor Agreements", desc: "Written contracts establishing the independent nature of each sub relationship." },
  { label: "Bank Statements", desc: "Business banking records showing payments — no payroll deposits, just contractor payments and business expenses." },
];

const classCodes = [
  { code: "8810", trade: "Clerical Office", rate: "Low" },
  { code: "5183", trade: "Plumbing", rate: "Medium" },
  { code: "5403", trade: "Carpentry", rate: "Medium-High" },
  { code: "5551", trade: "Roofing", rate: "High" },
  { code: "5190", trade: "Electrical Wiring", rate: "Medium-High" },
  { code: "0042", trade: "Landscaping", rate: "Medium" },
];

const faqs = [
  {
    q: "Do ghost policy holders always get audited?",
    a: "Most workers' comp policies — including ghost policies — are subject to an end-of-policy-period audit. However, because ghost policy holders have zero payroll (the owner is excluded and there are no employees), the audit process is extremely straightforward. You simply confirm zero payroll and submit your exclusion endorsement. No additional premium is due.",
  },
  {
    q: "What happens at a ghost policy audit?",
    a: "The carrier or an independent audit firm contacts you to verify the payroll used to calculate your premium. For a ghost policy, this means confirming that payroll was indeed $0 during the policy period. You provide your exclusion endorsement and a statement confirming no employees were paid. The audit closes with no adjustment.",
  },
  {
    q: "Can I be charged more premium after an audit?",
    a: "On a properly structured ghost policy, no additional premium is owed after audit because the policy was written at minimum premium for zero payroll. The only scenario where additional premium might be assessed is if it's discovered that you actually had W-2 employees during the policy period — which would mean the ghost policy was not appropriate for your situation.",
  },
  {
    q: "What if I used subcontractors during the policy period?",
    a: "Subcontractors who provide their own certificate of insurance showing workers' comp coverage can be excluded from your payroll audit. Without their own WC cert, some carriers will include 1099 payments in your audited payroll — which could create additional premium. Always collect COIs from every sub before they start work.",
  },
  {
    q: "Why does my NCCI class code matter for a ghost policy?",
    a: "Your class code determines your base rate, which sets the minimum premium for your ghost policy. High-hazard codes (roofing, demolition) carry higher minimum premiums than lower-risk codes (clerical, landscaping). Using an incorrect class code that overstates your hazard level means you're paying more than necessary. Using one that understates it can result in reclassification penalties.",
  },
];

export default function EmployerAuditDefensePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="pt-16">

        {/* ── HERO ── */}
        <section className="hero-gradient relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(22,163,74,0.2) 0%, transparent 70%)" }}
            />
          </div>
          <div className="container-wide relative">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" }}
              >
                <Shield size={14} />
                Audit Defense for Ghost Policy Holders
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                style={{ lineHeight: 1.1, color: "#111827" }}
              >
                Workers' Comp{" "}
                <span className="green-gradient-text">Audit Defense</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl mb-8"
                style={{ color: "#374151" }}
              >
                Ghost policy holders face the simplest workers' comp audits in the industry.
                Zero payroll means zero additional premium — but only if your documentation
                is in order. Here's exactly what you need to know.
              </motion.p>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/quote" className="btn-primary text-base">
                  <Zap size={18} />
                  Get Protected Today
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  844-967-5247
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHAT IS AN AUDIT ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <BookOpen size={14} />
                  Understanding WC Audits
                </div>
                <h2 className="section-title mb-6">
                  What Is a Workers' Comp <span className="green-gradient-text">Premium Audit?</span>
                </h2>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  When you buy a workers' compensation policy, your premium is calculated based
                  on <em>estimated</em> annual payroll. At the end of the policy period, the
                  insurance carrier performs a <strong>premium audit</strong> — a formal
                  reconciliation of your actual payroll against the estimate used to set your original premium.
                </p>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  If your actual payroll was <em>higher</em> than estimated, you owe additional
                  premium. If it was <em>lower</em>, you may receive a refund. For ghost policy
                  holders, this process is uniquely simple: your payroll is $0 because the owner
                  is excluded and there are no employees — so the audit always comes back clean.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: "Audit Frequency", value: "Annual (end of policy period)" },
                    { label: "Ghost Policy Result", value: "Zero additional premium" },
                    { label: "Audit Duration", value: "Typically 2–4 weeks to close" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl p-5 text-center border" style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}>
                      <div className="font-bold text-lg mb-1" style={{ color: "#16a34a" }}>{stat.value}</div>
                      <div className="text-sm" style={{ color: "#6b7280" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── AUDIT TRIGGERS ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">What Triggers a Workers' Comp Audit?</h2>
              <p className="section-subtitle">
                Four common events that initiate an audit — and why ghost policy holders have
                minimal exposure in each case.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {auditTriggers.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-2xl p-6 border card-hover"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "#111827" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{item.desc}</p>
                  <div className="mt-4 rounded-lg p-3 text-xs" style={{ background: "#f0fdf4", color: "#15803d" }}>
                    <strong>Ghost policy advantage:</strong>{" "}
                    {i === 0 && "Zero payroll = zero additional premium. Audit closes immediately."}
                    {i === 1 && "Owner exclusion means payroll never changes mid-term. No mid-year audits."}
                    {i === 2 && "Clean record + zero payroll = routine audit closes in days, not weeks."}
                    {i === 3 && "No employees = no injury exposure under the policy. Claims can't arise."}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6 STEPS ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <ClipboardList size={14} />
                Audit Preparation Checklist
              </div>
              <h2 className="section-title mb-4">
                6 Steps to Prepare for Your <span className="green-gradient-text">Ghost Policy Audit</span>
              </h2>
              <p className="section-subtitle">
                Follow these steps before your audit notice arrives and you'll sail through it.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {sixSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex gap-4 rounded-2xl p-6 border"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-extrabold" style={{ background: "#16a34a", color: "white" }}>
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2" style={{ color: "#111827" }}>{step.title}</h3>
                    <p className="text-sm" style={{ color: "#6b7280" }}>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCUMENTATION ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Archive size={14} />
                Document Retention
              </div>
              <h2 className="section-title mb-4">What Documentation to Keep</h2>
              <p className="section-subtitle">
                Maintain these records for at least 5 years after each policy period ends.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {docsToKeep.map((doc, i) => (
                <motion.div
                  key={doc.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-2xl p-6 border"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    <FileText size={18} />
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#111827" }}>{doc.label}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{doc.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLASS CODES ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <BookOpen size={14} />
                  NCCI Classification
                </div>
                <h2 className="section-title mb-6">
                  Why Classification Codes <span className="green-gradient-text">Matter</span>
                </h2>
                <p className="mb-6" style={{ color: "#374151" }}>
                  Every workers' comp policy is written to a specific NCCI (National Council on
                  Compensation Insurance) classification code that describes the type of work
                  performed. This code drives your base rate — and for a ghost policy, it
                  directly determines your minimum premium.
                </p>
                <p className="mb-8" style={{ color: "#374151" }}>
                  Using the wrong class code — whether too high (overpaying) or too low (audit
                  reclassification risk) — creates unnecessary problems. We help match you to the
                  correct code at application.
                </p>
                <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#d1fae5" }}>
                  <div className="grid grid-cols-3 text-sm font-semibold py-3 px-5" style={{ background: "#f0fdf4", borderBottom: "1px solid #d1fae5" }}>
                    <div style={{ color: "#6b7280" }}>NCCI Code</div>
                    <div style={{ color: "#6b7280" }}>Trade</div>
                    <div style={{ color: "#6b7280" }}>Hazard Level</div>
                  </div>
                  {classCodes.map((row, i) => (
                    <div
                      key={row.code}
                      className="grid grid-cols-3 text-sm py-3 px-5"
                      style={{ borderBottom: i < classCodes.length - 1 ? "1px solid #d1fae5" : "none", background: i % 2 === 0 ? "white" : "#fafffe" }}
                    >
                      <div className="font-mono font-semibold" style={{ color: "#16a34a" }}>{row.code}</div>
                      <div style={{ color: "#374151" }}>{row.trade}</div>
                      <div style={{ color: "#6b7280" }}>{row.rate}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-4" style={{ color: "#9ca3af" }}>
                  These are sample codes. Over 700 NCCI codes exist. Our system identifies the correct code for your trade automatically.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HOW WE HELP ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-6">
                  How We Help at <span className="green-gradient-text">Audit Time</span>
                </h2>
                <p className="text-lg mb-10" style={{ color: "#374151" }}>
                  We don't disappear after you buy your policy. When your audit notice arrives,
                  we're here to guide you through it.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                {[
                  { icon: <CheckCircle size={18} />, text: "Explain what the audit letter is asking for" },
                  { icon: <FileText size={18} />, text: "Help you compile the correct documentation package" },
                  { icon: <Shield size={18} />, text: "Review your exclusion endorsement is properly on file" },
                  { icon: <AlertTriangle size={18} />, text: "Flag any subcontractor issues before they become problems" },
                  { icon: <BookOpen size={18} />, text: "Verify your class code was correctly applied" },
                  { icon: <Phone size={18} />, text: "Speak directly with the carrier auditor if needed" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className="bg-white rounded-xl p-4 border flex items-start gap-3"
                    style={{ borderColor: "#d1fae5" }}
                  >
                    <div className="mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }}>{item.icon}</div>
                    <span style={{ color: "#374151" }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-white">
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">Audit FAQ</h2>
              <p className="section-subtitle">Common questions about workers' comp audits for ghost policy holders.</p>
            </motion.div>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-xl border overflow-hidden"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-semibold"
                    style={{ color: "#111827", background: openFaq === i ? "#f0fdf4" : "white" }}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className="flex-shrink-0 transition-transform"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "none", color: "#16a34a" }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-sm" style={{ color: "#374151" }}>
                      {faq.a}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" }}>
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#111827" }}>
                Start Your Ghost Policy <span className="green-gradient-text">Audit-Ready</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                We set up your policy correctly from day one so that when the audit notice arrives,
                you're already prepared. Get your quote now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote" className="btn-primary text-base">
                  <Zap size={18} />
                  Get Instant Quote
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  Call 844-967-5247
                </a>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
