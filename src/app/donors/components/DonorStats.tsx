"use client";

import { useState, useEffect } from "react";
import styles from "../donors.module.css";

interface DonorStats {
  totalDonors: number;
  totalDonations: number;
  avgDonationAmount: number;
  activeEngagement: number;
}

export default function DonorStats() {
  const [stats, setStats] = useState<DonorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/donors/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch donor statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading)
    return <div className={styles.loadingState}>Loading statistics...</div>;
  if (error) return <div className={styles.errorState}>Error: {error}</div>;
  if (!stats) return <div className={styles.emptyState}>No data available</div>;

  // Check if all values are 0 (empty database)
  const isEmpty =
    stats.totalDonors === 0 &&
    stats.totalDonations === 0 &&
    stats.avgDonationAmount === 0 &&
    stats.activeEngagement === 0;

  if (isEmpty) {
    return (
      <div className={styles.emptyState}>
        <p>No donor statistics available</p>
      </div>
    );
  }

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <h3>Total Donors</h3>
        <p>{stats.totalDonors.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Total Donations</h3>
        <p>${stats.totalDonations.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Average Donation</h3>
        <p>${stats.avgDonationAmount.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Active Engagement</h3>
        <p>{stats.activeEngagement.toFixed(1)}%</p>
      </div>
    </div>
  );
}
