// app/page.tsx
import { Button } from "@/app/components/ui/button";
import { Card, CardContent } from "@/app/components/ui/card";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Making a Difference Together</h1>
            <p className={styles.heroDescription}>
              Join us in supporting meaningful programs and creating positive
              change in our community.
            </p>
            <div className={styles.buttonGroup}>
              <Link href="/programs">
                <Button variant="secondary" size="lg">
                  View Programs
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className={styles.programsSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Featured Programs</h2>
          <div className={styles.cardGrid}>
            {/* Featured Program Cards */}
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Education Initiative</h3>
                <p className={styles.cardText}>
                  Supporting students through scholarships and educational
                  resources.
                </p>
                <Link href="/programs/education">
                  <Button variant="outline" className={styles.cardButton}>
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Community Development</h3>
                <p className={styles.cardText}>
                  Building stronger communities through local improvement
                  projects.
                </p>
                <Link href="/programs/community">
                  <Button variant="outline" className={styles.cardButton}>
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardContent className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Healthcare Access</h3>
                <p className={styles.cardText}>
                  Improving healthcare accessibility for underserved
                  populations.
                </p>
                <Link href="/programs/healthcare">
                  <Button variant="outline" className={styles.cardButton}>
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className={styles.impactSection}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Our Impact</h2>
          <div className={styles.impactGrid}>
            <div>
              <div className={styles.impactNumber}>$1M+</div>
              <p className={styles.impactLabel}>Funds Raised</p>
            </div>
            <div>
              <div className={styles.impactNumber}>50+</div>
              <p className={styles.impactLabel}>Active Programs</p>
            </div>
            <div>
              <div className={styles.impactNumber}>10K+</div>
              <p className={styles.impactLabel}>Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
