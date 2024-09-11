// app/api/stat/wakatime/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      success: false,
      message: 'API key is not set',
    });
  }

  return NextResponse.json({
    success: true,
    message: 'API key is set',
    apiKey: apiKey, // 在发布时删除这一行
  });
};
