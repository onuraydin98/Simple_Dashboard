import { ChartData, ChartOptions } from "chart.js";
import type { CycleTimeType, ItemType } from "models/dashboard.server";
import React from "react";
import { Line } from "react-chartjs-2";

const MetricBox = ({ data, node_id, title }: ItemType): JSX.Element => {
	data = (data as CycleTimeType[]).sort((a, b) => (a.date > b.date ? 1 : -1));

	//console.log("sorted data", data);

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

	const chartData: ChartData<"line"> = {
		labels: labels,
		datasets: [
			{
				label: "Data",
				data: labels.map((e, idx) => values[idx]),
				backgroundColor: "#FFBB92",
				hoverBackgroundColor: "rgba(255, 187, 146, 0.6)",
			},
		],
	};

	return (
		<div
			className="w-[75vw] min-w-[350px] max-w-[650px] md:w-auto "
			id={node_id}
		>
			<Line options={options} data={chartData} id={"2"} />
		</div>
	);
};

export default MetricBox;
