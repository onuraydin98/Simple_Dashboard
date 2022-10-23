import { LoaderFunction } from "@remix-run/node";
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

// For charts, registering
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

export const loader: LoaderFunction = async () => {
  // json function provided by remix.js is not used here due to the modifications has been made in response file.
  return await getData();
};

// Components List
const components: [string, (item: ItemType) => JSX.Element][] = [
  ["BarChart", BarChart],
  ["StatisticsBox", StatisticsBox],
  ["MetricBox", MetricBox],
  ["PeopleList", PeopleList],
];

const matchComponents = (itemData: ItemType): JSX.Element | null => {
  let pair = components.find(([label, Node]) => {
    return label == itemData.component;
  });

  // Null condition check
  if (!pair) return null;

  let [, Node] = pair;

  // Selecting components
  return (
    <Node
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
        <div className="flex flex-col items-center hmd:items-baseline w-full hmd:grid hmd:grid-cols-2 hmd:gap-8 hmd:px-5">
          {data.map((e) =>
            e.items.map((itemData, idx) => (
              <div key={idx} className="w-full">
                {matchComponents(itemData)}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
