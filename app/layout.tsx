import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrightPath Academy | Admissions Open in Mohali",
  description:
    "BrightPath Academy in Mohali helps students build clarity, confidence, and measurable results across IELTS, spoken English, tuition, and interview prep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f5f6f8] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
