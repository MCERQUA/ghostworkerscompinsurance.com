"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle, ArrowRight, Phone, ChevronDown,
  FileText, MapPin, DollarSign, HelpCircle, Users, AlertTriangle, Zap,
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

const whoNeedsIt = [
  {
    icon: <Users size={22} />,
    title: "Sole Proprietors",
    desc: "Self-employed individuals who operate without employees but must carry a WC certificate to satisfy licensing or client requirements.",
  },
  {
    icon: <FileText size={22} />,
    title: "Single-Member LLCs",
    desc: "LLC owners with no W-2 employees who need proof of workers' comp to maintain their contractor license.",
  },
  {
    icon: <Shield size={22} />,
    title: "Owner-Operators",
    desc: "Business owners who do all the work themselves and sub out periodically — but must show WC coverage to win bids.",
  },
  {
    icon: <CheckCircle size={22} />,
    title: "Subcontractors",
    desc: "1099 subs required by their GC to carry workers' comp before stepping foot on a job site.",
  },
  {
    icon: <AlertTriangle size={22} />,
    title: "License Applicants",
    desc: "Contractors applying for or renewing a state contractor license where WC proof is a required document.",
  },
  {
    icon: <DollarSign size={22} />,
    title: "Low-Payroll Businesses",
    desc: "Small businesses with minimal or seasonal payroll who want coverage that scales with their workforce.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Policy Is Issued",
    desc: "A standard workers' compensation policy is written by an A-rated carrier in your state. The policy lists your business as the insured employer.",
  },
  {
    step: "02",
    title: "Owner Is Excluded",
    desc: "The business owner files an exclusion endorsement (where required by state law), removing themselves from the covered employee list. This is standard and fully legal.",
  },
  {
    step: "03",
    title: "Certificate Is Generated",
    desc: "An ACORD 25 certificate of insurance is issued showing active workers' comp coverage. This satisfies licensing boards, GCs, and project owners.",
  },
  {
    step: "04",
    title: "Zero-Payroll Audit",
    desc: "At policy expiration, the carrier audits actual payroll. Since the owner is excluded and there are no employees, payroll is $0 — no additional premium due.",
  },
];

const costFactors = [
  { label: "State Filed", desc: "Each state has its own rate tables. FL and GA typically cost less than NY or CA." },
  { label: "Class Code", desc: "NCCI classification codes determine base rates. Low-hazard codes (clerical, landscaping) cost less than roofing or structural steel." },
  { label: "Industry Type", desc: "High-risk trades like roofing, demolition, or electrical carry higher base rates per $100 of payroll." },
  { label: "Policy Fees", desc: "Ghost policies include minimum premiums and carrier fees, typically ranging from $800 to $2,500 annually." },
  { label: "Coverage Limits", desc: "Standard WC limits apply. Higher employer liability limits may be requested by some GCs at slight additional cost." },
];

const monopolisticStates = ["North Dakota (ND)", "Ohio (OH)", "Washington (WA)", "Wyoming (WY)"];

const whyCCA = [
  { icon: <Zap size={20} />, title: "Instant Quoting", desc: "Get a real-time quote in under 90 seconds without calling anyone." },
  { icon: <Shield size={20} />, title: "A-Rated Carriers", desc: "We place policies with financially stable, state-approved carriers." },
  { icon: <FileText size={20} />, title: "Ghost Policy Specialists", desc: "We focus exclusively on ghost WC — this isn't a sideline product for us." },
  { icon: <CheckCircle size={20} />, title: "Same-Day Certificates", desc: "Most certificates are delivered the same day you apply and pay." },
  { icon: <MapPin size={20} />, title: "47-State Coverage", desc: "Licensed to write ghost policies in all non-monopolistic states." },
  { icon: <Phone size={20} />, title: "Dedicated Support", desc: "Real humans available at 844-967-5247 if you ever need help." },
];

const faqs = [
  {
    q: "Is a ghost workers comp policy legal?",
    a: "Yes. Ghost workers' compensation policies are a legitimate, state-recognized insurance product. State contractor licensing boards accept them as valid proof of coverage. The owner exclusion is a standard endorsement available in all non-monopolistic states.",
  },
  {
    q: "Do I need employees for a ghost WC policy?",
    a: "No. That's the entire point of a ghost policy. It's designed for business owners with zero employees (or who exclude themselves). You get a valid certificate of insurance without having any payroll to insure.",
  },
  {
    q: "What's the difference between a ghost policy and a regular workers' comp policy?",
    a: "A regular WC policy covers employees' injuries. A ghost policy is issued for a business where the owner excludes themselves (and has no other employees), meaning no one is actually covered under the policy — but a valid certificate of insurance is still generated, satisfying licensing and contractual requirements.",
  },
  {
    q: "Which states don't allow ghost workers comp policies?",
    a: "Monopolistic states — North Dakota, Ohio, Washington, and Wyoming — require all employers to purchase workers' comp through the state fund and do not permit private ghost policies. All other 47 states allow privately placed ghost WC policies.",
  },
  {
    q: "How much does a ghost workers comp policy cost?",
    a: "Ghost WC premiums typically range from $800 to $2,500 per year. The exact cost depends on your state, your trade's NCCI class code, and the carrier's minimum premium for your risk category. Get an instant quote at the top of this page — it takes under 90 seconds.",
  },
];

export default function GhostWCPolicyPage() {
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
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
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
                Ghost Workers' Comp Policy Guide
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                style={{ lineHeight: 1.1, color: "#111827" }}
              >
                What Is a{" "}
                <span className="green-gradient-text">Ghost Workers' Comp Policy?</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl mb-8"
                style={{ color: "#374151" }}
              >
                A ghost policy gives sole proprietors and owner-only businesses the
                workers' compensation certificate they need — without requiring any employees.
                Legal, fast, and available in 47 states.
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
                  Get an Instant Quote
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  844-967-5247
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── DEFINITION ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <HelpCircle size={14} />
                  The Simple Definition
                </div>
                <h2 className="section-title mb-6">
                  Workers' Comp Coverage <span className="green-gradient-text">Without the Payroll</span>
                </h2>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  A <strong>ghost workers' compensation policy</strong> is a standard workers' comp
                  policy in which the owner files an exclusion endorsement — effectively removing
                  themselves (and all non-existent employees) from the covered persons list. Because
                  there is no one on payroll, the policy generates no actual medical or indemnity
                  exposure for the carrier, making premiums extremely low.
                </p>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  Despite covering no one, the policy is still a fully valid insurance contract
                  issued by a licensed carrier. It generates a real ACORD 25 Certificate of
                  Insurance — the document that contractor licensing boards, general contractors,
                  and property owners require as proof of coverage before allowing you to work.
                </p>
                <div className="rounded-2xl p-6 border" style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}>
                  <h3 className="font-bold text-lg mb-4" style={{ color: "#111827" }}>Key Characteristics</h3>
                  <ul className="flex flex-col gap-3">
                    {[
                      "Issued by an A-rated, state-licensed carrier",
                      "Owner excludes themselves via exclusion endorsement",
                      "Zero payroll reported — zero additional premium at audit",
                      "Generates a valid ACORD 25 Certificate of Insurance",
                      "Satisfies state contractor licensing WC requirements",
                      "Satisfies GC requirements for subcontractors on job sites",
                      "Annual policy term with easy renewal",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                        <span style={{ color: "#374151" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHO NEEDS IT ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">Who Needs a Ghost WC Policy?</h2>
              <p className="section-subtitle">
                Ghost policies exist to solve a specific problem: you need WC proof but have no employees.
                Here's who they serve.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whoNeedsIt.map((item, i) => (
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
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">How a Ghost Policy Works</h2>
              <p className="section-subtitle">
                Four straightforward steps from policy issuance to audit close-out.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative rounded-2xl p-6 border"
                  style={{ background: "white", borderColor: "#d1fae5" }}
                >
                  <div className="text-5xl font-black mb-4" style={{ color: "#dcfce7" }}>{step.step}</div>
                  <h3 className="font-bold text-lg mb-3" style={{ color: "#111827" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/3 z-10">
                      <ArrowRight size={20} style={{ color: "#16a34a" }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COST FACTORS ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <DollarSign size={14} />
                  Premium Cost Factors
                </div>
                <h2 className="section-title mb-6">
                  What Determines <span className="green-gradient-text">Your Premium?</span>
                </h2>
                <p className="mb-8" style={{ color: "#374151" }}>
                  Ghost policy premiums are modest compared to traditional workers' comp because
                  there is no payroll exposure. However, several factors still influence your
                  annual cost:
                </p>
                <div className="flex flex-col gap-4">
                  {costFactors.map((factor, i) => (
                    <motion.div
                      key={factor.label}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      className="bg-white rounded-xl p-5 border flex gap-4"
                      style={{ borderColor: "#d1fae5" }}
                    >
                      <div className="w-2 rounded-full flex-shrink-0" style={{ background: "#16a34a" }} />
                      <div>
                        <div className="font-semibold mb-1" style={{ color: "#111827" }}>{factor.label}</div>
                        <div className="text-sm" style={{ color: "#6b7280" }}>{factor.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="glass-card p-8 mb-6">
                  <h3 className="font-bold text-xl mb-2" style={{ color: "#111827" }}>Typical Ghost Policy Premiums</h3>
                  <p className="text-sm mb-6" style={{ color: "#6b7280" }}>Estimated annual ranges by trade and state tier (2024 averages):</p>
                  <div className="space-y-3">
                    {[
                      { trade: "Clerical / Office Admin", range: "$800 – $1,100" },
                      { trade: "Landscaping / Lawn Care", range: "$900 – $1,300" },
                      { trade: "Painting (Interior)", range: "$1,000 – $1,500" },
                      { trade: "Carpentry / Finish Work", range: "$1,100 – $1,600" },
                      { trade: "Electrical (Low Voltage)", range: "$1,200 – $1,800" },
                      { trade: "Plumbing", range: "$1,300 – $1,900" },
                      { trade: "General Contracting", range: "$1,400 – $2,200" },
                      { trade: "Roofing", range: "$1,800 – $2,500+" },
                    ].map((row) => (
                      <div key={row.trade} className="flex justify-between items-center py-2 border-b" style={{ borderColor: "#d1fae5" }}>
                        <span className="text-sm" style={{ color: "#374151" }}>{row.trade}</span>
                        <span className="font-semibold text-sm" style={{ color: "#16a34a" }}>{row.range}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs mt-4" style={{ color: "#9ca3af" }}>Ranges vary by state. Get your exact quote in 90 seconds.</p>
                </div>

                <Link href="/quote" className="btn-primary w-full" style={{ justifyContent: "center" }}>
                  <Zap size={18} />
                  Get My Exact Quote Now
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATE AVAILABILITY ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <MapPin size={14} />
                  State Availability
                </div>
                <h2 className="section-title mb-6">
                  Available in <span className="green-gradient-text">47 States</span>
                </h2>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  Ghost workers' comp policies are available in all states that allow private
                  workers' compensation carriers — which covers 47 of the 50 U.S. states.
                </p>
                <div className="rounded-2xl p-6 mb-6" style={{ background: "#fef2f2", border: "1px solid #fecaca" }}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
                    <div>
                      <h3 className="font-bold mb-2" style={{ color: "#991b1b" }}>Not Available in Monopolistic States</h3>
                      <p className="text-sm mb-3" style={{ color: "#b91c1c" }}>
                        The following states require all workers' comp to be purchased through
                        a state-run fund. Private ghost policies are not available here:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {monopolisticStates.map((s) => (
                          <span key={s} className="px-3 py-1 rounded-full text-sm font-medium" style={{ background: "#fee2e2", color: "#991b1b" }}>{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm" style={{ color: "#6b7280" }}>
                  If you operate in a monopolistic state, contact your state's workers'
                  comp fund directly (e.g., Ohio BWC, L&I Washington) for owner-exclusion options.
                  For all other states, we can quote and bind your ghost policy today.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHY CCA ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                Why Choose <span className="green-gradient-text">Ghost Workers Comp Insurance</span>
              </h2>
              <p className="section-subtitle">
                We're not a generalist agency that happens to sell ghost policies. This is our specialty.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyCCA.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-2xl p-6 border"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{item.desc}</p>
                </motion.div>
              ))}
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
              <h2 className="section-title mb-4">Ghost Policy FAQs</h2>
              <p className="section-subtitle">Common questions about ghost workers' compensation policies.</p>
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
                Ready to Get Your <span className="green-gradient-text">Ghost Policy?</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                Complete your application in 90 seconds and get a same-day certificate.
                No employees required.
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
