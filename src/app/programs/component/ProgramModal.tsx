"use client";

import { useState, useEffect } from "react";
import styles from "../programs.module.css";
import { ProgramRow } from "@/types/database";

interface Category {
  id: number;
  name: string;
  description?: string;
}

interface ProgramModalProps {
  program?: ProgramRow;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (programData: any) => Promise<void>;
}

export default function ProgramModal({
  program,
  isOpen,
  onClose,
  onSubmit,
}: ProgramModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    fundingGoal: "",
    startDate: "",
    endDate: "",
    status: "Active",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (program) {
      setFormData({
        name: program.name,
        description: program.description,
        categoryId: program.categoryId.toString(),
        fundingGoal: program.fundingGoal,
        startDate: program.startDate.split("T")[0],
        endDate: program.endDate.split("T")[0],
        status: program.status,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        categoryId: "",
        fundingGoal: "",
        startDate: "",
        endDate: "",
        status: "Active",
      });
    }
  }, [program]);

  async function fetchCategories() {
    try {
      const response = await fetch("/api/programs/categories");
      if (!response.ok) throw new Error("Failed to fetch categories");
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{program ? "Edit Program" : "New Program"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Program Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="fundingGoal">Funding Goal</label>
            <input
              type="number"
              id="fundingGoal"
              value={formData.fundingGoal}
              onChange={(e) =>
                setFormData({ ...formData, fundingGoal: e.target.value })
              }
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              required
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.modalActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              {program ? "Update" : "Create"} Program
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
