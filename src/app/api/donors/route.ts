import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { DonorRow } from '@/types/database';

export async function GET() {
  try {
    const result = await query<DonorRow>(`
      SELECT 
        d.donor_id as "donorId",
        u.first_name as "firstName",
        u.last_name as "lastName",
        u.email as "email",
        dt.type_name as "donorType",
        d.organization_name as "organizationName",
        d.engagement_level as "engagementLevel",
        d.last_contact_date as "lastContactDate",
        COALESCE(SUM(don.amount)::text, '0') as "totalDonations"
      FROM donors d
      JOIN users u ON d.user_id = u.user_id
      JOIN donor_types dt ON d.donor_type_id = dt.donor_type_id
      LEFT JOIN donations don ON d.donor_id = don.donor_id
      GROUP BY 
        d.donor_id, 
        u.first_name, 
        u.last_name, 
        u.email, 
        dt.type_name,
        d.organization_name,
        d.engagement_level,
        d.last_contact_date
      ORDER BY sum(COALESCE(don.amount, 0)) DESC NULLS LAST
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donors' },
      { status: 500 }
    );
  }
}