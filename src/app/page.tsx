import DonorStats from "./donors/components/DonorStats";
import styles from "./page.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1>Dashboard</h1>
        <p>Welcome to McLaughlin University Fundraising System</p>
      </div>

      <section className={styles.statsSection}>
        <h2>Donor Statistics</h2>
        <DonorStats />
      </section>

      <div className={styles.dashboardGrid}>
        <section className={styles.recentDonations}>
          <h2>Recent Donations</h2>
          <div className={styles.cardContent}>
            <p className={styles.emptyState}>Loading recent donations...</p>
          </div>
        </section>

        <section className={styles.upcomingEvents}>
          <h2>Upcoming Events</h2>
          <div className={styles.cardContent}>
            <p className={styles.emptyState}>Loading upcoming events...</p>
          </div>
        </section>

        <section className={styles.programProgress}>
          <h2>Program Progress</h2>
          <div className={styles.cardContent}>
            <p className={styles.emptyState}>Loading program progress...</p>
          </div>
        </section>

        <section className={styles.donorEngagement}>
          <h2>Donor Engagement</h2>
          <div className={styles.cardContent}>
            <p className={styles.emptyState}>Loading engagement metrics...</p>
          </div>
        </section>
      </div>
    </div>
  );
}
