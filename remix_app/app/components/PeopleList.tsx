import * as React from "react";

import type { ItemType, PeopleType } from "models/dashboard.server";

const PeopleList = ({ data, node_id, title }: ItemType): JSX.Element => {
	let dataArray: PeopleType[] = [];

	dataArray = (data as PeopleType[])
		.sort((a, b) => (a.name > b.name ? 1 : -1))
		.reverse();

	return (
		<div
			className={
				"grid grid-cols-3 gap-1 mobile:grid-cols-2   xl:grid-cols-4 xl:gap-1 items-center hmd:w-fit hmd:max-h-[33vh] hmd:overflow-y-auto hmd:pr-4 py-5 hmd:py-0"
			}
			id={node_id}
		>
			{dataArray.map((userRow, index) => (
				<div
					key={index}
					className={"py-2 px-2 w-full rounded-t-lg border-gray-600 "}
				>
					<button
						type="button"
						className=" min-w-[110px] inline-flex relative items-center py-2 px-2 w-full text-sm font-medium rounded-lg border border-gray-600 hover:bg-gray-600 hover:text-white focus:ring-gray-500 focus:text-white"
					>
						<span className="w-[36px] mr-2">
							<img
								src={userRow.avatar}
								alt={userRow.name}
								className={"rounded-full"}
							></img>
						</span>
						{userRow.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default PeopleList;
