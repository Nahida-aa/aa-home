/*
 * @Author: kasuie
 * @Date: 2024-08-15 22:20:32
 * @LastEditors: aa
 * @LastEditTime: 2024-08-16 14:56:57
 * @Description:
 */
export type AmapApisKey = typeof amapApis;
export type OioApisKey = typeof oioApis;
// Record<string, string> 是 TypeScript 中的一个实用类型，用于定义一个键为字符串、值也为字符串的对象
export const amapApis: Record<string, string> = {
  base: "https://restapi.amap.com",
  weather: "/v3/weather/weatherInfo",
  ip: "/v3/ip",
};

export const oioApis: Record<string, string> = {
  base: "https://api.oioweb.cn",
  weather: "/api/weather/GetWeather",
};

// wakaTime
export const wakaTimeApis: Record<string, string> = {
  base: "https://api.wakatime.com",
  // The total time logged since account created, available even for Free accounts.
  all_time_since_today: "/api/v1/users/:user/all_time_since_today",
  all_time_since_today1: "/api/v1/users/current/all_time_since_today",
};
export type WakaTimeApisKey = typeof wakaTimeApis;