/*
 * @Author: kasuie
 * @Date: 2024-08-15 23:14:24
 * @LastEditors: kasuie
 * @LastEditTime: 2024-08-17 10:18:39
 * @Description:
 */
import request from "@/lib/fetch";
import { amapApis, oioApis, wakaTimeApis } from "@/constants/api";

const AMAP_KEY = process.env.AMAP_KEY;

export const onAmap = async (key: string, params: Record<string, any> = {}) => {
  if (!AMAP_KEY || !amapApis[key] || !amapApis.base) return null;
  return await request.get(`${amapApis.base}${amapApis[key]}`, {
    ...params,
    key: AMAP_KEY,
  });
};

export const onOio = async (key: string, params: Record<string, any> = {}) => {
  if (!oioApis[key] || !oioApis.base) return null;
  return await request.get(`${oioApis.base}${oioApis[key]}`, {
    ...params,
  });
};

// todo: 待覅修改
export const onWakaTime = async (key: string, params: Record<string, any> = {}) => {
  if (!wakaTimeApis[key] || !wakaTimeApis.base) return null;
  return await request.get(`${wakaTimeApis.base}${wakaTimeApis[key]}`, {
    ...params,
  });
}