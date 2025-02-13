"use client";
import { Program } from "@/types";
import { useState } from "react";

interface ProgramCardProps {
  program: Program;
  onRefresh: () => Promise<void>;
}

export default function ProgramCard({ program, onRefresh }: ProgramCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  // Helper function to format category display with type checking
  const formatCategory = (text: string | undefined): string => {
    if (!text) return "Unknown";
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this program?")) return;

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/programs?id=${program.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await onRefresh();
      } else {
        const data = await response.json();
        setError(data.error || "Failed to delete program");
      }
    } catch (error) {
      setError("Network error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!program) {
    return null;
  }

  return (
    <div className="program-card">
      <h3>{program.name || "Untitled Program"}</h3>
      <div className="program-details">
        <span className="category">
          Category: {formatCategory(program.category)}
        </span>
        <span className="campus">
          Campus: {formatCategory(program.campus_location)}
        </span>
      </div>
      <p className="description">
        {program.description || "No description available"}
      </p>
      {error && <p className="error-message">{error}</p>}
      <div className="card-actions">
        <button className="edit-btn">Edit</button>
        <button
          className="delete-btn"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
