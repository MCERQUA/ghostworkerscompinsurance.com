"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Shield, Clock, CheckCircle, Phone, ArrowRight, Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { OwnersFieldset } from "@/components/forms/OwnersFieldset";

const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","West Virginia","Wisconsin",
];

const TRADES = [
  "General Contractor","Electrical","Plumbing","HVAC","Roofing","Carpentry/Framing",
  "Painting","Drywall","Flooring","Landscaping","Masonry/Concrete","Excavation",
  "Insulation","Tile/Stone","Cleaning Services","Other Construction",
];

export default function QuotePage() {
  const [ownerFields, setOwnerFields] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    businessName: "", state: "", trade: "", yearsInBusiness: "",
    coverageStart: "", limitsNeeded: "100/500",
    currentlyHaveWC: "no", additionalInsured: "no",
    "bot-field": "",
    priorExperienceMod: "", priorYear2Year: "", priorYear2Carrier: "", priorYear2Premium: "", priorYear2Mod: "", priorYear2ClaimCount: "", priorYear2Paid: "", priorYear2Reserved: "", priorYear3Year: "", priorYear3Carrier: "", priorYear3Premium: "", priorYear3Mod: "", priorYear3ClaimCount: "", priorYear3Paid: "", priorYear3Reserved: "", priorYear4Year: "", priorYear4Carrier: "", priorYear4Premium: "", priorYear4Mod: "", priorYear4ClaimCount: "", priorYear4Paid: "", priorYear4Reserved: "", priorYear5Year: "", priorYear5Carrier: "", priorYear5Premium: "", priorYear5Mod: "", priorYear5ClaimCount: "", priorYear5Paid: "", priorYear5Reserved: "",
    streetAddress: "", city: "", zip: "", priorYearGrossSales: "", priorYearSubcontractorExpenses: "", priorYearEmployeeCount: "", priorYearEmployeePayroll: "", estimatedGrossSales: "", estimatedSubcontractorExpenses: "", estimatedEmployeeCount: "", estimatedEmployeePayroll: "", estimatedMaterialCosts: "", subcontractorsHaveInsurance: "", percentSubcontractorsInsured: "", coverageForUninsuredSubcontractors: "", coverageTypes: "", annualGrossSales: "", yearBusinessStarted: "", businessDescription: "", classCode1: "", classCode2: "", classCode3: "", classCode4: "", classCode5: "", residentialVsCommercial: "", newVsExistingConstruction: "", largestProjects: "", priorCarrierName: "", priorPolicyExpiration: "", ownerNames: "", ownerDateOfBirth: "", ownerOwnershipPct: "", numberOfEmployees: "", amountOfPayroll: "", hasClericalStaff: "", clericalStaffCount: "", hasSalesStaff: "", salesStaffCount: "", officeVsFieldSplit: "", certificateHolderName: "", certificateHolderAddress: "",
    dba: "", entityType: "", entityTypeOther: "", fein: "", experienceMod: "", mailingSameAsPhysical: "", mailingAddress: "", mailingCity: "", mailingState: "", mailingZip: "", physicalCounty: "", fullTimeEmployees: "", partTimeEmployees: "", classPayroll1: "", classPayroll2: "", classPayroll3: "", classPayroll4: "", classPayroll5: "", usesSubcontractors: "", percentSubcontracted: "", subsProvideCOI: "", additionalInsuredName: "", coverageTerminated: "", carrierNonRenewing: "", lossesLast3Years: "", lossCount: "", lossDate: "", lossLineOfBusiness: "", lossDescription: "", lossAmountPaid: "", lossAmountReserved: "", lossHistoryStatus: "", lossAdditional: "", coverageTerminatedExplanation: "", carrierNonRenewingExplanation: "", 
    businessWebsite: "", secondaryPhone: "", sicCode: "", naicsCode: "", ncciRiskId: "", inspectionContactName: "", inspectionContactPhone: "", accountingContactName: "", accountingContactPhone: "", claimContactName: "", claimContactPhone: "", employersLiabilityLimit: "", priorPremium: "", yn_foreignCoverage: "", yn_voluntaryComp: "", yn_uslh: "", yn_aircraftWatercraft: "", ynExplain_aircraftWatercraft: "", yn_hazardousMaterial: "", ynExplain_hazardousMaterial: "", yn_undergroundOrHeights: "", ynExplain_undergroundOrHeights: "", yn_overWaterWork: "", ynExplain_overWaterWork: "", yn_otherBusiness: "", ynExplain_otherBusiness: "", yn_subletWithoutCOI: "", ynExplain_subletWithoutCOI: "", yn_safetyProgram: "", ynExplain_safetyProgram: "", yn_groupTransportation: "", ynExplain_groupTransportation: "", yn_minorsOrSeniors: "", ynExplain_minorsOrSeniors: "", yn_seasonalEmployees: "", ynExplain_seasonalEmployees: "", yn_volunteerLabor: "", ynExplain_volunteerLabor: "", yn_physicalHandicaps: "", ynExplain_physicalHandicaps: "", yn_outOfStateTravel: "", ynExplain_outOfStateTravel: "", yn_athleticTeams: "", ynExplain_athleticTeams: "", yn_physicalsRequired: "", ynExplain_physicalsRequired: "", yn_otherInsuranceWithCarrier: "", ynExplain_otherInsuranceWithCarrier: "", yn_employeeHealthPlan: "", ynExplain_employeeHealthPlan: "", yn_employeesOtherBusinesses: "", ynExplain_employeesOtherBusinesses: "", yn_leasedEmployees: "", ynExplain_leasedEmployees: "", yn_workFromHome: "", ynExplain_workFromHome: "", yn_taxLiensBankruptcy: "", ynExplain_taxLiensBankruptcy: "", yn_unpaidWCPremium: "", ynExplain_unpaidWCPremium: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const formRef = useRef<HTMLFormElement>(null);

  // ACORD intake helpers (all optional). Called as plain functions, not components, so inputs keep focus.
  const fieldStyle = { borderColor: "#d1fae5", color: "#111827" };
  const fieldCls = "w-full px-4 py-3 rounded-xl border text-sm focus:outline-none";
  const fv = (k: string) => (form as Record<string, string>)[k] || "";
  const txt = (name: string, label: string, placeholder = "", type = "text") => (
    <div className="mb-4" key={name}>
      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>{label}</label>
      <input type={type} name={name} value={fv(name)} onChange={(e) => set(name, e.target.value)} placeholder={placeholder} className={fieldCls} style={fieldStyle} />
    </div>
  );
  const area = (name: string, label: string, placeholder = "") => (
    <div className="mb-4" key={name}>
      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>{label}</label>
      <textarea name={name} rows={3} value={fv(name)} onChange={(e) => set(name, e.target.value)} placeholder={placeholder} className={fieldCls} style={fieldStyle} />
    </div>
  );
  const yn = (name: string, label: string, opts: string[] = ["Yes", "No"]) => (
    <div className="mb-4" key={name}>
      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>{label}</label>
      <div className="flex gap-6">
        {opts.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm" style={{ color: "#374151" }}>
            <input type="radio" name={name} value={o} checked={fv(name) === o} onChange={() => set(name, o)} />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
  const groupHead = (title: string, note: string) => (
    <>
      <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>{title}</h3>
      <p className="text-xs mb-4" style={{ color: "#6b7280" }}>{note}</p>
    </>
  );
  const [stepError, setStepError] = useState("");

  // The visible field values are the source of truth for "can I continue?". Text typed before
  // React hydrates, and autofill that sets .value without input events, are on screen but not in
  // state - a state-only check left Continue disabled with every field visibly filled (lead lost).
  const readDom = (names: string[]) => {
    const els = formRef.current?.elements;
    const found: Record<string, string> = {};
    names.forEach((n) => {
      const el = els?.namedItem(n) as HTMLInputElement | HTMLSelectElement | null;
      if (el && "value" in el) found[n] = el.value.trim();
    });
    return found;
  };
  const LABELS: Record<string, string> = {
    firstName: "first name", lastName: "last name", email: "email", phone: "phone",
    businessName: "business name", state: "state", trade: "trade",
  };
  const advance = (names: string[], next: number) => {
    const dom = readDom(names);
    setForm((f) => ({ ...f, ...Object.fromEntries(Object.entries(dom).filter(([, v]) => v)) }));
    const missing = names.filter((n) => !dom[n] && !String((form as Record<string, string>)[n] || "").trim());
    if (missing.length) {
      setStepError(`Please add your ${missing.map((n) => LABELS[n] || n).join(", ")} to continue.`);
      (formRef.current?.elements.namedItem(missing[0]) as HTMLElement | null)?.focus();
      return;
    }
    setStepError("");
    setStep(next);
  };
  // Pick up anything typed or autofilled before hydration, once React is live.
  useEffect(() => {
    const dom = readDom(["firstName", "lastName", "email", "phone"]);
    const filled = Object.fromEntries(Object.entries(dom).filter(([, v]) => v));
    if (Object.keys(filled).length) setForm((f) => ({ ...f, ...filled }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // A lead is captured if a delivery channel ACCEPTED it. fetch() does not reject
    // on a 4xx/5xx, so each response status has to be inspected explicitly.
    let captured = false;
    // The leads DB promotes `name`/`full_name` only; this form collects the name in two
    // halves, so send a joined `name` in the payload as well. The UI is unchanged.
    const payload = { ...form, ...ownerFields, name: `${form.firstName} ${form.lastName}`.trim() };
    if (form["bot-field"]) return;
    // Deliver lead directly to the leads webhook (SSR Netlify form capture is unreliable).
    try {
      const WEBHOOK_URL = `https://josh.jam-bot.com/social-api/api/leads/webhook/netlify?tenant=josh&site=ghostworkerscompinsurance.com`;
      const wr = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_name: "quote", source: "ghostworkerscompinsurance.com", ...payload }),
      });
      // 200 with stored:false means the webhook did NOT store the lead.
      if (wr.ok) captured = (await wr.json().catch(() => null))?.stored !== false;
    } catch {
      // lead webhook failed — do not block submission UX
    }
    if (!captured) {
    const params = new URLSearchParams();
    params.append("form-name", "quote");
    Object.entries(payload).forEach(([k, v]) => params.append(k, v));
    try {
      captured = (await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      })).ok || captured;
    } catch {}
    }
    setFailed(!captured);
    setSubmitted(captured);
  };

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen flex items-center justify-center" style={{ background: "#f0fdf4" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-lg mx-auto"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow"
              style={{ background: "#dcfce7" }}
            >
              <CheckCircle size={40} style={{ color: "#16a34a" }} />
            </div>
            <h1 className="text-3xl font-extrabold mb-4" style={{ color: "#111827" }}>
              Quote Request Received!
            </h1>
            <p className="text-lg mb-6" style={{ color: "#6b7280" }}>
              A licensed advisor will contact you within 1 business hour with your ghost WC quote.
              If you need immediate assistance, call us now.
            </p>
            <a href="/contact" className="btn-primary mb-4 w-full justify-center">
              <Mail size={18} /> Contact Us
            </a>
            <Link href="/" className="btn-secondary w-full justify-center">Back to Home</Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: "#f0fdf4" }}>

        {/* Header */}
        <section className="py-20 md:py-28 text-center" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-4" style={{ background: "white", color: "#15803d" }}>
              <Zap size={14} />
              Free Instant Quote — No Obligation
            </div>
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "#111827" }}>
              Get Your Ghost WC Quote
            </h1>
            <p className="text-lg" style={{ color: "#374151" }}>
              Takes 90 seconds. No phone call required.
            </p>
          </motion.div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: step >= s ? "#16a34a" : "#d1fae5",
                    color: step >= s ? "white" : "#6b7280",
                  }}
                >
                  {s}
                </div>
                {s < 3 && <div className="w-12 h-1 rounded" style={{ background: step > s ? "#16a34a" : "#d1fae5" }} />}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-2 text-xs" style={{ color: "#6b7280" }}>
            <span>Your Info</span>
            <span>Business</span>
            <span>Coverage</span>
          </div>
        </section>

        {/* Form */}
        <div className="container-wide max-w-2xl pb-20">
          <form
            ref={formRef}
            data-netlify="true"
            name="quote"
            method="POST"
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 mt-8 border"
            style={{ borderColor: "#d1fae5" }}
          >
            <input type="hidden" name="form-name" value="quote" />
            <input
              type="hidden"
              name="bot-field"
              value={form["bot-field"]}
              onChange={(e) => set("bot-field", e.target.value)}
              style={{ display: "none" }}
            />

            {/* Step 1 */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Your Contact Info</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                    placeholder="(555) 000-0000"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => advance(["firstName", "lastName", "email", "phone"], 2)}
                  className="btn-primary w-full justify-center"
                >
                  Continue <ArrowRight size={18} />
                </button>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Your Business</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Business Name *</label>
                  <input
                    type="text"
                    name="businessName"
                    required
                    value={form.businessName}
                    onChange={(e) => set("businessName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                    placeholder="Smith Electrical LLC"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>State *</label>
                    <select
                      name="state"
                      required
                      value={form.state}
                      onChange={(e) => set("state", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                    >
                      <option value="">Select state</option>
                      {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Trade / Industry *</label>
                    <select
                      name="trade"
                      required
                      value={form.trade}
                      onChange={(e) => set("trade", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                      style={{ borderColor: "#d1fae5", color: "#111827" }}
                    >
                      <option value="">Select trade</option>
                      {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Years in Business</label>
                  <select
                    name="yearsInBusiness"
                    value={form.yearsInBusiness}
                    onChange={(e) => set("yearsInBusiness", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                  >
                    <option value="">Select range</option>
                    <option value="Less than 1 year">Less than 1 year</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do you currently have workers comp coverage?</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => set("currentlyHaveWC", v)}
                        className="flex-1 py-3 rounded-xl border font-medium text-sm capitalize transition-all"
                        style={{
                          background: form.currentlyHaveWC === v ? "#dcfce7" : "white",
                          borderColor: form.currentlyHaveWC === v ? "#16a34a" : "#d1fae5",
                          color: form.currentlyHaveWC === v ? "#15803d" : "#6b7280",
                        }}
                      >
                        {v === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  {groupHead("Business identification", "Optional. Helps us prepare your application faster.")}
                  {txt("dba", "Doing business as (DBA), if different", "Trade name")}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Entity type</label>
                    <select name="entityType" value={form.entityType} onChange={(e) => set("entityType", e.target.value)} className={fieldCls} style={fieldStyle}>
                      <option value="">Select entity type</option>
                      {["Sole proprietor", "Partnership", "LLC", "Corporation", "S-Corporation", "Joint venture", "Other"].map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  {form.entityType === "Other" && txt("entityTypeOther", "Entity type, other", "Describe")}
                  {txt("fein", "Business FEIN (Federal Employer ID, 9 digits - never a Social Security number)", "12-3456789")}
                  {txt("experienceMod", "Experience mod, if you know it", "1.00")}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  {groupHead("Contacts and identifiers", "Optional. Helps the carrier reach the right person. Do not enter Social Security numbers anywhere on this form.")}
                  {txt("businessWebsite", "Business website", "https://")}
                  {txt("secondaryPhone", "Secondary phone", "")}
                  {txt("sicCode", "SIC code (if known)", "")}
                  {txt("naicsCode", "NAICS code (if known)", "")}
                  {txt("ncciRiskId", "NCCI risk ID or state rating bureau number (if you have one)", "")}
                  {txt("inspectionContactName", "Contact for premises inspection", "")}
                  {txt("inspectionContactPhone", "Inspection contact phone", "")}
                  {txt("accountingContactName", "Billing / audit contact", "")}
                  {txt("accountingContactPhone", "Billing / audit contact phone", "")}
                  {txt("claimContactName", "Claims contact", "")}
                  {txt("claimContactPhone", "Claims contact phone", "")}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Business details</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>What the business does and how long it has been running.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Year business started</label>
                    <input type="text" name="yearBusinessStarted" value={form.yearBusinessStarted} onChange={(e) => set("yearBusinessStarted", e.target.value)} placeholder="2015" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Description of the business</label>
                    <textarea name="businessDescription" rows={3} value={form.businessDescription} onChange={(e) => set("businessDescription", e.target.value)} placeholder="What the business does, day to day" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Annual gross sales</label>
                    <input type="text" name="annualGrossSales" value={form.annualGrossSales} onChange={(e) => set("annualGrossSales", e.target.value)} placeholder="$1,200,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Residential vs commercial split</label>
                    <input type="text" name="residentialVsCommercial" value={form.residentialVsCommercial} onChange={(e) => set("residentialVsCommercial", e.target.value)} placeholder="70% residential / 30% commercial" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>New vs existing construction</label>
                    <input type="text" name="newVsExistingConstruction" value={form.newVsExistingConstruction} onChange={(e) => set("newVsExistingConstruction", e.target.value)} placeholder="Mostly existing structures" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Largest projects</label>
                    <textarea name="largestProjects" rows={3} value={form.largestProjects} onChange={(e) => set("largestProjects", e.target.value)} placeholder="Three largest jobs in the last year — value and scope" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Business address</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Where your operation is based.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Street address</label>
                    <input type="text" name="streetAddress" value={form.streetAddress} onChange={(e) => set("streetAddress", e.target.value)} placeholder="123 Main St, Suite 200" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>City</label>
                    <input type="text" name="city" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Phoenix" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>ZIP code</label>
                    <input type="text" name="zip" value={form.zip} onChange={(e) => set("zip", e.target.value)} placeholder="85001" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  {txt("physicalCounty", "County")}
                  {yn("mailingSameAsPhysical", "Is your mailing address the same as this address?")}
                  {form.mailingSameAsPhysical === "No" && (
                    <>
                      {txt("mailingAddress", "Mailing address", "PO Box 100")}
                      {txt("mailingCity", "Mailing city")}
                      {txt("mailingState", "Mailing state")}
                      {txt("mailingZip", "Mailing ZIP")}
                    </>
                  )}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Payroll and class codes</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Employees, payroll and how the work is classified.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Number of employees</label>
                    <input type="text" name="numberOfEmployees" value={form.numberOfEmployees} onChange={(e) => set("numberOfEmployees", e.target.value)} placeholder="8" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Amount of payroll</label>
                    <input type="text" name="amountOfPayroll" value={form.amountOfPayroll} onChange={(e) => set("amountOfPayroll", e.target.value)} placeholder="$420,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 1</label>
                    <input type="text" name="classCode1" value={form.classCode1} onChange={(e) => set("classCode1", e.target.value)} placeholder="5403" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 2</label>
                    <input type="text" name="classCode2" value={form.classCode2} onChange={(e) => set("classCode2", e.target.value)} placeholder="5645" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 3</label>
                    <input type="text" name="classCode3" value={form.classCode3} onChange={(e) => set("classCode3", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 4</label>
                    <input type="text" name="classCode4" value={form.classCode4} onChange={(e) => set("classCode4", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Class code 5</label>
                    <input type="text" name="classCode5" value={form.classCode5} onChange={(e) => set("classCode5", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  {txt("fullTimeEmployees", "Full-time employees", "6")}
                  {txt("partTimeEmployees", "Part-time employees", "2")}
                  {[1, 2, 3, 4, 5].map((n) => txt(`classPayroll${n}`, `Payroll for class code ${n}`, "$"))}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Office vs field split</label>
                    <input type="text" name="officeVsFieldSplit" value={form.officeVsFieldSplit} onChange={(e) => set("officeVsFieldSplit", e.target.value)} placeholder="2 office / 6 field" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Any clerical staff?</label>
                    <select name="hasClericalStaff" value={form.hasClericalStaff} onChange={(e) => set("hasClericalStaff", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Clerical staff — count and payroll</label>
                    <input type="text" name="clericalStaffCount" value={form.clericalStaffCount} onChange={(e) => set("clericalStaffCount", e.target.value)} placeholder="2 clerical, $90,000 payroll" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Any outside sales staff?</label>
                    <select name="hasSalesStaff" value={form.hasSalesStaff} onChange={(e) => set("hasSalesStaff", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Sales staff — count and payroll</label>
                    <input type="text" name="salesStaffCount" value={form.salesStaffCount} onChange={(e) => set("salesStaffCount", e.target.value)} placeholder="1 outside sales, $60,000 payroll" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => { setStepError(""); setStep(1); }} className="btn-secondary flex-1 justify-center">Back</button>
                  <button
                    type="button"
                    onClick={() => advance(["businessName", "state", "trade"], 3)}
                    className="btn-primary flex-1 justify-center"
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {stepError && (
              <p role="alert" className="mt-4 rounded-xl border px-4 py-3 text-sm" style={{ borderColor: "#fcd34d", background: "#fffbeb", color: "#92400e" }}>
                {stepError}
              </p>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: "#111827" }}>Coverage Details</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Desired Coverage Start Date</label>
                  <input
                    type="date"
                    name="coverageStart"
                    value={form.coverageStart}
                    onChange={(e) => set("coverageStart", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none"
                    style={{ borderColor: "#d1fae5", color: "#111827" }}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-3" style={{ color: "#374151" }}>Coverage Limits Needed</label>
                  <div className="flex flex-col gap-3">
                    {[
                      { value: "100/500", label: "$100K / $500K (Standard — most states)", badge: "Most Common" },
                      { value: "500/500", label: "$500K / $500K (Enhanced)", badge: null },
                      { value: "1M/1M", label: "$1M / $1M (Maximum)", badge: null },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("limitsNeeded", opt.value)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all"
                        style={{
                          background: form.limitsNeeded === opt.value ? "#dcfce7" : "white",
                          borderColor: form.limitsNeeded === opt.value ? "#16a34a" : "#d1fae5",
                          color: form.limitsNeeded === opt.value ? "#15803d" : "#374151",
                        }}
                      >
                        <span>{opt.label}</span>
                        {opt.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#16a34a", color: "white" }}>
                            {opt.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do you need to list an Additional Insured?</label>
                  <div className="flex gap-4">
                    {["yes", "no"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => set("additionalInsured", v)}
                        className="flex-1 py-3 rounded-xl border font-medium text-sm capitalize transition-all"
                        style={{
                          background: form.additionalInsured === v ? "#dcfce7" : "white",
                          borderColor: form.additionalInsured === v ? "#16a34a" : "#d1fae5",
                          color: form.additionalInsured === v ? "#15803d" : "#6b7280",
                        }}
                      >
                        {v === "yes" ? "Yes" : "No"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Certificate Holder: same-day-coverage, contractor-ghost-coverage and
                    instant-certificates service pages all tell the applicant to enter the GC's/
                    project owner's name and address here so they get listed on the COI, but no
                    field ever existed to collect it (desk-2 capture-completeness check,
                    2026-11-12). Shown whenever an additional insured / certificate holder is
                    wanted so the promised data actually reaches the lead record. */}
                {form.additionalInsured === "yes" && (
                  <div className="mb-8">
                    <p className="text-xs mb-3" style={{ color: "#6b7280" }}>
                      Who should be listed as the certificate holder (the GC or project owner who needs a copy of your COI)?
                    </p>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Certificate holder name</label>
                      <input type="text" name="certificateHolderName" value={form.certificateHolderName} onChange={(e) => set("certificateHolderName", e.target.value)} placeholder="ABC General Contracting LLC" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Certificate holder address</label>
                      <input type="text" name="certificateHolderAddress" value={form.certificateHolderAddress} onChange={(e) => set("certificateHolderAddress", e.target.value)} placeholder="123 Main St, Suite 200, Phoenix, AZ 85001" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                    </div>
                    {area("additionalInsuredName", "Additional insured name(s), if different from the certificate holder")}
                  </div>
                )}

                {/* Trust reminder */}
                <div className="flex flex-col gap-2 mb-6 p-4 rounded-xl" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
                  {[
                    { icon: <Shield size={14} />, text: "A-rated carrier partners" },
                    { icon: <Clock size={14} />, text: "Same-day certificate delivery" },
                    { icon: <CheckCircle size={14} />, text: "No commitment — free quote" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm" style={{ color: "#15803d" }}>
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Prior year</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Your last completed 12 months. Best estimates are fine.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year gross sales</label>
                    <input type="text" name="priorYearGrossSales" value={form.priorYearGrossSales} onChange={(e) => set("priorYearGrossSales", e.target.value)} placeholder="$1,200,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year subcontractor expenses</label>
                    <input type="text" name="priorYearSubcontractorExpenses" value={form.priorYearSubcontractorExpenses} onChange={(e) => set("priorYearSubcontractorExpenses", e.target.value)} placeholder="$250,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year employee count</label>
                    <input type="text" name="priorYearEmployeeCount" value={form.priorYearEmployeeCount} onChange={(e) => set("priorYearEmployeeCount", e.target.value)} placeholder="8" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Prior year employee payroll</label>
                    <input type="text" name="priorYearEmployeePayroll" value={form.priorYearEmployeePayroll} onChange={(e) => set("priorYearEmployeePayroll", e.target.value)} placeholder="$400,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Next twelve months — estimates</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Projected figures for the coming policy period.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated gross sales</label>
                    <input type="text" name="estimatedGrossSales" value={form.estimatedGrossSales} onChange={(e) => set("estimatedGrossSales", e.target.value)} placeholder="$1,400,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated subcontractor expenses</label>
                    <input type="text" name="estimatedSubcontractorExpenses" value={form.estimatedSubcontractorExpenses} onChange={(e) => set("estimatedSubcontractorExpenses", e.target.value)} placeholder="$300,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated employee count</label>
                    <input type="text" name="estimatedEmployeeCount" value={form.estimatedEmployeeCount} onChange={(e) => set("estimatedEmployeeCount", e.target.value)} placeholder="10" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated employee payroll</label>
                    <input type="text" name="estimatedEmployeePayroll" value={form.estimatedEmployeePayroll} onChange={(e) => set("estimatedEmployeePayroll", e.target.value)} placeholder="$500,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Estimated material costs</label>
                    <input type="text" name="estimatedMaterialCosts" value={form.estimatedMaterialCosts} onChange={(e) => set("estimatedMaterialCosts", e.target.value)} placeholder="$180,000" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Coverage needed</label>
                    <textarea name="coverageTypes" rows={3} value={form.coverageTypes} onChange={(e) => set("coverageTypes", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Subcontractor insurance</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>How subcontracted work is covered.</p>
                  {yn("usesSubcontractors", "Do you use subcontractors?")}
                  {txt("percentSubcontracted", "Percent of work subcontracted", "25")}
                  {yn("subsProvideCOI", "Do your subcontractors provide certificates of insurance?")}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do your subcontractors carry their own insurance?</label>
                    <select name="subcontractorsHaveInsurance" value={form.subcontractorsHaveInsurance} onChange={(e) => set("subcontractorsHaveInsurance", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Percentage of subcontractors insured</label>
                    <input type="text" name="percentSubcontractorsInsured" value={form.percentSubcontractorsInsured} onChange={(e) => set("percentSubcontractorsInsured", e.target.value)} placeholder="100" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Do you need coverage for uninsured subcontractors?</label>
                    <select name="coverageForUninsuredSubcontractors" value={form.coverageForUninsuredSubcontractors} onChange={(e) => set("coverageForUninsuredSubcontractors", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }}><option value="">Select…</option><option value="Yes">Yes</option><option value="No">No</option></select>
                  </div>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Current or prior coverage</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Who covers you today, if anyone.</p>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Current or prior carrier</label>
                    <input type="text" name="priorCarrierName" value={form.priorCarrierName} onChange={(e) => set("priorCarrierName", e.target.value)} placeholder="Carrier name" className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Policy expiration date</label>
                    <input type="date" name="priorPolicyExpiration" value={form.priorPolicyExpiration} onChange={(e) => set("priorPolicyExpiration", e.target.value)} className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none" style={{ borderColor: "#d1fae5", color: "#111827" }} />
                  </div>
                  {yn("coverageTerminated", "Has any workers comp coverage been cancelled or non-renewed in the past 3 years?")}
                  {form.coverageTerminated === "Yes" && area("coverageTerminatedExplanation", "Please explain: which carrier, when, and why", "")}
                  {yn("carrierNonRenewing", "Is your current carrier non-renewing you?")}
                  {form.carrierNonRenewing === "Yes" && area("carrierNonRenewingExplanation", "Please explain: what reason did the carrier give?", "")}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  {groupHead("Coverage limits and prior premium", "Optional.")}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Employers liability limits requested (each accident / disease policy / disease each employee)</label>
                    <select name="employersLiabilityLimit" value={fv("employersLiabilityLimit")} onChange={(e) => set("employersLiabilityLimit", e.target.value)} className={fieldCls} style={fieldStyle}>
                      <option value="">Select limits</option>
                      <option value="100/500/100">$100,000 / $500,000 / $100,000</option>
                      <option value="500/500/500">$500,000 / $500,000 / $500,000</option>
                      <option value="1000/1000/1000">$1,000,000 / $1,000,000 / $1,000,000</option>
                      <option value="Other">Other / not sure</option>
                    </select>
                  </div>
                  {txt("priorPremium", "Annual premium on your current or most recent policy ($)", "", "number")}
                  {txt("priorExperienceMod", "Experience modification factor on your current or most recent policy", "e.g. 0.85")}
                  <details className="mb-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-wider" style={{ color: "#111827" }}>Prior years 2 to 5 (optional, click to expand)</summary>
                    <p className="text-xs mt-1 mb-4" style={{ color: "#6b7280" }}>Carrier, premium, experience mod and claims for each earlier policy year. Enter 0 if there were no claims.</p>
                    {[2, 3, 4, 5].map((n) => (
                      <div key={n} className="mb-4 pt-3" style={{ borderTop: "1px solid #d1fae5" }}>
                        <p className="text-sm font-semibold mb-2" style={{ color: "#111827" }}>Policy year {n}</p>
                        {txt(`priorYear${n}Year`, "Policy year", "e.g. 2023")}
                        {txt(`priorYear${n}Carrier`, "Carrier name")}
                        {txt(`priorYear${n}Premium`, "Premium ($)", "", "number")}
                        {txt(`priorYear${n}Mod`, "Experience mod", "e.g. 0.85")}
                        {txt(`priorYear${n}ClaimCount`, "Number of claims", "0 if none", "number")}
                        {txt(`priorYear${n}Paid`, "Amount paid ($)", "0 if none", "number")}
                        {txt(`priorYear${n}Reserved`, "Amount reserved ($)", "0 if none", "number")}
                      </div>
                    ))}
                  </details>
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  {groupHead("Loss history", "Optional. Claims in the last 3 years. Do not include claimant names or medical details.")}
                  {yn("lossesLast3Years", "Any workers comp losses or claims in the last 3 years?")}
                  {form.lossesLast3Years === "Yes" && (
                    <>
                      {txt("lossCount", "Number of claims", "1")}
                      {txt("lossDate", "Date of the most recent loss", "", "date")}
                      {txt("lossLineOfBusiness", "Line of business", "Workers compensation")}
                      {area("lossDescription", "Brief description of what happened")}
                      {txt("lossAmountPaid", "Amount paid", "$")}
                      {txt("lossAmountReserved", "Amount reserved", "$")}
                      {yn("lossHistoryStatus", "Claim status", ["Open", "Closed"])}
                      {area("lossAdditional", "Anything else about your loss history")}
                    </>
                  )}
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: "#111827" }}>Owners and officers</h3>
                  <p className="text-xs mb-4" style={{ color: "#6b7280" }}>Each owner or officer to be included or excluded.</p>
                  <OwnersFieldset
                    inputClass="w-full px-4 py-3 rounded-xl border border-[#d1fae5] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#16a34a]/30"
                    labelClass="block text-sm font-medium mb-2 text-[#374151]"
                    buttonClass="btn-secondary min-h-[44px]"
                    accentTextClass="text-[#16a34a]"
                    mutedTextClass="text-[#6b7280]"
                    borderClass="border-[#d1fae5]"
                    onFieldsChange={setOwnerFields}
                  />
                </div>

                <div className="mt-6 pt-5" style={{ borderTop: "1px solid #d1fae5" }}>
                  {groupHead("Workers' compensation questions", "Optional. Answer Yes or No; add a short explanation for any Yes.")}
                  {yn("yn_foreignCoverage", "Do you need Foreign coverage?")}
                  {yn("yn_voluntaryComp", "Do you want Voluntary Compensation coverage?")}
                  {yn("yn_uslh", "Do you need U.S. Longshore and Harbor Workers (USL&H) coverage?")}
                  {yn("yn_aircraftWatercraft", "Do you own, operate or lease aircraft or watercraft?")}
                  {fv("yn_aircraftWatercraft") === "Yes" && area("ynExplain_aircraftWatercraft", "Please explain (brief)")}
                  {yn("yn_hazardousMaterial", "Do past, present or discontinued operations involve storing, treating, discharging, applying, disposing of or transporting hazardous material?")}
                  {fv("yn_hazardousMaterial") === "Yes" && area("ynExplain_hazardousMaterial", "Please explain (brief)")}
                  {yn("yn_undergroundOrHeights", "Is any work performed underground or above 15 feet?")}
                  {fv("yn_undergroundOrHeights") === "Yes" && area("ynExplain_undergroundOrHeights", "Please explain (brief)")}
                  {yn("yn_overWaterWork", "Is any work performed on barges, vessels, docks or bridges over water?")}
                  {fv("yn_overWaterWork") === "Yes" && area("ynExplain_overWaterWork", "Please explain (brief)")}
                  {yn("yn_otherBusiness", "Are you engaged in any other type of business?")}
                  {fv("yn_otherBusiness") === "Yes" && area("ynExplain_otherBusiness", "Please explain (brief)")}
                  {yn("yn_subletWithoutCOI", "Is any work sublet without certificates of insurance?")}
                  {fv("yn_subletWithoutCOI") === "Yes" && area("ynExplain_subletWithoutCOI", "Please explain (brief)")}
                  {yn("yn_safetyProgram", "Is a written safety program in operation?")}
                  {fv("yn_safetyProgram") === "Yes" && area("ynExplain_safetyProgram", "Please explain (brief)")}
                  {yn("yn_groupTransportation", "Is any group transportation provided?")}
                  {fv("yn_groupTransportation") === "Yes" && area("ynExplain_groupTransportation", "Please explain (brief)")}
                  {yn("yn_minorsOrSeniors", "Any employees under 16 or over 60 years of age?")}
                  {fv("yn_minorsOrSeniors") === "Yes" && area("ynExplain_minorsOrSeniors", "Please explain (brief)")}
                  {yn("yn_seasonalEmployees", "Any seasonal employees?")}
                  {fv("yn_seasonalEmployees") === "Yes" && area("ynExplain_seasonalEmployees", "Please explain (brief)")}
                  {yn("yn_volunteerLabor", "Is there any volunteer or donated labor?")}
                  {fv("yn_volunteerLabor") === "Yes" && area("ynExplain_volunteerLabor", "Please explain (brief)")}
                  {yn("yn_physicalHandicaps", "Any employees with physical handicaps?")}
                  {fv("yn_physicalHandicaps") === "Yes" && area("ynExplain_physicalHandicaps", "Please explain (brief)")}
                  {yn("yn_outOfStateTravel", "Do employees travel out of state?")}
                  {fv("yn_outOfStateTravel") === "Yes" && area("ynExplain_outOfStateTravel", "Please explain (brief)")}
                  {yn("yn_athleticTeams", "Are athletic teams sponsored?")}
                  {fv("yn_athleticTeams") === "Yes" && area("ynExplain_athleticTeams", "Please explain (brief)")}
                  {yn("yn_physicalsRequired", "Are physicals required after offers of employment are made?")}
                  {fv("yn_physicalsRequired") === "Yes" && area("ynExplain_physicalsRequired", "Please explain (brief)")}
                  {yn("yn_otherInsuranceWithCarrier", "Any other insurance with this company?")}
                  {fv("yn_otherInsuranceWithCarrier") === "Yes" && area("ynExplain_otherInsuranceWithCarrier", "Please explain (brief)")}
                  {yn("yn_employeeHealthPlan", "Is an employee health plan provided?")}
                  {fv("yn_employeeHealthPlan") === "Yes" && area("ynExplain_employeeHealthPlan", "Please explain (brief)")}
                  {yn("yn_employeesOtherBusinesses", "Do any employees perform work for other businesses or subsidiaries?")}
                  {fv("yn_employeesOtherBusinesses") === "Yes" && area("ynExplain_employeesOtherBusinesses", "Please explain (brief)")}
                  {yn("yn_leasedEmployees", "Do you lease employees to or from other employers?")}
                  {fv("yn_leasedEmployees") === "Yes" && area("ynExplain_leasedEmployees", "Please explain (brief)")}
                  {yn("yn_workFromHome", "Do employees predominantly work from home?")}
                  {fv("yn_workFromHome") === "Yes" && area("ynExplain_workFromHome", "Please explain (brief)")}
                  {yn("yn_taxLiensBankruptcy", "Any tax liens or bankruptcy within the past 5 years?")}
                  {fv("yn_taxLiensBankruptcy") === "Yes" && area("ynExplain_taxLiensBankruptcy", "Please explain (brief)")}
                  {yn("yn_unpaidWCPremium", "Any undisputed and unpaid workers compensation premium due from you or any commonly owned or managed business?")}
                  {fv("yn_unpaidWCPremium") === "Yes" && area("ynExplain_unpaidWCPremium", "Please explain (brief)")}
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 justify-center">Back</button>
                  {failed && (
                    <div role="alert" className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
                      That did not send &mdash; your details are still here, nothing was lost. Please try
                      again, or call us at{" "}
                      <a href="tel:8449675247" className="font-semibold underline">844-967-5247</a>.
                    </div>
                  )}

                  <button type="submit" className="btn-primary flex-1 justify-center">
                    <Zap size={18} /> Get My Quote
                  </button>
                </div>
              </motion.div>
            )}
          </form>

          {/* Side trust */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: <Shield size={20} />, text: "Secure & Private" },
              { icon: <Zap size={20} />, text: "Instant Quote" },
              { icon: <Clock size={20} />, text: "Same-Day Coverage" },
            ].map((item) => (
              <div key={item.text} className="bg-white rounded-xl p-4 border" style={{ borderColor: "#d1fae5" }}>
                <div className="flex justify-center mb-2" style={{ color: "#16a34a" }}>{item.icon}</div>
                <div className="text-sm font-medium" style={{ color: "#374151" }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
