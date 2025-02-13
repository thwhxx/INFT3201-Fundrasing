import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(`
      SELECT 
        id,
        name,
        description
      FROM Program_Category
      ORDER BY name ASC
    `);

    return NextResponse.json(result.rows || []);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch program categories" },
      { status: 500 }
    );
  }
}
