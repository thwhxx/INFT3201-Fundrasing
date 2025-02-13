// app/programs/components/ProgramStats.tsx
"use client";

import { useState, useEffect } from "react";
import type { ProgramStats as ProgramStatsType } from "@/types/database";
import styles from "../programs.module.css";

export default function ProgramStats() {
  const [stats, setStats] = useState<ProgramStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/programs/stats");
        if (!response.ok) throw new Error("Failed to fetch program statistics");
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

  if (loading) return <div>Loading statistics...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>No statistics available</div>;

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <h3>Total Programs</h3>
        <p>{stats.totalPrograms}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Active Programs</h3>
        <p>{stats.activePrograms}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Total Funding</h3>
        <p>${stats.totalFunding.toLocaleString()}</p>
      </div>
      <div className={styles.statCard}>
        <h3>Average Completion</h3>
        <p>{stats.averageCompletion.toFixed(1)}%</p>
      </div>
    </div>
  );
}
