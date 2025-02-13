export interface DonorRow {
  donorId: number;
  firstName: string;
  lastName: string;
  email: string;
  donorType: string;
  taxId?: string;
  engagementLevel: string;
  approach?: string;
  totalDonations: string;
  lastContactDate: string;
}

export interface DonorStatsRow {
  total_donors: string;
  total_donations: string;
  avg_donation_amount: string;
  active_engagement_percentage: string;
}

export interface ProgramRow {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  fundingGoal: string;
  currentAmount: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface ProgramStats {
  totalPrograms: number;
  activePrograms: number;
  totalFunding: number;
  averageCompletion: number;
}
