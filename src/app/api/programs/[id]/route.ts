// app/api/programs/[id]/route.ts
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(request: Request, context: RouteParams) {
  const { id } = context.params;

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
      UPDATE Program 
      SET 
        name = $1,
        description = $2,
        category_id = $3,
        funding_goal = $4,
        start_date = $5,
        end_date = $6,
        status = $7
      WHERE id = $8
      RETURNING *
    `,
      [
        name,
        description,
        categoryId,
        fundingGoal,
        startDate,
        endDate,
        status,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to update program" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteParams) {
  const { id } = context.params;

  try {
    const result = await query(
      `
      DELETE FROM Program 
      WHERE id = $1 
      RETURNING *
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to delete program" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, context: RouteParams) {
  const { id } = context.params;

  try {
    const result = await query(
      `
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
      WHERE p.id = $1
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch program" },
      { status: 500 }
    );
  }
}
