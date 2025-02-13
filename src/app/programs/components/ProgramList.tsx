"use client";
import { Program } from "@/types";
import ProgramCard from "./ProgramCard";

interface ProgramListProps {
  programs: Program[];
  onRefresh: () => Promise<void>;
}

export default function ProgramList({ programs, onRefresh }: ProgramListProps) {
  if (!programs?.length) {
    return (
      <div className="no-programs">
        <p>No programs found. Add your first program to get started.</p>
      </div>
    );
  }

  return (
    <div className="program-list">
      {programs.map((program) => (
        <ProgramCard
          key={`program-${program.id}`}
          program={program}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
