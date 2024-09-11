import WakaTimeClient from "./WakaTimeClient";
import { CommonStat } from "./types";

const client = new WakaTimeClient(process.env.WAKATIME_API_KEY || '');
// 拿到 language 的统计数据 前 n 个 默认为全部
export const wakatimeStatLanguages = async (n = -1) => {
	const data = await client.getStats();
	const languages = data.data.languages;
	return n === -1 ? languages : languages.slice(0, n);
}
// 从languages 取出 展示技能点的数据， 参数: n, transform_func
export const wakatimeStatSkill = async (
  n = 24,
  transform_func: (x: string | number) => number = (x) => Math.min(Math.log(Number(x) + 1) * 14, 100) // 默认转换函数
) => {
	const languages = await wakatimeStatLanguages(n);
	const skills = languages.map((language: CommonStat) => {
		return {
			title: language.name,
			value: transform_func(language.decimal),
			time: language.text,
		};
	});
	return skills;
}

export const wakatimeCurrentUser = async () => {
	const data = await client.getCurrentUser();
	return data;
}
