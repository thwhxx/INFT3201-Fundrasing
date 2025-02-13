import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { Program } from "@/types";

export async function GET() {
  try {
    const result = await query<Program>(
      "SELECT * FROM programs ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch programs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, description, campus_location } =
      await request.json();

    // Validate required fields
    if (!name || !category || !campus_location) {
      return NextResponse.json(
        { error: "Name, category, and campus location are required" },
        { status: 400 }
      );
    }

    const result = await query<Program>(
      `INSERT INTO programs (name, category, description, campus_location)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, category, description, campus_location]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create program" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Program ID is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "DELETE FROM programs WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
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
