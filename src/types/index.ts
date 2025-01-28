import { QueryResultRow } from "pg";

export interface DonorRow extends QueryResultRow {
  id: number;
  name: string;
  donor_type: "individual" | "private_foundation" | "corporation";
  email: string | null;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ProgramRow extends QueryResultRow {
  id: number;
  name: string;
  category:
    | "energy_research"
    | "education_research"
    | "undergraduate"
    | "graduate";
  description: string | null;
  campus_location: "main" | "downtown" | "east" | "west";
  created_at: Date;
}

export interface DonationRow extends QueryResultRow {
  id: number;
  donor_id: number;
  program_id: number;
  amount: number;
  date: Date;
  committee_member_id: number;
  notes: string | null;
  created_at: Date;
}

export interface CommitteeMemberRow extends QueryResultRow {
  id: number;
  name: string;
  email: string;
  role: string | null;
  created_at: Date;
}

export interface QuarterlyTargetRow extends QueryResultRow {
  id: number;
  committee_member_id: number;
  program_id: number;
  target_amount: number;
  year: number;
  quarter: number;
  created_at: Date;
}
