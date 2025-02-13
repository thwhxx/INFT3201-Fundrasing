// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Toaster } from "@/app/components/ui/toaster";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "McLaughlin University Fundraising",
  description: "Fundraising Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={styles.container}>
          <Navbar />
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            © {new Date().getFullYear()} McLaughlin University Fundraising
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
