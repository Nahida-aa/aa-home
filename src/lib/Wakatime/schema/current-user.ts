interface City {
	id: string;
	name: string;
	ascii_name: string;
	state: string;
	ascii_state: string;
	country_code: string;
	population: number;
	timezone: string;
	country: string;
	title: string;
}

export interface CurrentUserResponse {
	id: string;
	email: string;
	timezone: string;
	timeout: number;
	writes_only: boolean;
	created_at: string;
	modified_at: string;
	is_hireable: boolean;
	last_heartbeat_at: string;
	username: string;
	default_dashboard_range: string;
	photo_public: boolean;
	date_format: string;
	share_last_year_days: boolean;
	github_username: string | null;
	profile_url_escaped: string;
	website: string;
	is_onboarding_finished: boolean;
	durations_slice_by: string;
	display_name: string;
	languages_used_public: boolean;
	bio: string;
	share_all_time_badge: boolean;
	last_project: string;
	needs_payment_method: boolean;
	color_scheme: string;
	human_readable_website: string;
	logged_time_public: boolean;
	last_plugin_name: string;
	location: string | null;
	last_plugin: string;
	invoice_id_format: string;
	public_email: string;
	city: City;
	full_name: string;
	show_machine_name_ip: boolean;
	time_format_24hr: boolean;
	public_profile_time_range: string;
	is_email_public: boolean;
	plan: string;
	twitter_username: string | null;
	meetings_over_coding: boolean;
	photo: string;
	linkedin_username: string | null;
	profile_url: string;
	time_format_display: string;
	weekday_start: number;
	has_premium_features: boolean;
	is_email_confirmed: boolean;
}
