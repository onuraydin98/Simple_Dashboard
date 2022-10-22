import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Data, ItemType } from "../../models/dashboard.server";
import { getData } from "../../models/dashboard.server";
import StatisticsBox from "../components/StatisticsBox";
import MetricBox from "../components/MetricBox";
import PeopleList from "../components/PeopleList";
import BarChart from "../components/BarChart";
import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	LineElement,
	BarElement,
	Title,
	Tooltip,
	Legend,
	PointElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export const loader = async (): Promise<Array<Data>> => {
	return await getData();
};

//

const components: [string, (item: ItemType) => JSX.Element][] = [
	["BarChart", BarChart],
	["StatisticsBox", StatisticsBox],
	["MetricBox", MetricBox],
	["PeopleList", PeopleList],
];

const matchFunction = (itemData: ItemType): JSX.Element | null => {
	let pair = components.find(([label, Comp]) => {
		return label == itemData.component;
	});

	// Type escaping
	if (!pair) return null;

	let [, Comp] = pair;

	// Dynamically
	return (
		<Comp
			node_id={itemData.node_id}
			title={itemData.title}
			data={itemData.data}
		/>
	);
};

export default function Index() {
	const data = useLoaderData() as Data[];
	console.log("data", data);

	return (
		<main className="relative min-h-screen flex items-center justify-center w-[98vw]">
			{" "}
			{/*w-screen not used here cuz of empty blank space occuring in responsive design */}
			<div className="flex justify-center w-full p-5">
				<div className="flex flex-col items-center w-full hmd:grid hmd:grid-cols-2 hmd:gap-8 hmd:px-5">
					{data.map((e) =>
						e.items.map((itemData, idx) => {
							return matchFunction(itemData);
						})
					)}
				</div>
			</div>
		</main>
	);
}
