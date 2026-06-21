"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, Shield, Clock, CheckCircle, ArrowRight, Phone, Star,
  FileText, ChevronDown, Users, Award, TrendingUp, AlertTriangle,
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

const steps = [
  { icon: <FileText size={24} />, step: "01", title: "Fill Quick Form", desc: "Tell us your business type, state, and trade. Takes under 90 seconds." },
  { icon: <Zap size={24} />, step: "02", title: "Get Instant Quote", desc: "Our system pulls real-time rates from A-rated carriers." },
  { icon: <CheckCircle size={24} />, step: "03", title: "Confirm & Pay", desc: "Secure payment portal — major cards, ACH, or monthly payments." },
  { icon: <FileText size={24} />, step: "04", title: "Download Certificate", desc: "Your COI downloads instantly and is emailed to you automatically." },
];

const services = [
  { href: "/services/ghost-wc-policy", title: "Ghost WC Policy", desc: "Zero-employee workers comp policy that satisfies contractor licensing requirements in all non-monopolistic states.", icon: <Shield size={22} /> },
  { href: "/services/same-day-coverage", title: "Same-Day Coverage", desc: "Apply before noon, get your binder and certificate the same business day. No waiting, no delays.", icon: <Clock size={22} /> },
  { href: "/services/employer-audit-defense", title: "Audit Defense", desc: "Policy includes audit protection features that keep you compliant when carriers audit your payroll records.", icon: <AlertTriangle size={22} /> },
  { href: "/services/payroll-protection", title: "Payroll Protection", desc: "Coverage that flexes with seasonal payroll changes — never pay premium for workers you don't have.", icon: <TrendingUp size={22} /> },
  { href: "/services/contractor-ghost-coverage", title: "Contractor Coverage", desc: "Purpose-built for independent contractors, sole proprietors, and 1099 workers who need proof of coverage.", icon: <Users size={22} /> },
  { href: "/services/instant-certificates", title: "Instant Certificates", desc: "Same-day COI delivery to general contractors, project owners, or any third party who needs it.", icon: <Award size={22} /> },
];

const faqs = [
  { q: "What exactly is a ghost workers comp policy?", a: "A ghost policy is a workers' compensation insurance policy for a business owner with zero employees (or that excludes the owner). It provides a certificate of insurance that satisfies contractor licensing requirements, even though there are no employees covered under the payroll." },
  { q: "How fast can I get a certificate?", a: "Most applicants receive their certificate of insurance within the same business day — often within hours of completing the application and payment. If you apply before noon, same-day certificates are standard." },
  { q: "Is a ghost policy legal?", a: "Yes. Ghost policies are a legitimate form of workers' compensation insurance recognized by state licensing boards. They are commonly used by self-employed contractors, sole proprietors, and small businesses where the owner excludes themselves from coverage." },
  { q: "What states are NOT eligible for ghost WC policies?", a: "Monopolistic states — North Dakota, Ohio, Washington, and Wyoming — require workers' comp through a state fund and do not allow private ghost policies. In these states, you would need to purchase through the state fund. All other states are eligible." },
  { q: "How much does a ghost workers comp policy cost?", a: "Ghost WC premiums typically range from $800 to $2,500 per year depending on your state, trade classification, and coverage limits. We'll give you an exact quote in seconds after you complete our short form." },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    name: "GhostWorkersCompInsurance.com",
    description: "Fast ghost workers compensation insurance with instant quotes and same-day certificates.",
    url: "https://ghostworkerscompinsurance.com",
    telephone: "844-967-5247",
    areaServed: "US",
    serviceType: ["Ghost Workers Compensation Insurance", "Employer Liability Insurance"],
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
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(22,163,74,0.2) 0%, transparent 70%)" }}
            />
            <motion.div
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity, delay: 2 }}
              className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, transparent 70%)" }}
            />
          </div>

          <div className="container-wide relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                  style={{ background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" }}
                >
                  <Zap size={14} />
                  Get covered in minutes — not days
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6"
                  style={{ lineHeight: 1.1, color: "#111827" }}
                >
                  Ghost Workers Comp{" "}
                  <span className="green-gradient-text">in Minutes</span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="text-xl mb-8"
                  style={{ color: "#374151" }}
                >
                  Instant quotes. Same-day certificates. No employees required.
                  Get the workers comp certificate your contractor license demands —
                  without the hassle.
                </motion.p>

                {/* Trust micro-badges */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {["No Employees Needed", "A-Rated Carriers", "All 47 Eligible States", "Same-Day COI"].map((badge) => (
                    <span
                      key={badge}
                      className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full"
                      style={{ background: "white", color: "#15803d", border: "1px solid #bbf7d0" }}
                    >
                      <CheckCircle size={13} style={{ color: "#16a34a" }} />
                      {badge}
                    </span>
                  ))}
                </div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link href="/quote" className="btn-primary text-base" style={{ justifyContent: "center" }}>
                    <Zap size={18} />
                    Get My Quote Now
                  </Link>
                  <a href="tel:8449675247" className="btn-secondary text-base" style={{ justifyContent: "center" }}>
                    <Phone size={18} />
                    844-967-5247
                  </a>
                </motion.div>
              </div>

              {/* Hero image + floating cards */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero.jpg"
                    alt="Ghost workers comp insurance quote"
                    width={600}
                    height={420}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                {/* Floating stat cards */}
                <motion.div
                  className="absolute -bottom-4 -left-4 glass-card px-5 py-4 shadow-xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#dcfce7" }}>
                      <Clock size={18} style={{ color: "#16a34a" }} />
                    </div>
                    <div>
                      <div className="font-extrabold text-xl" style={{ color: "#111827" }}>Same Day</div>
                      <div className="text-xs" style={{ color: "#6b7280" }}>Certificate Issued</div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute -top-4 -right-4 glass-card px-5 py-4 shadow-xl"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="text-center">
                    <div className="font-extrabold text-2xl" style={{ color: "#16a34a" }}>90 sec</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>Avg quote time</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background: "#0f1f14" }}>
          <div className="container-wide py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "3,200+", label: "Policies Issued" },
                { value: "47", label: "States Eligible" },
                { value: "< 90s", label: "Avg Quote Time" },
                { value: "Same Day", label: "Certificate Delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold mb-1" style={{ color: "#22c55e" }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: "#86efac" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Zap size={14} />
                Simple 4-Step Process
              </div>
              <h2 className="section-title mb-4">Get Covered Today</h2>
              <p className="section-subtitle">
                From application to certificate in four quick steps. No paperwork, no waiting.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="relative bg-white rounded-2xl p-6 shadow-sm border"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="text-5xl font-black mb-4" style={{ color: "#dcfce7" }}>{step.step}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>{step.title}</h3>
                  <p className="text-sm" style={{ color: "#6b7280" }}>{step.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={20} style={{ color: "#16a34a" }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/quote" className="btn-primary">
                <Zap size={18} />
                Start My Application
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHAT IS GHOST POLICY ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/quick-quote.jpg"
                    alt="What is a ghost workers comp policy"
                    width={580}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <Shield size={14} />
                  What Is a Ghost Policy?
                </div>
                <h2 className="section-title mb-6">
                  Workers Comp Without <span className="green-gradient-text">Employees</span>
                </h2>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  A ghost workers compensation policy is a legitimate insurance product
                  for sole proprietors and business owners who have no employees (or exclude
                  themselves from coverage). It provides a certificate of insurance that
                  satisfies state contractor licensing requirements.
                </p>
                <ul className="flex flex-col gap-3 mb-8">
                  {[
                    "Satisfies contractor license WC requirements",
                    "Recognized by state licensing boards nationwide",
                    "Allows you to bid on general contractor jobs",
                    "No payroll audit — nothing to report",
                    "Add employees later without policy changes",
                    "Premium is minimal — you're not insuring a payroll",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle size={18} className="mt-0.5 flex-shrink-0" style={{ color: "#16a34a" }} />
                      <span style={{ color: "#374151" }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/services/ghost-wc-policy" className="btn-primary">
                  Learn More <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">Our Coverage Options</h2>
              <p className="section-subtitle">
                Everything a self-employed contractor needs — from the initial ghost policy to audit defense.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc, i) => (
                <motion.div
                  key={svc.href}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                >
                  <Link href={svc.href} className="block bg-white rounded-2xl p-6 border card-hover h-full" style={{ borderColor: "#d1fae5" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                      {svc.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "#111827" }}>{svc.title}</h3>
                    <p className="text-sm mb-4" style={{ color: "#6b7280" }}>{svc.desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "#16a34a" }}>
                      Learn more <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CCA ── */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                  <Award size={14} />
                  Why Contractors Choose Us
                </div>
                <h2 className="section-title mb-8">
                  Speed, Price, <span className="green-gradient-text">Reliability</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { icon: <Zap size={20} />, title: "Fastest Quotes", desc: "Average 90-second quote — no phone call required." },
                    { icon: <Shield size={20} />, title: "A-Rated Carriers", desc: "Coverage from top-rated, financially stable insurers." },
                    { icon: <Clock size={20} />, title: "Same-Day Service", desc: "Apply today, certificate in hand today." },
                    { icon: <Award size={20} />, title: "Licensed in 47 States", desc: "One call, nationwide coverage options." },
                  ].map((benefit) => (
                    <div key={benefit.title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#dcfce7", color: "#16a34a" }}>
                        {benefit.icon}
                      </div>
                      <div>
                        <h4 className="font-bold mb-1" style={{ color: "#111827" }}>{benefit.title}</h4>
                        <p className="text-sm" style={{ color: "#6b7280" }}>{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/employer-protection.jpg"
                    alt="Why choose ghost WC insurance from CCA"
                    width={580}
                    height={420}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2 className="section-title mb-4">Contractors Trust Us</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Marcus T.", trade: "Electrical Contractor, TX", review: "Got my ghost WC certificate in two hours. I was able to submit my contractor license application the same afternoon. Incredible service.", stars: 5 },
                { name: "Diana R.", trade: "Landscaping Sole Prop, FL", review: "I didn't even know ghost policies existed until a friend told me. Got a quote in literally 90 seconds and paid online. Certificate was in my inbox before I even closed my browser.", stars: 5 },
                { name: "Brendan K.", trade: "General Contractor, GA", review: "Price was lower than I expected and the process was painless. Will be recommending to every sub I work with.", stars: 5 },
              ].map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-2xl p-6 shadow-sm border"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} size={16} fill="#16a34a" color="#16a34a" />
                    ))}
                  </div>
                  <p className="text-sm mb-4 italic" style={{ color: "#374151" }}>&ldquo;{t.review}&rdquo;</p>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#111827" }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>{t.trade}</div>
                  </div>
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
              <h2 className="section-title mb-4">Common Questions</h2>
              <p className="section-subtitle">
                Answers to what contractors ask most often about ghost WC policies.
              </p>
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

        {/* ── FINAL CTA ── */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" }}>
          <div className="container-wide text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "white", color: "#15803d" }}>
                <Zap size={14} />
                No waiting. No phone calls required.
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: "#111827" }}>
                Your Ghost WC Certificate <span className="green-gradient-text">Awaits</span>
              </h2>
              <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "#374151" }}>
                Join 3,200+ contractors who got covered fast. Start your quote now — no obligation.
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
