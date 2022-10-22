import * as React from "react";
import type { ItemType, StatisticsType } from "models/dashboard.server";

const StatisticsBox = ({ data, node_id, title }: ItemType): JSX.Element => {
	const columnStyle = "border-b border-slate-700 p-4 pl-8 text-slate-400 ";

	let dataArray: StatisticsType[] = [];

	dataArray = (data as StatisticsType[])
		.sort((a, b) => (a.label > b.label ? 1 : -1))
		.reverse();

	return (
		<div className="relative rounded-xl overflow-hidden bg-slate-800/50 w-full hmd:w-auto my-5 hmd:my-0">
			<div className="relative rounded-xl overflow-auto">
				<div className="border-b border-slate-700 p-4 pl-8 text-slate-100 font-medium text-left bg-slate-800">
					{title}
				</div>
				<div className="shadow-sm overflow-hidden my-8 hmd:overflow-y-auto hmd:max-h-[22vh]">
					<table className="border-collapse table-auto w-full text-sm ">
						<tbody className="bg-slate-800">
							{dataArray.map((rows, index) => (
								<tr key={rows.label}>
									<td
										align="left"
										className={
											index == 0
												? columnStyle +
												  " border-b font-medium text-slate-200 text-left"
												: columnStyle
										}
									>
										{rows.label}
									</td>
									<td
										align="right"
										className={
											index == 0
												? columnStyle + " border-b font-medium text-slate-200 "
												: columnStyle
										}
									>
										{rows.data}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default StatisticsBox;
