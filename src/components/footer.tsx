"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Shield, Clock, Award, Zap } from "lucide-react";

const coverage = [
  { href: "/services/ghost-wc-policy", label: "Ghost WC Policy" },
  { href: "/services/same-day-coverage", label: "Same-Day Coverage" },
  { href: "/services/employer-audit-defense", label: "Audit Defense" },
  { href: "/services/payroll-protection", label: "Payroll Protection" },
  { href: "/services/contractor-ghost-coverage", label: "Contractor Coverage" },
  { href: "/services/instant-certificates", label: "Instant Certificates" },
];

const quick = [
  { href: "/quote", label: "Get Instant Quote" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function Footer() {
  return (
    <footer>
      {/* CTA Band */}
      <div style={{ background: "linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)" }}>
        <div className="container-wide py-14 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap size={20} color="white" fill="white" />
            <span className="text-white font-bold text-sm uppercase tracking-widest">Ready in Minutes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Get Ghost WC Coverage Today
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            No employees, no payroll — just proof of coverage. Get your certificate instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-full transition-all"
              style={{ background: "white", color: "#16a34a" }}
            >
              <Zap size={18} />
              Start Free Quote
            </Link>
            <a
              href="tel:8449675247"
              className="inline-flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-full border-2 border-white text-white transition-all"
            >
              <Phone size={18} />
              844-967-5247
            </a>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ background: "#0f1f14", color: "#d1fae5" }}>
        <div className="container-wide py-14">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)" }}
                >
                  <Zap size={16} color="white" fill="white" />
                </div>
                <span className="font-extrabold text-lg text-white">
                  GhostWC<span style={{ color: "#22c55e" }}>Ins</span>
                </span>
              </div>
              <p className="text-sm mb-6" style={{ color: "#86efac", lineHeight: 1.7 }}>
                Fast, affordable ghost workers compensation insurance. Get covered in minutes — not days.
              </p>
              <div className="flex flex-col gap-2 text-sm" style={{ color: "#86efac" }}>
                <div className="flex items-center gap-2">
                  <Phone size={14} />
                  <a href="tel:8449675247" className="hover:text-white transition-colors">844-967-5247</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <a href="mailto:quotes@ghostworkerscompinsurance.com" className="hover:text-white transition-colors">
                    quotes@ghostworkerscompinsurance.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>Licensed Nationwide</span>
                </div>
              </div>
            </div>

            {/* Coverage */}
            <div>
              <h4 className="font-bold text-white mb-4">Coverage Options</h4>
              <ul className="flex flex-col gap-2">
                {coverage.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm transition-colors" style={{ color: "#86efac" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#86efac")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="flex flex-col gap-2">
                {quick.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm transition-colors" style={{ color: "#86efac" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#86efac")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust badges */}
            <div>
              <h4 className="font-bold text-white mb-4">Why Choose Us</h4>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Zap size={16} />, title: "Instant Quotes", desc: "Coverage quotes in under 60 seconds" },
                  { icon: <Shield size={16} />, title: "A-Rated Carriers", desc: "Backed by top-rated insurers" },
                  { icon: <Clock size={16} />, title: "Same-Day Certs", desc: "Certificates issued immediately" },
                  { icon: <Award size={16} />, title: "Expert Advisors", desc: "Licensed in all 50 states" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5" style={{ color: "#22c55e" }}>{item.icon}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-xs" style={{ color: "#86efac" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: "1px solid #1f3d26" }}>
            <p className="text-xs text-center md:text-left" style={{ color: "#4ade80" }}>
              &copy; {new Date().getFullYear()} GhostWorkersCompInsurance.com. All rights reserved.
              Operated by Contractors Choice Agency LLC. Licensed insurance agent.
            </p>
            <p className="text-xs text-center" style={{ color: "#4ade80" }}>
              Coverage availability varies by state. Not available in monopolistic states without separate employer&apos;s liability.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
