import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
        style={{ background: "#dcfce7" }}
      >
        <span style={{ fontSize: "2rem" }}>🔍</span>
      </div>
      <h1 className="text-4xl font-extrabold mb-3" style={{ color: "#111827" }}>
        Page Not Found
      </h1>
      <p className="text-lg mb-8" style={{ color: "#6b7280" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
