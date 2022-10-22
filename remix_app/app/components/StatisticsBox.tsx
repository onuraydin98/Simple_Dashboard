import * as React from "react";
import type { ItemType, StatisticsType } from "models/dashboard.server";

const StatisticsBox = ({ data, node_id, title }: ItemType): JSX.Element => {
	const rowStyle = "inline-flex justify-between w-full";

	let dataArray: StatisticsType[] = [];

	dataArray = (data as StatisticsType[])
		.sort((a, b) => (a.label > b.label ? 1 : -1))
		.reverse();

	return (
		<div
			className="flex flex-col w-full py-2 border-collapse overflow-hidden shadow-[rgba(0,0,0,0.1)]"
			id={node_id}
		>
			<table className=" border-collapse bg-white rounded-lg">
				<thead>
					<tr>
						<th className="text-black py-5">{title}</th>
					</tr>
				</thead>

				<tbody className={" divide-y-[1px] divide-slate-400 contents"}>
					{dataArray.map((rows, index) => (
						<tr
							key={rows.label}
							className={index == 0 ? rowStyle + " font-bold" : rowStyle}
						>
							<td align="left">{rows.label}</td>
							<td align="right">{rows.data}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StatisticsBox;
