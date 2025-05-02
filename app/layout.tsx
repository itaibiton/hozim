import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/client-layout";

const notoSansHebrew = Noto_Sans_Hebrew({
  variable: "--font-noto-sans-hebrew",
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "חוזים - פלטפורמה לניהול חוזים",
  description: "פלטפורמה לניהול, עריכה וייצוא חוזים משפטיים",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${notoSansHebrew.variable} antialiased text-right`}
        style={{
          direction: "rtl",
        }}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
