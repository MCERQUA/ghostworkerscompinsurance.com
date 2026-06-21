"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Award, Users, Clock, CheckCircle, Phone, Zap } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="hero-gradient py-20">
          <div className="container-wide text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "#dcfce7", color: "#15803d" }}>
                <Shield size={14} />
                About GhostWorkersCompInsurance.com
              </div>
              <h1 className="section-title mb-6">
                Fast Ghost WC Coverage,<br /><span className="green-gradient-text">Expert Guidance</span>
              </h1>
              <p className="section-subtitle mx-auto text-lg" style={{ color: "#374151" }}>
                We&apos;re a specialized division of Contractors Choice Agency, focused exclusively on
                fast, affordable ghost workers compensation insurance for independent contractors.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/team.jpg"
                    alt="Ghost WC insurance specialists"
                    width={580}
                    height={420}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="section-title mb-6">
                  Why We <span className="green-gradient-text">Specialize</span> in Ghost Policies
                </h2>
                <p className="text-lg mb-6" style={{ color: "#374151" }}>
                  Contractors often need workers comp certificates fast — for a license renewal,
                  a new project bid, or a surprise GC requirement. Traditional insurance agencies
                  take days. We built our process around getting you covered in minutes, not days.
                </p>
                <p className="mb-6" style={{ color: "#374151" }}>
                  Ghost workers compensation policies are simple products that get complicated
                  by agents who don&apos;t specialize in them. We&apos;ve streamlined the entire
                  process: online application, real-time quoting, instant binding, and same-day
                  certificate delivery.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    "Licensed in 47 states",
                    "A-rated carrier partners",
                    "Ghost WC specialists",
                    "Same-day service",
                    "Online-first process",
                    "No hidden fees",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle size={16} style={{ color: "#16a34a" }} />
                      <span className="text-sm font-medium" style={{ color: "#374151" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section style={{ background: "#0f1f14" }}>
          <div className="container-wide py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "3,200+", label: "Contractors Covered", icon: <Users size={24} /> },
                { value: "47", label: "States Licensed", icon: <Shield size={24} /> },
                { value: "90 sec", label: "Avg Quote Time", icon: <Zap size={24} /> },
                { value: "Same Day", label: "Certificate Delivery", icon: <Clock size={24} /> },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-3" style={{ color: "#22c55e" }}>{stat.icon}</div>
                  <div className="text-3xl font-extrabold mb-1" style={{ color: "#22c55e" }}>{stat.value}</div>
                  <div className="text-sm" style={{ color: "#86efac" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20" style={{ background: "#f0fdf4" }}>
          <div className="container-wide">
            <div className="text-center mb-14">
              <h2 className="section-title mb-4">Our Commitment to You</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Zap size={24} />, title: "Speed First", desc: "We built our entire process around speed. From the moment you start your application to the moment your certificate lands in your inbox, we measure every step in minutes — not days." },
                { icon: <Shield size={24} />, title: "Carrier Quality", desc: "We only partner with A-rated and A+-rated insurance carriers. Your ghost WC policy is backed by financially strong insurers who will be there if you ever need them." },
                { icon: <Award size={24} />, title: "True Experts", desc: "Ghost workers comp is our specialty, not an afterthought. Our licensed advisors handle these policies every day and can answer questions regular agents struggle with." },
              ].map((val, i) => (
                <motion.div
                  key={val.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-white rounded-2xl p-8 shadow-sm border"
                  style={{ borderColor: "#d1fae5" }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "#dcfce7", color: "#16a34a" }}>
                    {val.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-3" style={{ color: "#111827" }}>{val.title}</h3>
                  <p style={{ color: "#6b7280" }}>{val.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container-wide text-center">
            <h2 className="section-title mb-4">Ready to Get Covered?</h2>
            <p className="section-subtitle mx-auto mb-8" style={{ color: "#374151" }}>
              Start your instant quote now — no phone call required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="btn-primary">
                <Zap size={18} /> Get Instant Quote
              </Link>
              <a href="tel:8449675247" className="btn-secondary">
                <Phone size={18} /> 844-967-5247
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
