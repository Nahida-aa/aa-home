import { AllTimeSinceTodayResponse } from './all-time-since-today';
import { CurrentUserResponse } from './current-user';

/**
 * Represents the time range options for retrieving WakaTime stats.
 */
export enum TimeRange {
	Last7Days = 'last_7_days',
	Last30Days = 'last_30_days',
	Last6Months = 'last_6_months',
	LastYear = 'last_year',
	AllTime = 'all_time',
}

/**
 * Represents the insight types for retrieving WakaTime insights.
 */
export enum InsightType {
	Weekday = 'weekday',
	Days = 'days',
	BestDay = 'best_day',
	DailyAverage = 'daily_average',
	Projects = 'projects',
	Languages = 'languages',
	Editors = 'editors',
	Categories = 'categories',
	Machines = 'machines',
	OperatingSystems = 'operating_systems',
}

/**
 * Represents the query parameters for the WakaTime API.
 */
export interface APIQuery {
	start?: string;
	end?: string;
	date?: string;
}

/**
 * Represents the date range for retrieving WakaTime summaries.
 */
export interface CustomTimeRange {
	start: string | Date;
	end: string | Date;
}

export type APIResponse =
	| AllTimeSinceTodayResponse
	| CurrentUserResponse;
