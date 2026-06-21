"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, CheckCircle, Phone, ChevronDown, Zap,
  Download, Mail, Shield, Users, RefreshCw, Clock, Send, Star,
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

const acordFields = [
  { field: "Named Insured", desc: "Your legal business name and address exactly as it appears on the policy." },
  { field: "Insurance Company", desc: "The A-rated carrier underwriting your policy, including NAIC number." },
  { field: "Policy Number", desc: "The unique identifier for your workers' compensation policy." },
  { field: "Effective & Expiration Dates", desc: "The date your coverage begins and the date it expires (typically 12 months)." },
  { field: "Type of Insurance", desc: "Workers' Compensation and Employer's Liability are listed separately." },
  { field: "Coverage Limits", desc: "Bodily injury per accident, bodily injury per employee, and policy limit for employer's liability." },
  { field: "Certificate Holder", desc: "The name and address of the person or company the COI is issued to (e.g., your GC)." },
  { field: "Authorized Signature", desc: "The producing agent's or broker's signature validating the certificate." },
];

const wcCertDetails = [
  { label: "Employer Information", value: "Your business name, address, EIN" },
  { label: "State(s) of Coverage", value: "States where the policy applies" },
  { label: "NCCI Class Codes", value: "Your trade classification code(s)" },
  { label: "WC Limits", value: "Statutory (unlimited in most states)" },
  { label: "Employer's Liability Limits", value: "Typically $100K / $500K / $100K" },
  { label: "Policy Effective Date", value: "When coverage starts" },
  { label: "Policy Expiration Date", value: "When it expires (renewal date)" },
  { label: "Carrier Name & NAIC", value: "Your insuring company's identifier" },
];

const additionalInsured = [
  {
    icon: <Shield size={22} />,
    title: "What 'Additional Insured' Means",
    desc: "An additional insured (AI) endorsement extends certain policy protections to a third party — typically the general contractor. It goes beyond just listing them as a certificate holder.",
  },
  {
    icon: <FileText size={22} />,
    title: "When It's Required",
    desc: "GCs on larger commercial or government projects often require AI status, not just a COI. This is especially common in NY, NJ, CA, and FL on jobs over $500K in contract value.",
  },
  {
    icon: <Users size={22} />,
    title: "Who Can Be Named",
    desc: "Any party with an insurable interest may be named as additional insured: GCs, property owners, developers, school districts, municipalities, or JV partners.",
  },
  {
    icon: <Send size={22} />,
    title: "How to Request",
    desc: "Contact us with the AI's full legal name and address. We'll issue an endorsement and update your certificate within the same business day in most cases.",
  },
];

const whenGCsRequire = [
  {
    icon: <FileText size={22} />,
    title: "New Job Start",
    desc: "Every new project often requires a fresh certificate showing coverage is active for the job period. GCs collect certs before they allow subs on site.",
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Annual Policy Renewal",
    desc: "When your policy renews, your old certificate shows a lapsed date. Any GC holding your expired cert will request an updated COI showing the new policy term.",
  },
  {
    icon: <Shield size={22} />,
    title: "Coverage Limit Changes",
    desc: "If the GC requires higher employer's liability limits than your current policy, they'll require a new COI after you upgrade your limits.",
  },
  {
    icon: <Users size={22} />,
    title: "Change of Certificate Holder",
    desc: "If you begin working for a new GC mid-policy, they need their own certificate with their name as holder. We issue additional COIs at no extra charge.",
  },
];

const deliveryMethods = [
  { method: "Email PDF", icon: <Mail size={22} />, desc: "Instant delivery to any email address. Standard for all certificates. You can forward directly to your GC or we can CC them automatically.", speed: "Immediate" },
  { method: "Download Portal", icon: <Download size={22} />, desc: "Log into your account and download your certificate at any time, day or night. Reprint as many times as needed.", speed: "On demand" },
  { method: "Direct to Certificate Holder", icon: <Send size={22} />, desc: "We email your COI directly to your GC's email address simultaneously with your delivery. No forwarding required.", speed: "Same send" },
  { method: "Fax Delivery", icon: <FileText size={22} />, desc: "For GCs or clients that still prefer fax, we can send to any fax number. Less common but fully supported.", speed: "Within hours" },
];

const automationSteps = [
  { step: "01", title: "Request Submitted", desc: "You or your GC submits a certificate request through our portal, by email, or by calling 844-967-5247." },
  { step: "02", title: "Policy Verified", desc: "Our system verifies your active policy, coverage dates, limits, and any endorsements required by the requesting party." },
  { step: "03", title: "Certificate Generated", desc: "An ACORD 25 form is auto-populated with your policy data and the certificate holder's information." },
  { step: "04", title: "Delivered Instantly", desc: "The PDF certificate is emailed to you and, optionally, directly to the certificate holder or additional insured. Usually within minutes." },
];

const holderVsAI = [
  {
    feature: "What they receive",
    holder: "A copy of the certificate showing them as the named holder",
    additional_insured: "An endorsement extending policy protections + the certificate",
  },
  {
    feature: "What it costs",
    holder: "Included at no charge",
    additional_insured: "May add a small endorsement fee",
  },
  {
    feature: "When required",
    holder: "Standard for all certificates",
    additional_insured: "Required on larger commercial/government jobs",
  },
  {
    feature: "Policy protection",
    holder: "Notification of cancellation only",
    additional_insured: "Extended coverage for their interest in the work",
  },
  {
    feature: "Common requester",
    holder: "Small residential GCs, licensing boards",
    additional_insured: "Large commercial GCs, municipalities, developers",
  },
];

const faqs = [
  {
    q: "What is an ACORD 25 certificate of insurance?",
    a: "ACORD 25 is the standardized form used industry-wide to summarize a workers' compensation (and other) insurance policy. It lists your business as the insured, shows your carrier, policy number, effective dates, and coverage limits. Most GCs, licensing boards, and project owners will specifically ask for an 'ACORD 25' — this is your COI.",
  },
  {
    q: "How quickly will I receive my certificate after purchasing a policy?",
    a: "For ghost policy holders, certificate delivery is same-day — typically within 1 to 3 hours of payment confirmation. Our automated system generates the ACORD 25 form immediately and sends it to your email. Most applicants who apply in the morning receive their COI before lunch.",
  },
  {
    q: "Can I get multiple certificates for different GCs?",
    a: "Yes. You can request unlimited certificates from your policy at no additional charge. Each certificate can name a different certificate holder. This is common for contractors who work for multiple GCs simultaneously — each one gets their own certificate showing them as the named holder.",
  },
  {
    q: "What's the difference between a certificate holder and additional insured?",
    a: "A certificate holder simply receives a copy of the COI as notice — if your policy is cancelled, they get notified. An additional insured is more significant: it extends certain policy protections to that party, meaning they may have coverage rights under your policy. Additional insured status requires an endorsement and is required by larger commercial GCs.",
  },
  {
    q: "My GC says my certificate expired — how do I get a new one?",
    a: "If your policy renewed, contact us and we'll issue an updated certificate reflecting the new policy term immediately. If your policy has lapsed (expired without renewal), you'll need to renew your policy first — we can get you rebound same-day. Call 844-967-5247 or use our online renewal portal.",
  },
];

export default function InstantCertificatesPage() {
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
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(22,163,74,0.2) 0%, transparent 70%)" }}
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 11, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-20 -left-10 w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)" }}
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
                <FileText size={14} />
                Instant COI Delivery
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                style={{ lineHeight: 1.1, color: "#111827" }}
              >
                Instant Certificate of{" "}
                <span className="green-gradient-text">Insurance Delivery</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl mb-8"
                style={{ color: "#374151" }}
              >
                Your workers&apos; comp certificate is generated and emailed the same day you
                purchase your policy. Unlimited COIs, multiple delivery methods, direct
                delivery to your GC — all at no extra charge.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="flex flex-wrap gap-3 justify-center mb-8"
              >
                {["Same-Day COI", "Unlimited Certificates", "Email & Download", "Direct to GC"].map((b) => (
                  <span key={b} className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full"
                    style={{ background: "white", color: "#15803d", border: "1px solid #bbf7d0" }}>
                    <CheckCircle size={13} style={{ color: "#16a34a" }} />
                    {b}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/quote" className="btn-primary text-base">
                  <Zap size={18} />
                  Get My Certificate Today
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  844-967-5247
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHAT IS A COI ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <FileText size={14} />
                  What Is a COI?
                </div>
                <h2 className="section-title mb-6">
                  Understanding the <span className="green-gradient-text">ACORD 25 Form</span>
                </h2>
                <p className="mb-6" style={{ color: "#374151" }}>
                  A Certificate of Insurance (COI) is a one-page summary document — standardized
                  as ACORD Form 25 — that provides evidence of your insurance coverage. It does not
                  modify the underlying policy; it simply summarizes its key terms for a third party.
                </p>
                <p className="mb-8" style={{ color: "#374151" }}>
                  For contractors, the COI is the most requested document in the industry. GCs,
                  property owners, licensing boards, and project managers all rely on it to verify
                  you&apos;re covered before you start work.
                </p>
                <div className="rounded-2xl p-5 border" style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={18} fill="#16a34a" color="#16a34a" />
                    <span className="font-semibold" style={{ color: "#111827" }}>Key fact:</span>
                  </div>
                  <p className="text-sm" style={{ color: "#374151" }}>
                    A COI is <em>not</em> the policy itself. It cannot be used to make a claim.
                    Its sole purpose is to prove to third parties that an insurance policy exists
                    and is active. The underlying policy document is what governs claims.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-xl mb-6" style={{ color: "#111827" }}>
                  What&apos;s on an ACORD 25 Certificate
                </h3>
                <div className="flex flex-col gap-3">
                  {acordFields.map((item, i) => (
                    <motion.div
                      key={item.field}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex gap-4 rounded-xl p-4 border"
                      style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                    >
                      <div className="w-1.5 rounded-full flex-shrink-0 self-stretch" style={{ background: "#16a34a" }} />
                      <div>
                        <div className="font-semibold text-sm" style={{ color: "#111827" }}>{item.field}</div>
                        <div className="text-xs" style={{ color: "#6b7280" }}>{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S ON YOUR WC CERT ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4 text-center">
                  What&apos;s on Your <span className="green-gradient-text">WC Certificate</span>
                </h2>
                <p className="section-subtitle text-center mb-10">
                  Workers&apos; comp certificates display specific data points that differ from general liability COIs.
                </p>
              </motion.div>
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: "#d1fae5" }}>
                <div className="grid grid-cols-2 text-sm font-semibold py-4 px-6" style={{ background: "#f0fdf4", borderBottom: "1px solid #d1fae5" }}>
                  <div style={{ color: "#6b7280" }}>Field</div>
                  <div style={{ color: "#6b7280" }}>What It Shows</div>
                </div>
                {wcCertDetails.map((row, i) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-2 py-4 px-6 text-sm"
                    style={{ borderBottom: i < wcCertDetails.length - 1 ? "1px solid #d1fae5" : "none", background: i % 2 === 0 ? "white" : "#fafffe" }}
                  >
                    <div className="font-medium" style={{ color: "#374151" }}>{row.label}</div>
                    <div style={{ color: "#6b7280" }}>{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ADDITIONAL INSURED ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                Additional Insured <span className="green-gradient-text">Endorsements</span>
              </h2>
              <p className="section-subtitle">
                When your GC needs more than a certificate — they need to be named on your policy.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {additionalInsured.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl p-6 border card-hover"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
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

        {/* ── WHEN GCS REQUIRE CERTS ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Clock size={14} />
                Certificate Triggers
              </div>
              <h2 className="section-title mb-4">
                When GCs Require <span className="green-gradient-text">Updated Certificates</span>
              </h2>
              <p className="section-subtitle">
                Four common scenarios where your GC will ask for a fresh COI.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whenGCsRequire.map((item, i) => (
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
                  <h3 className="font-bold text-lg mb-3" style={{ color: "#111827" }}>{item.title}</h3>
                  <p style={{ color: "#6b7280" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DELIVERY METHODS ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                Electronic vs. Paper <span className="green-gradient-text">Certificate Delivery</span>
              </h2>
              <p className="section-subtitle">
                We offer four delivery methods — all free, all instant or near-instant.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryMethods.map((method, i) => (
                <motion.div
                  key={method.method}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl p-6 border text-center card-hover"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    {method.icon}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#111827" }}>{method.method}</h3>
                  <div className="text-xs font-semibold mb-3 px-2 py-1 rounded-full inline-block" style={{ background: "#dcfce7", color: "#15803d" }}>
                    {method.speed}
                  </div>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{method.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTOMATION STEPS ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                How Our Automated System <span className="green-gradient-text">Works</span>
              </h2>
              <p className="section-subtitle">
                Request to delivery in minutes — no manual processing, no waiting for business hours.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {automationSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative bg-white rounded-2xl p-6 border text-center"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="text-5xl font-black mb-4" style={{ color: "#dcfce7" }}>{step.step}</div>
                  <h3 className="font-bold mb-3" style={{ color: "#111827" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{step.desc}</p>
                  {i < automationSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/3 z-10 text-xl font-bold" style={{ color: "#16a34a" }}>›</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOLDER VS AI ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="section-title mb-4 text-center">
                  Certificate Holder vs.{" "}
                  <span className="green-gradient-text">Additional Insured</span>
                </h2>
                <p className="section-subtitle text-center mb-10">
                  Two different levels of protection — and what each one means for your GC.
                </p>
                <div className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: "#d1fae5" }}>
                  <div className="grid grid-cols-3 text-sm font-semibold py-4 px-6" style={{ background: "#f0fdf4", borderBottom: "1px solid #d1fae5" }}>
                    <div style={{ color: "#6b7280" }}>Feature</div>
                    <div className="text-center" style={{ color: "#374151" }}>Certificate Holder</div>
                    <div className="text-center" style={{ color: "#16a34a" }}>Additional Insured</div>
                  </div>
                  {holderVsAI.map((row, i) => (
                    <div
                      key={row.feature}
                      className="grid grid-cols-3 py-4 px-6 text-sm"
                      style={{ borderBottom: i < holderVsAI.length - 1 ? "1px solid #d1fae5" : "none", background: i % 2 === 0 ? "white" : "#fafffe" }}
                    >
                      <div className="font-medium" style={{ color: "#374151" }}>{row.feature}</div>
                      <div className="text-center" style={{ color: "#6b7280" }}>{row.holder}</div>
                      <div className="text-center" style={{ color: "#374151" }}>{row.additional_insured}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-16" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Chris V.", trade: "Electrical Sub, NC", review: "My GC needed my COI by end of day or I would lose the contract. Ghost Workers Comp had it in my inbox in under 2 hours. Saved the job." },
                { name: "Maria L.", trade: "Tile Installer, FL", review: "I can't believe how easy it was. I got my certificate within the same morning I applied. The GC was shocked it came through so fast." },
                { name: "Tony B.", trade: "General Contractor, GA", review: "I require all my subs to send COIs before they step on site. These guys deliver same-day — which means my subs never delay my schedule." },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-2xl p-6 border"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={16} fill="#16a34a" color="#16a34a" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic" style={{ color: "#374151" }}>&ldquo;{t.review}&rdquo;</p>
                  <div className="font-semibold text-sm" style={{ color: "#111827" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#6b7280" }}>{t.trade}</div>
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
              <h2 className="section-title mb-4">Certificate of Insurance FAQ</h2>
              <p className="section-subtitle">Everything you need to know about getting and using your COI.</p>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "white", color: "#15803d" }}>
                <Download size={14} />
                Certificate in your inbox today
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#111827" }}>
                Get Your COI <span className="green-gradient-text">Within Hours</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                Apply now, pay securely online, and receive your ACORD 25 certificate
                by email — the same day, every time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote" className="btn-primary text-base">
                  <Zap size={18} />
                  Get Instant Certificate
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
