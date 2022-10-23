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
		"https://api.github.com/gists/78dbb3faa55342918a2c90ca4f49e095"
	).then((res) => {
		return res.json();
	});

	let contentText = res.files["dashboard.json"].content;

	//Fixing text file for JSON.parse, due to unexpected commas in content file.
	const barChart = contentText.search(`"BarChart"`);
	const statisticsBox = contentText.search(`"StatisticsBox"`);

	contentText = setCharAt(contentText, barChart + 10, "");
	contentText = setCharAt(contentText, statisticsBox + 14, "");
	const resultJSON = JSON.parse(contentText);
	
	return resultJSON;
}
