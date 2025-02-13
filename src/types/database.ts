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


export type User = {
  id: number;
  email: string;
  password: string;
  first_name: string | null;
  last_name: string | null;
  preferred_name: string | null;
  mobile_phone: string | null;
  business_phone: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  role: 'admin' | 'committee' | 'donor' | null;
  created_at: string;
  updated_at: string;
};

export type DonorType = {
  id: number;
  name: string;
  notes: string | null;
};

export type Donor = {
  id: number;
  user_id: number;
  type_id: number;
  tax_id: string | null;
  approach: string | null;
  engagement_level: string | null;
  total_donations: number;
  created_at: string;
  updated_at: string;
};

export type CommitteeMember = {
  id: number;
  user_id: number;
  position: string | null;
  created_at: string;
  updated_at: string;
};

export type Event = {
  id: number;
  program_id: number;
  event_name: string;
  event_date: string;
  location: string | null;
  description: string | null;
  goals: string | null;
  created_at: string;
  updated_at: string;
};

export type Program = {
  id: number;
  category_id: number;
  name: string;
  description: string | null;
  funding_goal: number;
  current_amount: number;
  start_date: string;
  end_date: string;
  status: string;
};

export type Donation = {
  id: number;
  donor_id: number;
  program_id: number;
  amount: number;
  donation_date: string;
  payment_method: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

// Dashboard specific types
export type DashboardStats = {
  totalPrograms: number;
  activePrograms: number;
  totalFunding: number;
  averageCompletion: number;
  // Additional stats for different roles
  totalDonors?: number;
  recentDonations?: number;
  upcomingEvents?: number;
  committeeMeetings?: number;
};

export type NewsEvent = {
  id: number;
  title: string;
  content: string;
  date: string;
  type: 'news' | 'event';
  program_id?: number;
};

export type DashboardData = {
  stats: DashboardStats;
  recentNews: NewsEvent[];
  upcomingEvents: Event[];
};