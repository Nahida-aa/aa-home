// Wakatime/types/stats.ts

export interface CommonStat {
  name: string;
  total_seconds: number;
  percent: number; // 百分占比 0.00 - 100.00 
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
}

export interface StatsResponse {
  id: string;
  user_id: string;
  range: string; // 时间范围=all_time, last_7_days, 7_days, 30_days, 24_hours, 6_hours, 12_hours, custom_range
  timeout: number; // todo
  writes_only: boolean;
  holidays: number; // todo
  status: string; // ok
  categories: CommonStat[];
  percent_calculated: number;
  is_already_updating: boolean;
  daily_average: number; // 每日平均时间 单位秒
  editors: CommonStat[];
  human_readable_daily_average: string; // 人类可读的每日平均时间
  is_up_to_date: boolean;
  days_minus_holidays: number;
  operating_systems: CommonStat[];
  total_seconds: number; // 总时间 单位秒
  total_seconds_including_other_language: number; // 总时间 包括其他语言 s
  is_up_to_date_pending_future: boolean; 
  human_readable_total: string;
  human_readable_total_including_other_language: string;
  languages: CommonStat[];
  daily_average_including_other_language: number;
  human_readable_daily_average_including_other_language: string;
  days_including_holidays: number;
  is_stuck: boolean;
  is_cached: boolean;
  username: string;
  is_including_today: boolean;
  human_readable_range: string;
  is_coding_activity_visible: boolean;
  is_other_usage_visible: boolean;
}