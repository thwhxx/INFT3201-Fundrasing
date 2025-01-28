import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { DonorRow } from "@/types";

export async function GET(request: Request) {
  try {
    const result = await query<DonorRow>(
      "SELECT * FROM donors ORDER BY created_at DESC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, donor_type, email, phone } = await request.json();

    // Validate required fields
    if (!name || !donor_type) {
      return NextResponse.json(
        { error: "Name and donor type are required" },
        { status: 400 }
      );
    }

    const result = await query<DonorRow>(
      `INSERT INTO donors (name, donor_type, email, phone)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
      [name, donor_type, email, phone]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to create donor" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, donor_type, email, phone } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Donor ID is required" },
        { status: 400 }
      );
    }

    const result = await query<DonorRow>(
      `UPDATE donors 
             SET name = $2, donor_type = $3, email = $4, phone = $5, updated_at = CURRENT_TIMESTAMP
             WHERE id = $1
             RETURNING *`,
      [id, name, donor_type, email, phone]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to update donor" },
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
        { error: "Donor ID is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "DELETE FROM donors WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Donor not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Donor deleted successfully" });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to delete donor" },
      { status: 500 }
    );
  }
}
