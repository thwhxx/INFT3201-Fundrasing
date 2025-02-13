"use client";

import { useState, useEffect } from "react";
import { DonorRow } from "@/types/database";
import styles from "../donors.module.css";

export default function DonorList() {
  const [donors, setDonors] = useState<DonorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchDonors() {
      try {
        const response = await fetch("/api/donors");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch donors");
        }

        const data = await response.json();

        // Ensure data is an array before setting state
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: Expected an array");
        }

        setDonors(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchDonors();
  }, []);

  const filteredDonors = Array.isArray(donors)
    ? donors.filter(
        (donor) =>
          donor.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          donor.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading) return <div>Loading donors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.donorList}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search donors..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.addButton}>Add New Donor</button>
      </div>

      <div className={styles.grid}>
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div key={donor.donorId} className={styles.donorCard}>
              <div className={styles.donorHeader}>
                <h3>
                  {donor.firstName} {donor.lastName}
                </h3>
                <span className={styles.donorType}>{donor.donorType}</span>
              </div>
              {donor.approach && (
                <p className={styles.approach}>Approach: {donor.approach}</p>
              )}
              <div className={styles.donorDetails}>
                <p>
                  <strong>Total Donations:</strong> $
                  {Number(donor.totalDonations || 0).toLocaleString()}
                </p>
                <p>
                  <strong>Engagement:</strong> {donor.engagementLevel}
                </p>
                <p>
                  <strong>Last Contact:</strong>{" "}
                  {donor.lastContactDate
                    ? new Date(donor.lastContactDate).toLocaleDateString()
                    : "No contact recorded"}
                </p>
                <p>
                  <strong>Email:</strong> {donor.email}
                </p>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.actionButton}>View Details</button>
                <button className={styles.actionButton}>Contact</button>
              </div>
            </div>
          ))
        ) : (
          <div>No donors found</div>
        )}
      </div>
    </div>
  );
}
