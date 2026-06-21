"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock, CheckCircle, ArrowRight, Phone, ChevronDown, Zap,
  FileText, Shield, Users, AlertCircle, Star, Timer,
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

const timeline = [
  {
    time: "5 min",
    icon: <FileText size={22} />,
    title: "Complete Application",
    desc: "Fill out our streamlined online form: business name, EIN or SSN, state, industry description, and contact info. No lengthy questionnaires.",
  },
  {
    time: "15 min",
    icon: <Zap size={22} />,
    title: "Instant Underwriting",
    desc: "Our system routes your application to the appropriate A-rated carrier for your state and trade. Automated underwriting reviews eligibility in real time.",
  },
  {
    time: "30 min",
    icon: <Shield size={22} />,
    title: "Binder Issued",
    desc: "Once approved and payment confirmed, a binding confirmation letter is issued immediately. This is your temporary proof of coverage while the formal policy is processed.",
  },
  {
    time: "Same Day",
    icon: <CheckCircle size={22} />,
    title: "Certificate Delivered",
    desc: "Your ACORD 25 Certificate of Insurance is generated and emailed to you — typically within hours of application. Add any GC or certificate holder at no charge.",
  },
];

const qualifies = [
  { icon: <Users size={20} />, label: "Sole proprietors and single-member LLCs" },
  { icon: <Users size={20} />, label: "Owner-only businesses with no W-2 employees" },
  { icon: <CheckCircle size={20} />, label: "1099 independent contractors needing a WC cert" },
  { icon: <FileText size={20} />, label: "Businesses with no prior WC claims in last 3 years" },
  { icon: <Shield size={20} />, label: "Standard-risk trade classifications (most trades qualify)" },
  { icon: <Clock size={20} />, label: "New businesses (day-one coverage available)" },
];

const doesNotQualify = [
  "Businesses in monopolistic states (ND, OH, WA, WY)",
  "High-hazard classifications that require manual underwriting",
  "Applicants with recent material WC claims history",
  "Businesses with active employees seeking same-day coverage",
];

const whatYouNeed = [
  { label: "Business Legal Name", desc: "The exact name on your state business registration or license." },
  { label: "Federal EIN or SSN", desc: "Your Employer Identification Number, or Social Security Number for sole props without an EIN." },
  { label: "Operating State", desc: "The state where you primarily perform work and need the certificate." },
  { label: "Industry / Trade", desc: "A brief description of the work you do — we'll match you to the correct NCCI class code." },
  { label: "Estimated Start Date", desc: "When you need coverage to begin. Same-day is standard; future-date policies are also available." },
  { label: "Certificate Holder Info", desc: "The name and address of any GC or project owner who needs to be listed on your certificate." },
];

const binder_vs_cert = [
  {
    item: "What it is",
    binder: "A temporary confirmation of coverage issued immediately after payment",
    cert: "The formal ACORD 25 document issued by the carrier",
  },
  {
    item: "Legally binding",
    binder: "Yes — provides immediate proof of coverage",
    cert: "Yes — the standard industry document",
  },
  {
    item: "Accepted by GCs",
    binder: "Often accepted for urgent needs",
    cert: "Always accepted — this is what GCs request",
  },
  {
    item: "When issued",
    binder: "Immediately after payment confirmation",
    cert: "Same day, typically within a few hours",
  },
  {
    item: "Validity period",
    binder: "30–60 days or until formal policy issued",
    cert: "Full policy term (12 months)",
  },
];

const faqs = [
  {
    q: "What does 'same-day coverage' actually mean?",
    a: "Same-day coverage means you apply, pay, and receive your certificate of insurance within the same business day. For most applicants, the entire process — from starting the application to receiving your COI via email — takes 1 to 3 hours. Apply before 3 PM local time for guaranteed same-day delivery.",
  },
  {
    q: "Do I need to call anyone to get same-day coverage?",
    a: "No. Our process is fully online. Most applicants complete the application, pay, and receive their certificate without speaking to anyone. If you have questions or need help, our team is available at 844-967-5247.",
  },
  {
    q: "What payment methods are accepted for same-day?",
    a: "We accept all major credit cards (Visa, Mastercard, AmEx, Discover) and ACH bank transfer for same-day processing. Monthly premium financing is also available, though it may add a day to processing.",
  },
  {
    q: "Can I get same-day coverage if I have employees?",
    a: "Same-day ghost policy coverage is designed for owner-only businesses. If you have W-2 employees, your application will need full underwriting review, which typically takes 1–3 business days. Contact us to discuss your specific situation.",
  },
  {
    q: "What if I need coverage starting tomorrow, not today?",
    a: "No problem. During the application, you can specify any future effective date. You can also apply today for a policy that starts tomorrow or any future date — the certificate will show your chosen effective date.",
  },
];

export default function SameDayCoveragePage() {
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
              animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 9, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(22,163,74,0.25) 0%, transparent 70%)" }}
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
                <Clock size={14} />
                Certificate In Hand Today
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                style={{ lineHeight: 1.1, color: "#111827" }}
              >
                Same-Day Workers' Comp{" "}
                <span className="green-gradient-text">Coverage</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl mb-8"
                style={{ color: "#374151" }}
              >
                Apply online, get underwritten instantly, and receive your workers' comp
                certificate the same business day. No waiting, no phone tags, no delays.
              </motion.p>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className="flex flex-wrap gap-3 justify-center mb-8"
              >
                {["5-Min Application", "Instant Underwriting", "Same-Day COI", "No Employees Required"].map((b) => (
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
                  Start My Same-Day Application
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  844-967-5247
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Timer size={14} />
                How Same-Day Coverage Works
              </div>
              <h2 className="section-title mb-4">From Application to Certificate</h2>
              <p className="section-subtitle">
                Our streamlined process gets you from zero to certificate in under an hour for most applicants.
              </p>
            </motion.div>

            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ background: "#d1fae5" }} />
              <div className="flex flex-col gap-8">
                {timeline.map((step, i) => (
                  <motion.div
                    key={step.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    className={`relative grid md:grid-cols-2 gap-6 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
                  >
                    <div className={`flex flex-col gap-2 ${i % 2 === 1 ? "md:text-right md:items-end" : ""}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold w-fit" style={{ background: "#dcfce7", color: "#16a34a" }}>
                        <Clock size={13} />
                        {step.time}
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "#111827" }}>{step.title}</h3>
                      <p style={{ color: "#6b7280" }}>{step.desc}</p>
                    </div>
                    <div className="hidden md:flex justify-center">
                      <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{ background: "#16a34a", color: "white" }}>
                        {step.icon}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHO QUALIFIES ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <CheckCircle size={14} />
                  Who Qualifies for Same-Day
                </div>
                <h2 className="section-title mb-6">
                  Same-Day Is Available <span className="green-gradient-text">For Most Contractors</span>
                </h2>
                <p className="mb-6" style={{ color: "#374151" }}>
                  Same-day ghost policy coverage is designed for the most common applicant profile:
                  owner-only businesses in standard-risk trades. Here's who qualifies automatically:
                </p>
                <ul className="flex flex-col gap-3">
                  {qualifies.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 bg-white rounded-xl p-4 border" style={{ borderColor: "#d1fae5" }}>
                      <div style={{ color: "#16a34a" }}>{item.icon}</div>
                      <span style={{ color: "#374151" }}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca" }}>
                  <AlertCircle size={14} />
                  Who Needs Manual Review
                </div>
                <h3 className="text-xl font-bold mb-6" style={{ color: "#111827" }}>
                  Some Situations Require Additional Underwriting
                </h3>
                <p className="mb-6" style={{ color: "#374151" }}>
                  Same-day instant approval isn't available for every situation. The following
                  require manual underwriting review (typically 1–3 business days):
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {doesNotQualify.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 border" style={{ borderColor: "#fecaca" }}>
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
                      <span style={{ color: "#374151" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-xl p-4" style={{ background: "#f0fdf4", border: "1px solid #d1fae5" }}>
                  <p className="text-sm" style={{ color: "#374151" }}>
                    <strong>Not sure if you qualify for same-day?</strong> Start your application
                    and our system will tell you immediately, or call{" "}
                    <a href="tel:8449675247" className="font-semibold" style={{ color: "#16a34a" }}>844-967-5247</a>.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU NEED ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                What You Need <span className="green-gradient-text">to Apply</span>
              </h2>
              <p className="section-subtitle">
                Gather these six pieces of information before you start — the whole application
                takes under 5 minutes.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {whatYouNeed.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl p-6 border"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3 text-sm font-bold" style={{ background: "#16a34a", color: "white" }}>
                    {i + 1}
                  </div>
                  <h3 className="font-bold mb-2" style={{ color: "#111827" }}>{item.label}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BINDER VS CERT ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                Binder vs. <span className="green-gradient-text">Certificate of Insurance</span>
              </h2>
              <p className="section-subtitle">
                Understanding the difference between your temporary binder and your formal COI.
              </p>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: "#d1fae5" }}>
                <div className="grid grid-cols-3 text-sm font-semibold py-4 px-6" style={{ background: "#f0fdf4", borderBottom: "1px solid #d1fae5" }}>
                  <div style={{ color: "#6b7280" }}>Feature</div>
                  <div className="text-center" style={{ color: "#16a34a" }}>Binder</div>
                  <div className="text-center" style={{ color: "#16a34a" }}>Certificate (COI)</div>
                </div>
                {binder_vs_cert.map((row, i) => (
                  <div
                    key={row.item}
                    className="grid grid-cols-3 py-4 px-6 text-sm"
                    style={{ borderBottom: i < binder_vs_cert.length - 1 ? "1px solid #d1fae5" : "none", background: i % 2 === 0 ? "white" : "#fafffe" }}
                  >
                    <div className="font-medium" style={{ color: "#374151" }}>{row.item}</div>
                    <div className="text-center" style={{ color: "#6b7280" }}>{row.binder}</div>
                    <div className="text-center" style={{ color: "#6b7280" }}>{row.cert}</div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-center mt-4" style={{ color: "#9ca3af" }}>
                Both documents are issued same-day. Most GCs prefer the formal ACORD 25 COI — we deliver both.
              </p>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ROW ── */}
        <section className="py-16 bg-white">
          <div className="container-wide">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Raul M.", trade: "Plumbing Contractor, TX", review: "Got my certificate in 2 hours. The GC on my job was shocked it came through so fast. Will use again without hesitation.", stars: 5 },
                { name: "Angela S.", trade: "Painting Sole Prop, FL", review: "Applied at 10 AM, had my COI emailed by noon. The whole process was smooth and I didn't have to call anyone.", stars: 5 },
                { name: "David K.", trade: "Landscaping LLC, GA", review: "Same-day is no exaggeration. My certificate was in my inbox before I even finished watching TV that evening.", stars: 5 },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl p-6 border"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
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
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">Same-Day Coverage FAQ</h2>
              <p className="section-subtitle">Everything you need to know about our same-day service.</p>
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "white", color: "#15803d" }}>
                <Clock size={14} />
                Apply before 3 PM for guaranteed same-day delivery
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#111827" }}>
                Get Your Certificate <span className="green-gradient-text">Today</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                No phone calls, no paperwork, no waiting. Start your application now and
                have your COI in hand before end of business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote" className="btn-primary text-base">
                  <Zap size={18} />
                  Start Same-Day Application
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
