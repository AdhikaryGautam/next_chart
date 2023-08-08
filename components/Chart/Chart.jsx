"use client";

import useGetData from "@/hooks/useGetData";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Loading from "../Loading";

// hide warning about defaultProps in recharts
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

// convert the data to an array
const formatData = (data) => {
  const dataArray = Object.keys(data).map((key) => ({
    name: data[key].code,
    rate: data[key].rate_float,
  }));
  return dataArray;
};

const Chart = () => {
  const { chartData, loading } = useGetData();

  let data = [];
  if (chartData) {
    data = formatData(chartData.bpi);
  }

  return (
    <section className="basis-1/2 bg-white shadow-box-shadow h-[450px] w-full py-6 px-6 mb-6 lg:mb-0">
      <h2 className="text-xl font-bold mb-8 border-b border-neutral-200 pb-4 ">
        Bitcoin Price Index
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ bottom: 50 }}
          >
            <YAxis />
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="rate" barSize={30} fill="#613DE6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
};

export default Chart;
