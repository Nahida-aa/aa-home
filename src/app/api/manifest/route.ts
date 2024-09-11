/*
 * @Author: kasuie
 * @Date: 2024-05-26 11:51:01
 * @LastEditors: aa
 * @LastEditTime: 2024-06-19 16:10:08
 * @Description:
 */
import { getConfig } from "@/lib/config";
import { NextResponse } from "next/server";

export const revalidate = 0;
// 用于生成并返回一个 Web 应用程序清单（manifest）文件
export const GET = async () => {
  const config = await getConfig("config.json");

  return new NextResponse(
    JSON.stringify({
      name: config.name,
      short_name: config.name,
      theme_color: "#FFFFFF",
      background_color: "#FFFFFF",
      display: "standalone",
      orientation: "portrait",
      start_url: "/",
      icons: [
        {
          src: "/icons/star-64-round.png",
          sizes: "64x64",
          type: "image/png",
          purpose: "any maskable",
        },
        {
          src: "/icons/star-128-round.png",
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: "/icons/star-192-round.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/star-512-round.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    }),
    {
      headers: {
        "Content-Type": "application/manifest+json",
        // 指示浏览器将响应内容作为附件下载，并指定文件名为 manifest.json
        "Content-Disposition": 'attachment; filename="manifest.json"',
      },
    }
  );
};
