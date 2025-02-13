import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { DonorStatsRow } from "@/types/database";

export async function GET() {
  try {
    const result = await query<DonorStatsRow>(`
      WITH donor_stats AS (
        SELECT 
          COUNT(DISTINCT d.user_id)::text as total_donors,
          COALESCE(SUM(d.total_donations)::text, '0') as total_donations,
          CASE 
            WHEN COUNT(DISTINCT d.user_id) > 0 
            THEN (COALESCE(SUM(d.total_donations), 0) / COUNT(DISTINCT d.user_id))::text
            ELSE '0'
          END as avg_donation_amount,
          COALESCE(
            (COUNT(DISTINCT CASE WHEN d.engagement_level = 'High' THEN d.user_id END) * 100.0 / 
            NULLIF(COUNT(DISTINCT d.user_id), 0))::text,
            '0'
          ) as active_engagement_percentage
        FROM Donors d
      )
      SELECT 
        total_donors,
        total_donations,
        avg_donation_amount,
        active_engagement_percentage
      FROM donor_stats
    `);

    if (!result.rows?.[0]) {
      return NextResponse.json({
        totalDonors: 0,
        totalDonations: 0,
        avgDonationAmount: 0,
        activeEngagement: 0,
      });
    }

    const stats = result.rows[0];
    return NextResponse.json({
      totalDonors: parseInt(stats.total_donors) || 0,
      totalDonations: parseFloat(stats.total_donations) || 0,
      avgDonationAmount: parseFloat(stats.avg_donation_amount) || 0,
      activeEngagement: parseFloat(stats.active_engagement_percentage) || 0,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch donor statistics" },
      { status: 500 }
    );
  }
}
