import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for GhostWorkersCompInsurance.com — terms governing use of our website and services.",
};

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using GhostWorkersCompInsurance.com (the \"Site\"), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the Site. We reserve the right to modify these terms at any time, and your continued use of the Site constitutes acceptance of any modifications.",
    },
    {
      title: "2. Not Insurance Advice",
      content: "The information on this Site is provided for general informational purposes only and does not constitute legal, financial, or professional insurance advice. Coverage descriptions are summaries only. Actual coverage is determined solely by the terms of the insurance policy issued. You should consult a licensed insurance professional before making coverage decisions.",
    },
    {
      title: "3. Insurance Services",
      content: "GhostWorkersCompInsurance.com is operated by Contractors Choice Agency LLC, a licensed insurance agency. We act as an agent for various insurance carriers and may receive commissions from carriers whose policies we place. All insurance products are subject to carrier underwriting approval, policy terms, conditions, and exclusions. Coverage availability varies by state.",
    },
    {
      title: "4. Quote and Coverage Limitations",
      content: "Quotes provided on this Site are estimates based on the information you submit. Final premiums are determined by the underwriting carrier and may differ from initial estimates. Coverage is not in force until a policy is bound and payment is received. We make no guarantee that any specific coverage will be available or that quotes will result in issued policies.",
    },
    {
      title: "5. Monopolistic State Exclusion",
      content: "Ghost workers compensation policies are not available in monopolistic states: North Dakota, Ohio, Washington, and Wyoming. Residents of these states must obtain workers' compensation coverage through the applicable state fund. We do not provide coverage in monopolistic states and accept no liability for coverage gaps in those jurisdictions.",
    },
    {
      title: "6. User Representations",
      content: "By using this Site, you represent that: you are at least 18 years of age; you have the legal authority to bind any business entity on whose behalf you are using the Site; all information you provide is accurate, complete, and current; and you will not use the Site for any unlawful purpose.",
    },
    {
      title: "7. Prohibited Uses",
      content: "You agree not to: use the Site in any way that violates applicable law; transmit false or misleading information for the purpose of obtaining insurance coverage; attempt to gain unauthorized access to any portion of the Site; use automated tools to scrape, crawl, or harvest data from the Site; or interfere with the Site's security or operation.",
    },
    {
      title: "8. Intellectual Property",
      content: "All content on this Site — including text, graphics, logos, images, and software — is the property of Contractors Choice Agency LLC or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
    },
    {
      title: "9. Disclaimer of Warranties",
      content: "THE SITE IS PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES.",
    },
    {
      title: "10. Limitation of Liability",
      content: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, CONTRACTORS CHOICE AGENCY LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR OUR SERVICES. OUR TOTAL LIABILITY SHALL NOT EXCEED THE PREMIUMS PAID BY YOU TO US IN THE 12 MONTHS PRECEDING THE CLAIM.",
    },
    {
      title: "11. Indemnification",
      content: "You agree to indemnify and hold harmless Contractors Choice Agency LLC, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including attorney's fees) arising from your use of the Site, violation of these Terms, or provision of false or inaccurate information.",
    },
    {
      title: "12. Governing Law",
      content: "These Terms are governed by the laws of the State of Texas without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Site shall be resolved in the state or federal courts located in Texas.",
    },
    {
      title: "13. Contact Information",
      content: "Questions about these Terms? Contact us at: legal@ghostworkerscompinsurance.com or call 844-967-5247. Contractors Choice Agency LLC, Licensed Insurance Agent.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-14 text-center" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
          <div className="container-wide">
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "#111827" }}>Terms of Service</h1>
            <p style={{ color: "#6b7280" }}>Effective Date: June 1, 2026 &nbsp;|&nbsp; Last Updated: June 21, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container-wide max-w-3xl">
            <p className="text-lg mb-10" style={{ color: "#374151" }}>
              Please read these Terms of Service carefully before using GhostWorkersCompInsurance.com.
              These terms govern your use of our website and the insurance services we provide.
            </p>
            <div className="flex flex-col gap-8">
              {sections.map((section) => (
                <div key={section.title} className="rounded-2xl p-6 border" style={{ background: "#f9fafb", borderColor: "#e5e7eb" }}>
                  <h2 className="text-xl font-bold mb-3" style={{ color: "#111827" }}>{section.title}</h2>
                  <p style={{ color: "#374151", lineHeight: 1.7 }}>{section.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/contact" className="btn-primary">Contact Us With Questions</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
