"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users, CheckCircle, Phone, ChevronDown, Zap,
  FileText, Shield, MapPin, Briefcase, AlertTriangle, HardHat, Award,
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

const whyContractorsNeed = [
  {
    icon: <HardHat size={22} />,
    title: "GC Job Site Requirements",
    desc: "Most general contractors require all subs to carry their own workers' comp before stepping on a job site. Without a certificate, you can't work the job — regardless of your skill level.",
  },
  {
    icon: <Award size={22} />,
    title: "State Contractor Licensing",
    desc: "Most states require proof of workers' compensation insurance to issue or renew a contractor's license. A ghost policy generates the certificate that satisfies this requirement.",
  },
  {
    icon: <FileText size={22} />,
    title: "Bid on Commercial Projects",
    desc: "Commercial projects, government contracts, and larger residential jobs typically require proof of WC as part of the bid package. A ghost COI lets you compete.",
  },
  {
    icon: <Shield size={22} />,
    title: "Personal Liability Protection",
    desc: "While the ghost policy doesn't cover the owner for injuries, having a policy in place demonstrates professionalism and protects you from being swept into a GC's coverage at a higher rate.",
  },
];

const entityTypes = [
  {
    entity: "Sole Proprietor",
    exclusionAvailable: "Yes — in most states",
    howToExclude: "File exclusion election form with state or carrier",
    notes: "Simplest structure. Owner exclusion is standard for WC purposes in almost all states.",
  },
  {
    entity: "Single-Member LLC",
    exclusionAvailable: "Yes",
    howToExclude: "Owner election on policy application",
    notes: "LLC members are generally treated like sole proprietors for WC exclusion purposes.",
  },
  {
    entity: "Multi-Member LLC",
    exclusionAvailable: "Yes — varies by state",
    howToExclude: "Each member may file separately",
    notes: "Some states limit how many members can be excluded. Typically 2–4 officers/members.",
  },
  {
    entity: "Partnership",
    exclusionAvailable: "Yes — in many states",
    howToExclude: "Partners listed on exclusion endorsement",
    notes: "General partners are typically eligible. Limited partners may vary by state law.",
  },
  {
    entity: "S-Corp / C-Corp Officers",
    exclusionAvailable: "Yes — officer exclusions",
    howToExclude: "Executive officer exclusion endorsement",
    notes: "Up to 4 officers can typically be excluded. Forms filed with carrier or state.",
  },
];

const stateRules = [
  {
    state: "Florida (FL)",
    flag: "🌴",
    rule: "Sole proprietors and partners are automatically exempt from WC. To formally exclude yourself and get a certificate, you must file a Notice of Election of Exemption with the Florida Division of Workers' Compensation. LLC members with ≤10% ownership cannot be excluded.",
    link: "DWC Form 250.201",
  },
  {
    state: "Texas (TX)",
    flag: "⭐",
    rule: "Texas is unique — WC is not mandatory for most private employers. Employers can be 'non-subscribers.' However, contractors working on public projects or for GCs that require WC must carry coverage. Ghost policies are widely used in TX to satisfy these contractual requirements.",
    link: "No state form required",
  },
  {
    state: "California (CA)",
    flag: "☀️",
    rule: "All employers must carry WC in California. Sole proprietors and partners are excluded by statute, but must carry coverage if performing work requiring a contractor's license. Ghost policies are used when the license requires proof of WC but the owner has no employees.",
    link: "CSLB requires WC for license",
  },
  {
    state: "North Carolina (NC)",
    flag: "🏔️",
    rule: "WC is required for businesses with 3 or more employees. Sole proprietors, LLC members, and partners are excluded by default. Many contractors purchase ghost policies voluntarily because GCs in NC increasingly require WC certs from all subs.",
    link: "NC DOL WC Division",
  },
  {
    state: "Georgia (GA)",
    flag: "🍑",
    rule: "WC is required for businesses with 3+ employees. Sole proprietors and partners are exempt but can elect to be covered. Ghost policies satisfy GC requirements and are commonly used in the Atlanta metro construction market.",
    link: "State Board of Workers' Comp",
  },
];

const certForGC = [
  { step: "01", title: "Purchase Your Ghost Policy", desc: "Complete our online application. Select your state, trade, and enter the GC's info as the certificate holder." },
  { step: "02", title: "Request the GC Be Listed", desc: "When applying, enter the general contractor's legal name and address in the 'Certificate Holder' field. This makes them the named holder on your COI." },
  { step: "03", title: "Additional Insured (If Required)", desc: "Some GCs want to be listed as 'additional insured' — not just certificate holder. This requires an endorsement. Ask us if your GC requires AI status." },
  { step: "04", title: "Download & Deliver", desc: "Your ACORD 25 certificate is emailed to you and can be forwarded to your GC. We can also email directly to your GC upon request." },
];

const sub1099 = [
  { icon: <CheckCircle size={18} />, text: "1099 subs are not employees — you generally don't owe WC premium on their payments" },
  { icon: <CheckCircle size={18} />, text: "However, subs WITHOUT their own WC may be pulled into your audit as 'uninsured subs'" },
  { icon: <Shield size={18} />, text: "Always collect a certificate of insurance from every 1099 sub before work begins" },
  { icon: <AlertTriangle size={18} />, text: "Some states have strict independent contractor tests — document the sub relationship carefully" },
  { icon: <FileText size={18} />, text: "Use written contractor agreements that establish the independent nature of the relationship" },
  { icon: <Users size={18} />, text: "Your ghost policy does NOT cover 1099 subs — they need their own policies" },
];

const faqs = [
  {
    q: "Can an independent contractor get a ghost workers' comp policy?",
    a: "Yes. Independent contractors who operate as sole proprietors, single-member LLCs, or partnerships are ideal candidates for ghost WC policies. The policy is issued to your business entity, the owner is excluded, and a certificate is generated showing active coverage — which is exactly what most GCs and licensing boards require.",
  },
  {
    q: "Do I need a ghost policy if I'm a 1099 contractor working for one company?",
    a: "It depends on what your client requires. Many companies that use 1099 contractors require them to carry their own workers' comp as a condition of the working relationship. Even if it's not required, having your own WC certificate demonstrates professionalism and protects you from being misclassified as an employee if a dispute arises.",
  },
  {
    q: "What is an owner exclusion and how do I file it?",
    a: "An owner exclusion is an endorsement or election that removes the business owner from the list of covered persons under a workers' comp policy. For a ghost policy, the exclusion is filed as part of the policy application. In some states (like Florida), a separate state-specific form must be filed with the state workers' comp division. We handle all of this as part of setting up your policy.",
  },
  {
    q: "Why does Texas handle workers' comp differently?",
    a: "Texas is the only state where workers' comp is not mandatory for most private employers. Employers can legally opt out of the state system and become 'non-subscribers.' However, many job sites, GCs, and public contracts still require proof of WC from all contractors. Ghost policies in Texas serve this purpose — providing the certificate without mandating the owner join the state fund.",
  },
  {
    q: "Can I use a ghost policy to get my contractor's license?",
    a: "In most states, yes. Ghost workers' comp policies are recognized by state contractor licensing boards as valid proof of workers' compensation coverage. The ACORD 25 certificate generated by your ghost policy is the document the licensing board needs. Check your specific state's license application to confirm the exact coverage requirements — we can help verify before you apply.",
  },
];

export default function ContractorGhostCoveragePage() {
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
              animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 9, repeat: Infinity, delay: 0.5 }}
              className="absolute -top-16 -left-16 w-80 h-80 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(22,163,74,0.22) 0%, transparent 70%)" }}
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
                <Briefcase size={14} />
                Ghost WC for Contractors & 1099 Workers
              </motion.div>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                style={{ lineHeight: 1.1, color: "#111827" }}
              >
                Ghost Workers&apos; Comp for{" "}
                <span className="green-gradient-text">Contractors & 1099 Workers</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="text-xl mb-8"
                style={{ color: "#374151" }}
              >
                Independent contractors, sole proprietors, and 1099 workers — this policy
                was built for you. Get the workers&apos; comp certificate your license and GCs require
                without the complexity of a full payroll policy.
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
                  Get Contractor Quote
                </Link>
                <a href="tel:8449675247" className="btn-secondary text-base">
                  <Phone size={18} />
                  844-967-5247
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── WHY CONTRACTORS NEED IT ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                Why Contractors Need <span className="green-gradient-text">Ghost WC</span>
              </h2>
              <p className="section-subtitle">
                Four real-world situations where contractors need a WC certificate but have no employees.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {whyContractorsNeed.map((item, i) => (
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

        {/* ── ENTITY TYPE EXCLUSION TABLE ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                Who Qualifies for <span className="green-gradient-text">Owner Exclusion?</span>
              </h2>
              <p className="section-subtitle">
                Exclusion eligibility varies by business entity type. Here&apos;s how each structure works.
              </p>
            </motion.div>
            <div className="overflow-x-auto">
              <div className="bg-white rounded-2xl border overflow-hidden shadow-sm min-w-[640px]" style={{ borderColor: "#d1fae5" }}>
                <div className="grid grid-cols-4 text-sm font-semibold py-4 px-6" style={{ background: "#f0fdf4", borderBottom: "1px solid #d1fae5" }}>
                  <div style={{ color: "#6b7280" }}>Entity Type</div>
                  <div style={{ color: "#6b7280" }}>Exclusion Available</div>
                  <div style={{ color: "#6b7280" }}>How to Exclude</div>
                  <div style={{ color: "#6b7280" }}>Notes</div>
                </div>
                {entityTypes.map((row, i) => (
                  <div
                    key={row.entity}
                    className="grid grid-cols-4 py-4 px-6 text-sm"
                    style={{ borderBottom: i < entityTypes.length - 1 ? "1px solid #d1fae5" : "none", background: i % 2 === 0 ? "white" : "#fafffe" }}
                  >
                    <div className="font-semibold" style={{ color: "#111827" }}>{row.entity}</div>
                    <div style={{ color: "#16a34a" }}>{row.exclusionAvailable}</div>
                    <div style={{ color: "#6b7280" }}>{row.howToExclude}</div>
                    <div style={{ color: "#6b7280" }}>{row.notes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATE-BY-STATE RULES ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <MapPin size={14} />
                State-by-State Breakdown
              </div>
              <h2 className="section-title mb-4">
                Contractor WC Rules by <span className="green-gradient-text">State</span>
              </h2>
              <p className="section-subtitle">
                Workers&apos; comp exclusion rules vary significantly by state. Here are the key rules for five
                of the largest contractor markets.
              </p>
            </motion.div>
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
              {stateRules.map((state, i) => (
                <motion.div
                  key={state.state}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="rounded-2xl p-6 border"
                  style={{ background: "#f0fdf4", borderColor: "#d1fae5" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{state.flag}</span>
                    <h3 className="font-bold text-lg" style={{ color: "#111827" }}>{state.state}</h3>
                    <span className="ml-auto text-xs px-3 py-1 rounded-full font-medium" style={{ background: "#dcfce7", color: "#15803d" }}>
                      {state.link}
                    </span>
                  </div>
                  <p style={{ color: "#374151" }}>{state.rule}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm mt-8" style={{ color: "#9ca3af" }}>
              Rules for all 47 eligible states available on request. Call{" "}
              <a href="tel:8449675247" style={{ color: "#16a34a" }}>844-967-5247</a> for state-specific guidance.
            </p>
          </div>
        </section>

        {/* ── HOW TO GET CERT FOR GC ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">
                How to Get a Certificate <span className="green-gradient-text">for Your GC</span>
              </h2>
              <p className="section-subtitle">
                Four steps to get your COI delivered with the GC&apos;s info already on it.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {certForGC.map((step, i) => (
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
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-extrabold text-lg" style={{ background: "#16a34a", color: "white" }}>
                    {step.step}
                  </div>
                  <h3 className="font-bold mb-3" style={{ color: "#111827" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{step.desc}</p>
                  {i < certForGC.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/3 z-10 text-xl font-bold" style={{ color: "#16a34a" }}>›</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 1099 SUBS ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <Users size={14} />
                  1099 Subcontractor Considerations
                </div>
                <h2 className="section-title mb-6">
                  Ghost Policy +{" "}
                  <span className="green-gradient-text">1099 Subs</span>
                </h2>
                <p className="mb-8" style={{ color: "#374151" }}>
                  If you hire 1099 subcontractors while holding a ghost policy, here&apos;s what you need
                  to know to stay compliant and avoid surprise audit charges:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {sub1099.map((item, i) => (
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
                      <div className="mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }}>{item.icon}</div>
                      <span style={{ color: "#374151" }}>{item.text}</span>
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
              <h2 className="section-title mb-4">Contractor Ghost Coverage FAQ</h2>
              <p className="section-subtitle">Answers to the most common questions from contractors and 1099 workers.</p>
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
                Get Your Contractor{" "}
                <span className="green-gradient-text">Ghost Policy Today</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                Instant quote. Same-day certificate. Built for independent contractors
                in all 47 eligible states.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/quote" className="btn-primary text-base">
                  <Zap size={18} />
                  Get Instant Contractor Quote
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
