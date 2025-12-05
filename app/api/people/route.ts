import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("people")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching people:", error);
    return NextResponse.json(
      { error: "Failed to fetch people" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, food, drink, dessert } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("people")
      .insert([
        {
          name: name.trim(),
          food: food?.trim() || null,
          drink: drink?.trim() || null,
          dessert: dessert?.trim() || null,
        },
      ])
      .select();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Name already exists" },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    console.error("Error creating person:", error);
    return NextResponse.json(
      { error: "Failed to create person" },
      { status: 500 }
    );
  }
}
