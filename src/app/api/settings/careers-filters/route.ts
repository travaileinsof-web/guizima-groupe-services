import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const SETTING_KEY = "careers_filters";

const defaultFilters = {
  departments: ["Administration", "Commerce", "Logistique", "Construction", "Finance", "IT"],
  locations: ["Conakry", "Kamsar", "Boké", "Kankan"],
  types: ["CDI", "CDD", "Stage", "Consultant", "Freelance"]
};

// GET /api/settings/careers-filters
export async function GET() {
  const setting = await db.setting.findUnique({
    where: { key: SETTING_KEY }
  });

  if (!setting) {
    return NextResponse.json(defaultFilters);
  }

  try {
    return NextResponse.json(JSON.parse(setting.value));
  } catch (err) {
    return NextResponse.json(defaultFilters);
  }
}

// POST /api/settings/careers-filters
export async function POST(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const value = JSON.stringify(body);

    const setting = await db.setting.upsert({
      where: { key: SETTING_KEY },
      update: { value },
      create: { key: SETTING_KEY, value }
    });

    return NextResponse.json(JSON.parse(setting.value));
  } catch (err) {
    console.error("Save filters error:", err);
    return NextResponse.json({ error: "Failed to save filters" }, { status: 500 });
  }
}
