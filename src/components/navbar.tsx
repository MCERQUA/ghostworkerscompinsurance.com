"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone, Zap } from "lucide-react";

const services = [
  { href: "/services/ghost-wc-policy", label: "Ghost WC Policy" },
  { href: "/services/same-day-coverage", label: "Same-Day Coverage" },
  { href: "/services/employer-audit-defense", label: "Audit Defense" },
  { href: "/services/payroll-protection", label: "Payroll Protection" },
  { href: "/services/contractor-ghost-coverage", label: "Contractor Coverage" },
  { href: "/services/instant-certificates", label: "Instant Certificates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #d1fae5" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(22,163,74,0.08)" : "none",
      }}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-lg" style={{ color: "#111827" }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #16a34a, #22c55e)" }}
            >
              <Zap size={16} color="white" fill="white" />
            </div>
            <span>
              Ghost<span style={{ color: "#16a34a" }}>WC</span>Ins
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {/* Services dropdown */}
            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                className="flex items-center gap-1 font-medium text-sm transition-colors"
                style={{ color: "#374151" }}
                onMouseEnter={() => setServicesOpen(true)}
              >
                Coverage <ChevronDown size={15} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 pt-2 w-56"
                  >
                    <div className="rounded-xl shadow-xl border overflow-hidden" style={{ background: "white", borderColor: "#d1fae5" }}>
                      {services.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-4 py-3 text-sm font-medium transition-colors"
                          style={{ color: "#374151" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#f0fdf4")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {[
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: "#374151" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:8449675247" className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#16a34a" }}>
              <Phone size={14} />
              844-967-5247
            </a>
            <Link href="/quote" className="btn-primary text-sm" style={{ padding: "0.5rem 1.25rem" }}>
              Get Instant Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "#374151" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: "white", borderTop: "1px solid #d1fae5" }}
          >
            <div className="container-wide py-4 flex flex-col gap-3">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="text-sm font-medium py-2"
                  style={{ color: "#374151" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {s.label}
                </Link>
              ))}
              {[
                { href: "/about", label: "About" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium py-2"
                  style={{ color: "#374151" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/quote" className="btn-primary text-center mt-2" onClick={() => setMobileOpen(false)}>
                Get Instant Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
