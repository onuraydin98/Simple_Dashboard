export type Data = {
	dashboard_id: string;
	items: Array<ItemType>;
};

export type ItemType = {
	node_id: string;
	title: string;
	data: dataType[];
	component?: string;
};

// Data Types for components
export type dataType =
	| PullRequestType
	| CycleTimeType
	| PeopleType
	| StatisticsType;

export type PullRequestType = {
	data: number;
	date: string;
};

export type CycleTimeType = {
	data: number;
	date: string;
};

export type PeopleType = {
	name: string;
	avatar: string;
};

export type StatisticsType = {
	label: string;
	data: string;
};

const setCharAt = (str: string, index: number, chr: string): string => {
	if (index > str.length - 1) return str;
	return str.substring(0, index) + chr + str.substring(index + 1);
};

export async function getData() {
	let res = await fetch(
		"https://gist.githubusercontent.com/erdinc/78dbb3faa55342918a2c90ca4f49e095/raw/8a6ba86ce16703de24387d53e49fcfcf455fb6ea/dashboard.json"
	).then((res) => {
		return res.text();
	});

	//Fixing text file for JSON.parse
	const barChart = res.search(`"BarChart"`);
	const statisticsBox = res.search(`"StatisticsBox"`);

	res = setCharAt(res, barChart + 10, "");
	res = setCharAt(res, statisticsBox + 14, "");
	res = JSON.parse(res);

	// JSON.parse returning any type that's why function force this type.
	return res as unknown as Array<Data>;
}
