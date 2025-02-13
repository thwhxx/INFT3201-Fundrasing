export interface Donor {
  donorId: number;
  firstName: string;
  lastName: string;
  email: string;
  donorType: string;
  organizationName?: string;
  totalDonations: number;
  engagementLevel: string;
  lastContactDate: string;
}

export interface Program {
  id: number;
  name: string;
  category:
    | "energy_research"
    | "education_research"
    | "undergraduate"
    | "graduate";
  description: string;
  campus_location: "main" | "downtown" | "east" | "west";
  created_at?: string;
  updated_at?: string;
}

export interface ProgramFormData {
  name: string;
  category: Program["category"];
  description: string;
  campus_location: Program["campus_location"];
}
