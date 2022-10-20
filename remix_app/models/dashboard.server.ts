export type Data = {
	dashboard_id: string;
	items: Array<ItemType>;
};

export type ItemType = {
	node_id: string;
	title: string;
	data: dataType[];
	component: string;
};

export type dataType =
	| PullRequestType
	| CycleTimeType
	| PeopleType
	| Array<StatisticsType>;

type PullRequestType = {
	data: Number;
	date: string;
};

type CycleTimeType = {
	data: Number;
	date: string;
};

type PeopleType = {
	name: string;
	avatar: string;
};

type StatisticsType = {
	label: string;
	data: string;
};

const setCharAt = (str: string, index: number, chr: string): string => {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
};

export async function getData(): Promise<any> {
	let res = await fetch(
		"https://gist.githubusercontent.com/erdinc/78dbb3faa55342918a2c90ca4f49e095/raw/8a6ba86ce16703de24387d53e49fcfcf455fb6ea/dashboard.json"
	).then((res) => {
		return res.text();
	});

	const barChart = res.search(`"BarChart"`);
	const statisticsBox = res.search(`"StatisticsBox"`);

	//Fixing text file for JSON.parse
	res = setCharAt(res, barChart + 10, "");
	res = setCharAt(res, statisticsBox + 14, "");
	res = JSON.parse(res);

	return res;
}
