import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { food, drink, dessert } = body;

    const updates: any = {};
    if (food !== undefined) updates.food = food?.trim() || null;
    if (drink !== undefined) updates.drink = drink?.trim() || null;
    if (dessert !== undefined) updates.dessert = dessert?.trim() || null;

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from("people")
      .update(updates)
      .eq("id", params.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Error updating person:", error);
    return NextResponse.json(
      { error: "Failed to update person" },
      { status: 500 }
    );
  }
}
