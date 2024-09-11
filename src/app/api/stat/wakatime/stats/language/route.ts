import { NextRequest, NextResponse } from "next/server";
import { wakatimeStatLanguages } from "@/lib/Wakatime/WakaTimeApi";

export const GET = async (req: NextRequest) => {
  try {
    const data = await wakatimeStatLanguages();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
