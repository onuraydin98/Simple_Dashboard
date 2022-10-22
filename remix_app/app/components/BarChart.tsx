import React from "react";

import { Bar } from "react-chartjs-2";
import type { ItemType, PullRequestType } from "../../models/dashboard.server";
import type { ChartData, ChartOptions } from "chart.js";

const BarChart = ({ data, node_id, title }: ItemType): JSX.Element => {
	data = (data as PullRequestType[]).sort((a, b) => (a.date > b.date ? 1 : -1));

	//console.log("sorted data", data);

	const values: number[] = [];
	let labels = data.map((datum) => {
		if ("date" in datum) {
			values.push(datum.data);
			return datum.date;
		}
		return [];
	});

	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: title,
			},
		},
		scales: {
			y: {
				min: values[0] - 2,
				max: values[values.length - 1] + 2,
			},
		},
	};

	const chartData: ChartData<"bar"> = {
		labels: labels,
		datasets: [
			{
				label: "Data",
				data: labels.map((e, idx) => values[idx]),
				backgroundColor: "#FFBB92",
				barPercentage: 0.3,
				hoverBackgroundColor: "rgba(255, 187, 146, 0.6)",
				borderRadius: 2,
				minBarLength: 80,
			},
		],
	};

	return (
		<div
			className="w-[75vw] min-w-[350px] max-w-[650px] md:w-auto "
			id={node_id}
		>
			<Bar options={options} data={chartData} id={"1"} />
		</div>
	);
};

export default BarChart;
