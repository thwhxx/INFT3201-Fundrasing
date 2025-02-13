// components/Navbar/index.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";
import type { User as UserType } from "@/types/database";
import styles from "./navbar.module.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  const adminLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/programs", label: "Programs" },
    { href: "/donors", label: "Donors" },
    { href: "/committee", label: "Committee" },
    { href: "/reports", label: "Reports" },
  ];

  const committeeLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/programs", label: "Programs" },
    { href: "/meetings", label: "Meetings" },
  ];

  const donorLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/donations", label: "My Donations" },
    { href: "/programs", label: "Programs" },
  ];

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/programs", label: "Programs" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const getNavLinks = () => {
    switch (user?.role) {
      case "admin":
        return adminLinks;
      case "committee":
        return committeeLinks;
      case "donor":
        return donorLinks;
      default:
        return publicLinks;
    }
  };

  const links = getNavLinks();

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.logoSection}>
            <div className={styles.logo}>
              <Link href="/" className={styles.logoText}>
                McLaughlin
              </Link>
            </div>
            <div className={styles.desktopMenu}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${styles.link} ${
                    pathname === link.href
                      ? styles.activeLink
                      : styles.inactiveLink
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.authSection}>
            {user ? (
              <div className={styles.userInfo}>
                <span className={styles.welcomeText}>
                  Welcome, {user.preferred_name || user.first_name}
                </span>
                <button
                  onClick={() => {
                    /* Add logout handler */
                  }}
                  className={styles.logoutButton}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login" className={styles.loginButton}>
                Login
              </Link>
            )}
          </div>

          <div className={styles.mobileMenuButton}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={styles.menuIcon}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${
                pathname === link.href
                  ? styles.mobileLinkActive
                  : styles.mobileLinkInactive
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!user && (
            <Link
              href="/login"
              className={`${styles.mobileLink} ${styles.mobileLinkInactive}`}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
