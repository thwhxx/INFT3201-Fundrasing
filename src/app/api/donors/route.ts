import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { DonorRow } from "@/types/database";

export async function GET() {
  try {
    const result = await query<DonorRow>(`
      SELECT 
        d.id as "donorId",
        u.first_name as "firstName",
        u.last_name as "lastName",
        u.email as "email",
        dt.name as "donorType",
        d.tax_id as "taxId",
        d.engagement_level as "engagementLevel",
        d.approach as "approach",
        COALESCE(d.total_donations, 0)::text as "totalDonations",
        COALESCE(
          (SELECT MAX(donation_date)::text 
           FROM Donations 
           WHERE donor_id = d.id),
          d.created_at::text
        ) as "lastContactDate"
      FROM Donors d
      LEFT JOIN Users u ON d.user_id = u.id
      LEFT JOIN Donor_Type dt ON d.type_id = dt.id
      ORDER BY d.total_donations DESC NULLS LAST
    `);

    // Ensure we always return an array
    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}
