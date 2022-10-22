import type { ChartData, ChartOptions } from "chart.js";
import type { CycleTimeType, ItemType } from "models/dashboard.server";
import React from "react";
import { Line } from "react-chartjs-2";

const MetricBox = ({ data, node_id, title }: ItemType): JSX.Element => {
	data = (data as CycleTimeType[]).sort((a, b) => (a.date > b.date ? 1 : -1));

	const values: number[] = [];
	const labels = data.map((datum) => {
		if ("date" in datum) {
			values.push(datum.data);
			return datum.date;
		}
		return [];
	});

	const options: ChartOptions<"line"> = {
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

	const chartData: ChartData<"line"> = {
		labels: labels,
		datasets: [
			{
				label: "Data",
				data: labels.map((e, idx) => values[idx]),
				backgroundColor: "#0f172a",
				hoverBackgroundColor: "rgba(15, 23, 42, 0.5)",
			},
		],
	};

	return (
		<div
			className="w-[90vw] min-w-[350px] hmd:w-auto py-5 hmd:py-0"
			id={node_id}
		>
			<Line options={options} data={chartData} id={"2"} />
		</div>
	);
};

export default MetricBox;
