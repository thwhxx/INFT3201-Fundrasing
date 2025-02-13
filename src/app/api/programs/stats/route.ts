import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        COUNT(*)::text as total_programs,
        COUNT(CASE WHEN status = 'Active' THEN 1 END)::text as active_programs,
        COALESCE(SUM(funding_goal)::text, '0') as total_funding,
        CASE 
          WHEN COUNT(*) > 0 THEN 
            (AVG(CASE 
              WHEN funding_goal > 0 
              THEN (current_amount * 100.0 / funding_goal)
              ELSE 0 
            END))::text
          ELSE '0'
        END as average_completion
      FROM Program
    `);

    if (!result.rows?.[0]) {
      return NextResponse.json({
        totalPrograms: 0,
        activePrograms: 0,
        totalFunding: 0,
        averageCompletion: 0,
      });
    }

    const stats = result.rows[0];
    return NextResponse.json({
      totalPrograms: parseInt(stats.total_programs) || 0,
      activePrograms: parseInt(stats.active_programs) || 0,
      totalFunding: parseFloat(stats.total_funding) || 0,
      averageCompletion: parseFloat(stats.average_completion) || 0,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch program statistics" },
      { status: 500 }
    );
  }
}
