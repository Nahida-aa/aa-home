// src/lib/Wakatime/wakatimeClient.ts

class WakaTimeClient {
  private readonly BASE_URL = 'https://wakatime.com/api/v1';
  private apiKey: string;
  private authHeader: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.authHeader = this.generateAuthHeader(apiKey);
  }

  private generateAuthHeader(apiKey: string): string {
    const encodedApiKey = Buffer.from(apiKey).toString('base64');
    return `Basic ${encodedApiKey}`;
  }

  private async get(endpoint: string, params?: Record<string, any>): Promise<any> {
    const url = new URL(`${this.BASE_URL}${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: this.authHeader,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    return await response.json();
  }

  async getCurrentUser(): Promise<any> {
    return this.get('/users/current');
  }

  async getAllTimeSinceToday(): Promise<any> {
    return this.get('/users/current/all_time_since_today');
  }

  async getSummaries(start: string, end: string, project?: string): Promise<any> {
    const params: Record<string, any> = { start, end };
    if (project) {
      params.project = project;
    }
    return this.get('/users/current/summaries', params);
  }

  async getStats(range?: string, timeout?: number, writes_only?: boolean): Promise<any> {
    const params: Record<string, any> = {};
    if (range) {
      params.range = range;
    }
    if (timeout !== undefined) {
      params.timeout = timeout;
    }
    if (writes_only !== undefined) {
      params.writes_only = writes_only;
    }
    return this.get('/users/current/stats', params)
  }
}

export default WakaTimeClient;