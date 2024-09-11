/*
 * @Author: kasuie
 * @Date: 2024-06-29 11:58:25
 * @LastEditors: aa
 * @LastEditTime: 2024-06-30 11:41:52
 * @Description:
 */
import { getConfig } from "@/lib/config";
import { Decrypt } from "@/lib/utils";
import { dateFormat } from "@kasuie/utils";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

// 将响应内容作为名为 config(v_${time}).json 的附件下载
export const GET = async (req: NextRequest) => {
  const accessToken = req.cookies.get("accessToken");
  if (accessToken?.value) {
    const password = Decrypt(accessToken.value, process.env.PASSWORD);
    if (password === process.env.PASSWORD) {
      const time = dateFormat(new Date(), "YYYY-MM-DD_HH-mm-ss");
      const config = await getConfig("config.json", true);
      const headers = new Headers();
      // 指示浏览器将响应内容作为附件下载，并指定文件名为 config(v_${time}).json
      headers.append(
        "Content-Disposition",
        `attachment; filename=config(v_${time}).json`
      );
      headers.append("Content-Type", "application/json");
      // 响应json，另外前面设置过headers，浏览器会自动下载文件
      return new NextResponse(JSON.stringify(config, null, 2), {
        headers,
      });
    } else {
      return new NextResponse("fail", {
        status: 403,
      });
    }
  } else {
    return new NextResponse("fail", {
      status: 403,
    });
  }
};