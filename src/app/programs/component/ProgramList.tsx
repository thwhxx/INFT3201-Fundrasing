"use client";

import { useState, useEffect } from "react";
import { ProgramRow } from "@/types/database";
import styles from "../programs.module.css";
import ProgramModal from "@/app/programs/component/ProgramModal";

export default function ProgramList() {
  const [programs, setPrograms] = useState<ProgramRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<
    ProgramRow | undefined
  >();
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  async function fetchPrograms() {
    try {
      const response = await fetch("/api/programs");
      if (!response.ok) throw new Error("Failed to fetch programs");
      const data = await response.json();
      setPrograms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const handleAddProgram = () => {
    setSelectedProgram(undefined);
    setModalOpen(true);
  };

  const handleEditProgram = (program: ProgramRow) => {
    setSelectedProgram(program);
    setModalOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    try {
      const url = selectedProgram
        ? `/api/programs/${selectedProgram.id}`
        : "/api/programs";
      const method = selectedProgram ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save program");

      setMessage({
        type: "success",
        text: `Program ${
          selectedProgram ? "updated" : "created"
        } successfully!`,
      });
      fetchPrograms();
      setModalOpen(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: `Failed to ${selectedProgram ? "update" : "create"} program`,
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete program");

      setMessage({ type: "success", text: "Program deleted successfully!" });
      fetchPrograms();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to delete program" });
    }
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Loading programs...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.programList}>
      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Search programs..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.addButton} onClick={handleAddProgram}>
          Add New Program
        </button>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[message.type]}`}>
          {message.text}
        </div>
      )}

      <div className={styles.grid}>
        {filteredPrograms.map((program) => (
          <div key={program.id} className={styles.programCard}>
            <div className={styles.programHeader}>
              <h3>{program.name}</h3>
              <span className={styles.status}>{program.status}</span>
            </div>
            <div className={styles.category}>{program.categoryName}</div>
            <p className={styles.description}>{program.description}</p>
            <div className={styles.fundingInfo}>
              <div className={styles.fundingBar}>
                <div
                  className={styles.fundingProgress}
                  style={{
                    width: `${Math.min(
                      (Number(program.currentAmount) /
                        Number(program.fundingGoal)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p>
                ${Number(program.currentAmount).toLocaleString()} of $
                {Number(program.fundingGoal).toLocaleString()}
              </p>
            </div>
            <div className={styles.dates}>
              <p>Start: {new Date(program.startDate).toLocaleDateString()}</p>
              <p>End: {new Date(program.endDate).toLocaleDateString()}</p>
            </div>
            <div className={styles.cardActions}>
              <button
                className={styles.actionButton}
                onClick={() => handleEditProgram(program)}
              >
                Edit
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDelete(program.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProgramModal
        program={selectedProgram}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
