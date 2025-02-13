import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "McLaughlin University Fundraising",
  description: "Fundraising Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="app-container">
          <nav className="sidebar">
            <div className="sidebar-header">
              <h1>McLaughlin University</h1>
            </div>
            <div className="sidebar-menu">
              <a href="/" className="menu-item">
                <span>Dashboard</span>
              </a>
              <a href="/donors" className="menu-item">
                <span>Donors</span>
              </a>
              <a href="/programs" className="menu-item">
                <span>Programs</span>
              </a>
              <a href="/events" className="menu-item">
                <span>Events</span>
              </a>
              <a href="/reports" className="menu-item">
                <span>Reports</span>
              </a>
            </div>
          </nav>
          <main className="main-content">
            <header className="top-header">
              <div className="header-content">
                <h2>Fundraising Management System</h2>
                <div className="user-menu">
                  <span>Admin</span>
                </div>
              </div>
            </header>
            <div className="content-area">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
