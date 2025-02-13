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
