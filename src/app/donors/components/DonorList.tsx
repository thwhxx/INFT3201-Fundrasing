"use client";

import { useState, useEffect } from "react";
import { Donor } from "@/types";
import styles from "../donors.module.css";

export default function DonorList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch("/api/donors");
        if (!response.ok) throw new Error("Failed to fetch donors");
        const data = await response.json();
        setDonors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, []);

  if (loading) return <div>Loading donors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.donorList}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search donors..."
          className={styles.searchInput}
        />
        <button className={styles.addButton}>Add New Donor</button>
      </div>

      <div className={styles.grid}>
        {donors.map((donor) => (
          <div key={donor.donorId} className={styles.donorCard}>
            <div className={styles.donorHeader}>
              <h3>
                {donor.firstName} {donor.lastName}
              </h3>
              <span className={styles.donorType}>{donor.donorType}</span>
            </div>
            {donor.organizationName && (
              <p className={styles.organization}>{donor.organizationName}</p>
            )}
            <div className={styles.donorDetails}>
              <p>
                <strong>Total Donations:</strong> $
                {donor.totalDonations.toLocaleString()}
              </p>
              <p>
                <strong>Engagement:</strong> {donor.engagementLevel}
              </p>
              <p>
                <strong>Last Contact:</strong>{" "}
                {new Date(donor.lastContactDate).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.actionButton}>View Details</button>
              <button className={styles.actionButton}>Contact</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
