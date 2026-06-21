import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for GhostWorkersCompInsurance.com — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly: name, email address, phone number, business details, and insurance-related information submitted through our quote or contact forms. We also automatically collect certain technical data when you visit our website, including IP address, browser type, device information, pages visited, and referring URLs via cookies and analytics tools.",
    },
    {
      title: "2. How We Use Your Information",
      content: "We use collected information to: provide insurance quotes and facilitate coverage placement; respond to your inquiries and provide customer support; send transactional communications related to your policy or quote; comply with legal obligations and regulatory requirements; improve our website and services; and send relevant marketing communications (with the ability to opt out at any time).",
    },
    {
      title: "3. Sharing Your Information",
      content: "We share your information with: licensed insurance carriers and their appointed representatives to provide quotes and bind coverage; our parent organization, Contractors Choice Agency LLC; service providers who assist in website operations and communications; and regulatory or law enforcement authorities as required by law. We do not sell your personal information to third parties for marketing purposes.",
    },
    {
      title: "4. Cookies and Tracking",
      content: "We use cookies and similar technologies to enhance site functionality, remember your preferences, and analyze site traffic. You may adjust cookie settings in your browser at any time. Disabling cookies may limit certain site features. We may use third-party analytics tools (e.g., Google Analytics) to understand site usage patterns.",
    },
    {
      title: "5. Data Security",
      content: "We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse. These include encrypted data transmission (SSL/TLS), access controls, and regular security reviews. However, no method of internet transmission is 100% secure, and we cannot guarantee absolute security.",
    },
    {
      title: "6. Data Retention",
      content: "We retain personal information for as long as necessary to fulfill the purposes described in this policy, including maintaining insurance records as required by state regulations, resolving disputes, and complying with legal obligations. Inactive account data is typically reviewed for deletion after 7 years.",
    },
    {
      title: "7. Your Rights",
      content: "Depending on your state of residence, you may have the right to: access the personal information we hold about you; request correction of inaccurate information; request deletion of your data (subject to legal retention requirements); opt out of marketing communications; and lodge a complaint with applicable data protection authorities. To exercise these rights, contact us at privacy@ghostworkerscompinsurance.com.",
    },
    {
      title: "8. California Privacy Rights",
      content: "California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt out of the sale of personal information. We do not sell personal information. To submit a CCPA request, contact us at privacy@ghostworkerscompinsurance.com.",
    },
    {
      title: "9. Third-Party Links",
      content: "Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites. We encourage you to review the privacy policies of any third-party sites you visit.",
    },
    {
      title: "10. Children's Privacy",
      content: "Our services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will promptly delete it.",
    },
    {
      title: "11. Changes to This Policy",
      content: "We may update this Privacy Policy periodically to reflect changes in our practices or applicable law. We will notify you of material changes by posting the updated policy on our website with a revised effective date. Your continued use of our services after such changes constitutes acceptance of the updated policy.",
    },
    {
      title: "12. Contact Us",
      content: "For privacy-related questions or requests, please contact us at: privacy@ghostworkerscompinsurance.com or call 844-967-5247. Contractors Choice Agency LLC operates GhostWorkersCompInsurance.com.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-14 text-center" style={{ background: "linear-gradient(135deg, #f0fdf4, #dcfce7)" }}>
          <div className="container-wide">
            <h1 className="text-4xl font-extrabold mb-3" style={{ color: "#111827" }}>Privacy Policy</h1>
            <p style={{ color: "#6b7280" }}>Effective Date: June 1, 2026 &nbsp;|&nbsp; Last Updated: June 21, 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="container-wide max-w-3xl">
            <p className="text-lg mb-10" style={{ color: "#374151" }}>
              GhostWorkersCompInsurance.com, operated by Contractors Choice Agency LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
              is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you visit our website or use our insurance services.
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
