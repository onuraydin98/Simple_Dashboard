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
				"flex flex-col w-[inherit] items-center md:w-fit md:max-h-[33vh] md:overflow-y-scroll md:pr-4"
			}
			id={node_id}
		>
			<ul className="flex flex-col items-start w-[75vw] md:w-auto font-sans text-sm hmd:text-base">
				{dataArray.map((userRow, index) => (
					<li key={index} className={"flex items-center py-2"}>
						<span className="max-w-[48px]">
							<img
								src={userRow.avatar}
								alt={userRow.name}
								className={"rounded-full"}
							></img>
						</span>
						<div className=" pl-4">{userRow.name}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default PeopleList;
