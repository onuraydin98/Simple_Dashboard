import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Data, getData } from "../../models/dashboard.server";
import StatisticsBox from "../components/StatisticsBox";
import MetricBox from "../components/MetricBox";
import PeopleList from "../components/PeopleList";
import BarChart from "../components/BarChart";
import React from "react";

// type LoaderData = {
// 	// this is a handy way to say: "posts is whatever type getPosts resolves to"
// 	dashboardData: Awaited<ReturnType<typeof getData>>;
// };

export const loader = async (): Promise<Array<Data>> => {
	return await getData();
};

export default function Index() {
	const data = useLoaderData<typeof loader>();
	console.log("data", data);
	return (
		<main className="relative min-h-screen bg-red-50 sm:flex sm:items-center sm:justify-center">
			<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
				<h1>Welcome to Remix</h1>
				<BarChart />
				<ul>
					{data.map((e) =>
						e.items.map((itemData, idx) => (
							<li key={"itemdata_" + idx}>
								<div>{itemData.node_id}</div>
								<div>{itemData.title}</div>
								<div>{itemData.component}</div>
							</li>
						))
					)}
				</ul>
			</div>
		</main>
	);
}
