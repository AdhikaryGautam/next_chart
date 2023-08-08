"use client";

import Chart from "@/components/Chart/Chart";
import CoinTable from "@/components/Table/CoinTable";
import useGetData from "@/hooks/useGetData";

// hide warning about defaultProps in recharts
const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function Home() {
  const { loading, chartData } = useGetData();

  return (
    <main className="flex min-h-screen p-5 lg:p-24 bg-background text-slate-900 gap-x-4 flex-col lg:flex-row">
      <Chart loading={loading} chartData={chartData} />
      <CoinTable loading={loading} chartData={chartData} />
    </main>
  );
}
