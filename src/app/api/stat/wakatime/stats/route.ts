// src/app/api/stat/wakatime/stats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import WakaTimeClient from '@/lib/Wakatime/WakaTimeClient';

const apiKey = process.env.WAKATIME_API_KEY || '';

const client = new WakaTimeClient(apiKey);

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range');
  const timeout = searchParams.get('timeout');
  const writes_only = searchParams.get('writes_only');

  try {
    const data = await client.getStats(
      range || undefined,
      timeout ? parseInt(timeout, 10) : undefined,
      writes_only === 'true'
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}