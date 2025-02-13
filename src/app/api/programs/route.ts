import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { ProgramRow } from "@/types/database";

// GET all programs
export async function GET() {
  try {
    const result = await query<ProgramRow>(`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.category_id as "categoryId",
        pc.name as "categoryName",
        p.funding_goal::text as "fundingGoal",
        p.current_amount::text as "currentAmount",
        p.start_date::text as "startDate",
        p.end_date::text as "endDate",
        p.status
      FROM Program p
      LEFT JOIN Program_Category pc ON p.category_id = pc.id
      ORDER BY p.start_date DESC
    `);

    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

// POST new program
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      categoryId,
      fundingGoal,
      startDate,
      endDate,
      status,
    } = body;

    const result = await query(
      `
      INSERT INTO Program (
        name, 
        description, 
        category_id, 
        funding_goal, 
        current_amount,
        start_date, 
        end_date, 
        status
      ) VALUES (
        $1, $2, $3, $4, 0, $5, $6, $7
      ) RETURNING *
    `,
      [name, description, categoryId, fundingGoal, startDate, endDate, status]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    );
  }
}
