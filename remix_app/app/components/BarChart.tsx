import React from "react";
import { Bar } from "react-chartjs-2";
import type { ItemType, PullRequestType } from "../../models/dashboard.server";
import type { ChartData, ChartOptions } from "chart.js";

const BarChart = ({ data, node_id, title }: ItemType): JSX.Element => {
	data = (data as PullRequestType[]).sort((a, b) => (a.date > b.date ? 1 : -1));

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
				labels: {
					color: "#e2e8f0",
				},
			},
			title: {
				display: true,
				text: title,
				color: "#e2e8f0",
			},
		},
		scales: {
			y: {
				min: values[0] - 2,
				max: values[values.length - 1] + 2,
				ticks: { color: "#e2e8f0" },
			},
			x: {
				ticks: { color: "#e2e8f0" },
			},
		},
	};

	const chartData: ChartData<"bar"> = {
		labels: labels,
		datasets: [
			{
				label: "Data",
				data: labels.map((e, idx) => values[idx]),
				backgroundColor: "#0f172a",
				hoverBackgroundColor: "rgba(15, 23, 42, 0.5)",
				barPercentage: 0.3,
				borderRadius: 2,
				minBarLength: 80,
			},
		],
	};

	return (
		<div
			className="w-[90vw] min-w-[350px] hmd:w-auto py-5 hmd:py-0"
			id={node_id}
		>
			<Bar options={options} data={chartData} id={"1"} />
		</div>
	);
};

export default BarChart;
