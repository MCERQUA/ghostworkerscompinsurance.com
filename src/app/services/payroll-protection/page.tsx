"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp, CheckCircle, Phone, ChevronDown, Zap,
  DollarSign, Shield, AlertTriangle, Users, BarChart3, RefreshCw, Calculator,
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

const premiumFormula = [
  { label: "Class Code Rate", example: "$12.00", desc: "Per $100 of payroll, set by NCCI for your trade in your state" },
  { label: "Annual Payroll", example: "$0", desc: "Ghost policy: owner excluded = zero payroll" },
  { label: "Experience Modifier", example: "1.00", desc: "New accounts start at 1.0 (neutral)" },
  { label: "Base Premium", example: "$0", desc: "Rate × Payroll / 100 × Mod = $0 for ghost policy" },
  { label: "Minimum Premium", example: "$850–$2,500", desc: "Carrier-set floor — this is what ghost policy holders pay" },
];

const scenarios = [
  {
    type: "Ghost Policy (Owner-Only)",
    payroll: "$0",
    rate: "Minimum",
    premium: "$800–$1,200/yr",
    audit: "No additional premium",
    highlight: true,
  },
  {
    type: "1 Part-Time Employee",
    payroll: "$20,000",
    rate: "$8.50 / $100",
    premium: "$1,700/yr",
    audit: "Reconcile year-end payroll",
    highlight: false,
  },
  {
    type: "2 Full-Time Employees",
    payroll: "$80,000",
    rate: "$8.50 / $100",
    premium: "$6,800/yr",
    audit: "Potential adjustment ±20%",
    highlight: false,
  },
  {
    type: "5 Employees (Trade)",
    payroll: "$250,000",
    rate: "$12.00 / $100",
    premium: "$30,000/yr",
    audit: "Full payroll audit required",
    highlight: false,
  },
];

const ghostAdvantages = [
  {
    icon: <DollarSign size={22} />,
    title: "Minimum Premium = Maximum Savings",
    desc: "Ghost policy holders pay the carrier's minimum premium — the absolute floor cost of the policy. There is no payroll exposure to push the premium higher.",
  },
  {
    icon: <Shield size={22} />,
    title: "Zero Audit Risk",
    desc: "Since payroll is $0, your end-of-year audit always closes with no additional amount due. Surprise audit bills simply cannot happen.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Predictable Annual Cost",
    desc: "Know exactly what you'll pay at renewal, year after year. No fluctuating premiums tied to how many hours you worked.",
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Easy to Scale Up Later",
    desc: "When you're ready to hire, notify your carrier to add payroll. Your policy converts from ghost to a standard WC policy seamlessly.",
  },
];

const hiringSteps = [
  { step: "01", title: "Notify Your Carrier", desc: "Contact us as soon as you hire your first W-2 employee. This triggers a payroll endorsement." },
  { step: "02", title: "Estimate Annual Payroll", desc: "Provide the carrier with projected annual wages for each new employee by class code." },
  { step: "03", title: "Premium Is Recalculated", desc: "Your premium adjusts from minimum premium to the rate-based calculation for actual payroll." },
  { step: "04", title: "Year-End Audit", desc: "The carrier audits actual wages paid. Adjustments are made — additional premium or refund." },
];

const payAsYouGo = [
  { feature: "Premium Payment", traditional: "Paid upfront or quarterly", paygo: "Paid each payroll cycle" },
  { feature: "Cash Flow", traditional: "Large upfront outlay", paygo: "Spread over the year" },
  { feature: "Audit Risk", traditional: "Potential large year-end bill", paygo: "Minimal — premiums match payroll in real time" },
  { feature: "Best For", traditional: "Stable, established businesses", paygo: "Growing or seasonal businesses" },
  { feature: "Ghost Policy", traditional: "Standard option available", paygo: "Available through select carriers" },
];

const protectionTips = [
  { icon: <CheckCircle size={18} />, text: "Keep all 1099 payments documented with signed contractor agreements" },
  { icon: <CheckCircle size={18} />, text: "Collect a certificate of insurance from every subcontractor before work begins" },
  { icon: <Shield size={18} />, text: "Never pay subcontractors as employees if they're truly independent contractors" },
  { icon: <AlertTriangle size={18} />, text: "Don't underreport payroll — this creates larger audit surprises down the road" },
  { icon: <CheckCircle size={18} />, text: "Review your class code annually — your work type may have changed" },
  { icon: <DollarSign size={18} />, text: "Notify your carrier of significant payroll changes mid-year, not just at audit" },
];

const faqs = [
  {
    q: "How are workers' comp premiums calculated?",
    a: "Workers' comp premiums are calculated using the formula: (Annual Payroll / 100) × Class Code Rate × Experience Modifier. For example, if you have $100,000 in payroll at a rate of $8.00 per $100 with a 1.0 mod, your premium is $8,000. Ghost policy holders short-circuit this formula because payroll is $0 — they pay only the carrier's minimum premium.",
  },
  {
    q: "What is a minimum premium and why do ghost policies use it?",
    a: "A minimum premium is the lowest amount a carrier will accept for a workers' comp policy — regardless of payroll. It covers the administrative cost of writing and servicing the policy. Ghost policy holders pay the minimum premium because their $0 payroll would otherwise result in a $0 calculated premium, which carriers don't accept.",
  },
  {
    q: "What happens if I hire employees during my ghost policy period?",
    a: "You must notify your carrier as soon as you hire W-2 employees. The policy will be endorsed to include the new payroll, and your premium will increase accordingly. If you fail to report employees, the audit may reveal undisclosed payroll, resulting in retroactive premium charges and potential policy cancellation.",
  },
  {
    q: "Is pay-as-you-go workers' comp available for ghost policies?",
    a: "Some carriers offer pay-as-you-go (sometimes called pay-per-payroll) options for ghost policies. Since there's no payroll to run through a payroll integration, the structure is typically a flat monthly payment spread over 12 months. Contact us to ask about monthly payment options for your ghost policy.",
  },
  {
    q: "Can my workers' comp premium decrease below the minimum?",
    a: "No. The minimum premium is the absolute floor. Even if your calculated premium (based on payroll × rate) would be lower than the minimum, you pay the minimum. Ghost policy holders already pay the minimum because their payroll is $0 — there is no path to a lower premium within the same policy structure.",
  },
];

export default function PayrollProtectionPage() {
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
              animate={{ scale: [1, 1.18, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 8, repeat: Infinity, delay: 1 }}
              className="absolute top-10 right-10 w-72 h-72 rounded-full"
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
                <TrendingUp size={14} />
                Workers' Comp Premium Control
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                style={{ lineHeight: 1.1, color: "#111827" }}
              >
                Payroll Protection &{" "}
                <span className="green-gradient-text">Premium Control</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl mb-8"
                style={{ color: "#374151" }}
              >
                Understand how workers' comp premiums are calculated, why ghost policies
                minimize your exposure, and how to manage your WC costs as your business grows.
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
                  Get My Minimum Premium Quote
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  844-967-5247
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FORMULA ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <Calculator size={14} />
                  Premium Formula
                </div>
                <h2 className="section-title mb-6">
                  How WC Premiums Are <span className="green-gradient-text">Calculated</span>
                </h2>
                <p className="mb-6" style={{ color: "#374151" }}>
                  Workers' compensation premiums are not flat fees. They're calculated using a
                  specific formula that accounts for your trade's risk level, how much you pay
                  workers, and your claims history:
                </p>
                <div className="glass-card p-6 mb-8">
                  <div className="font-mono text-center text-lg font-bold mb-4 py-3 rounded-xl" style={{ background: "#f0fdf4", color: "#16a34a" }}>
                    (Payroll / 100) × Rate × Mod = Premium
                  </div>
                  <p className="text-sm text-center" style={{ color: "#6b7280" }}>
                    For ghost policy holders: ($0 / 100) × Rate × 1.0 = $0 → pays Minimum Premium only
                  </p>
                </div>
                <p className="mb-6" style={{ color: "#374151" }}>
                  Here's how each component of the formula works for a ghost policy holder:
                </p>
                <div className="flex flex-col gap-3">
                  {premiumFormula.map((row, i) => (
                    <motion.div
                      key={row.label}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex gap-4 items-start rounded-xl p-4 border"
                      style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                    >
                      <div className="text-right min-w-[80px] font-semibold" style={{ color: "#16a34a" }}>{row.example}</div>
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#111827" }}>{row.label}</div>
                        <div className="text-xs" style={{ color: "#6b7280" }}>{row.desc}</div>
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <BarChart3 size={14} />
                  Premium Scenarios
                </div>
                <h3 className="text-xl font-bold mb-6" style={{ color: "#111827" }}>
                  Ghost Policy vs. Staffed Policies
                </h3>
                <div className="flex flex-col gap-4">
                  {scenarios.map((s, i) => (
                    <div
                      key={s.type}
                      className="rounded-xl p-5 border"
                      style={{
                        background: s.highlight ? "#f0fdf4" : "white",
                        borderColor: s.highlight ? "#16a34a" : "#d1fae5",
                        borderWidth: s.highlight ? "2px" : "1px",
                      }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-bold" style={{ color: "#111827" }}>{s.type}</div>
                        {s.highlight && (
                          <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: "#dcfce7", color: "#15803d" }}>Best Value</span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span style={{ color: "#6b7280" }}>Payroll: </span><span style={{ color: "#374151" }}>{s.payroll}</span></div>
                        <div><span style={{ color: "#6b7280" }}>Rate: </span><span style={{ color: "#374151" }}>{s.rate}</span></div>
                        <div><span style={{ color: "#6b7280" }}>Premium: </span><strong style={{ color: "#16a34a" }}>{s.premium}</strong></div>
                        <div><span style={{ color: "#6b7280" }}>Audit: </span><span style={{ color: "#374151" }}>{s.audit}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── GHOST ADVANTAGES ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                The Ghost Policy <span className="green-gradient-text">Payroll Advantage</span>
              </h2>
              <p className="section-subtitle">
                Four ways a ghost policy protects your bottom line compared to standard workers' comp.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {ghostAdvantages.map((item, i) => (
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
                  <p style={{ color: "#6b7280" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIRING STEPS ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Users size={14} />
                When You're Ready to Grow
              </div>
              <h2 className="section-title mb-4">
                What Happens When You <span className="green-gradient-text">Hire Employees?</span>
              </h2>
              <p className="section-subtitle">
                Your ghost policy doesn't trap you — it transitions smoothly when your business grows.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6">
              {hiringSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative rounded-2xl p-6 border text-center"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-lg" style={{ background: "#16a34a", color: "white" }}>
                    {step.step}
                  </div>
                  <h3 className="font-bold mb-3" style={{ color: "#111827" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{step.desc}</p>
                  {i < hiringSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/3 z-10 text-xl" style={{ color: "#16a34a" }}>›</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAY AS YOU GO ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4 text-center">
                  Pay-As-You-Go vs. <span className="green-gradient-text">Traditional Premium</span>
                </h2>
                <p className="section-subtitle text-center mb-10" style={{ color: "#6b7280" }}>
                  Two ways to structure your premium payments — which is right for your business?
                </p>
                <div className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: "#d1fae5" }}>
                  <div className="grid grid-cols-3 text-sm font-semibold py-4 px-6" style={{ background: "#f0fdf4", borderBottom: "1px solid #d1fae5" }}>
                    <div style={{ color: "#6b7280" }}>Feature</div>
                    <div className="text-center" style={{ color: "#374151" }}>Traditional</div>
                    <div className="text-center" style={{ color: "#16a34a" }}>Pay-As-You-Go</div>
                  </div>
                  {payAsYouGo.map((row, i) => (
                    <div
                      key={row.feature}
                      className="grid grid-cols-3 py-4 px-6 text-sm"
                      style={{ borderBottom: i < payAsYouGo.length - 1 ? "1px solid #d1fae5" : "none", background: i % 2 === 0 ? "white" : "#fafffe" }}
                    >
                      <div className="font-medium" style={{ color: "#374151" }}>{row.feature}</div>
                      <div className="text-center" style={{ color: "#6b7280" }}>{row.traditional}</div>
                      <div className="text-center" style={{ color: "#374151" }}>{row.paygo}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PROTECTION TIPS ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4 text-center">
                  Protecting Yourself from <span className="green-gradient-text">Audit Exposure</span>
                </h2>
                <p className="mb-10 text-center" style={{ color: "#6b7280" }}>
                  Follow these best practices year-round to keep your audit clean and your premiums predictable.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {protectionTips.map((tip, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex items-start gap-3 rounded-xl p-4 border"
                      style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                    >
                      <div className="mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }}>{tip.icon}</div>
                      <span style={{ color: "#374151" }}>{tip.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">Premium & Payroll FAQ</h2>
              <p className="section-subtitle">Common questions about workers' comp premiums and payroll calculations.</p>
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
                  className="rounded-xl border overflow-hidden bg-white"
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
                Control Your <span className="green-gradient-text">WC Premium Today</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                Get the lowest possible workers' comp premium for your owner-only business.
                Instant quote, same-day coverage.
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
