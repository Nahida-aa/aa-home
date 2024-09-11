import { NextRequest, NextResponse } from "next/server";
import { wakatimeStatSkill } from "@/lib/Wakatime/WakaTimeApi";

export const GET = async (req: NextRequest) => {
  try {
    const data = await wakatimeStatSkill();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};