"use client";

import { useEffect, useState } from "react";
import useGetData from "@/hooks/useGetData";
import Loading from "../Loading";
import TableHead from "./TableHead";

const CoinTable = () => {
  const { loading, chartData } = useGetData();
  const [data, setData] = useState(chartData?.bpi || {});
  const [currentFilter, setCurrentFilter] = useState("code");

  const searchData = (searchValue) => {
    const bpi = chartData?.bpi;
    let searchedData = {};

    // search for the value
    for (const key in bpi) {
      if (
        bpi[key][currentFilter].toString().toLowerCase().includes(searchValue)
      ) {
        searchedData[key] = bpi[key];
      }
    }
    setData(searchedData);
  };

  const sortData = (sort) => {
    // Convert inner objects to an array
    const dataArray = Object.values(chartData?.bpi);

    // Sort the array
    dataArray.sort((a, b) => {
      if (typeof a[currentFilter] === "number") {
        return sort === "asc"
          ? a[currentFilter] - b[currentFilter]
          : b[currentFilter] - a[currentFilter];
      } else {
        return sort === "asc"
          ? a[currentFilter].localeCompare(b[currentFilter])
          : b[currentFilter].localeCompare(a[currentFilter]);
      }
    });

    // add the sorted array to an object
    const sortedData = {};
    dataArray.forEach((item) => {
      sortedData[item.code] = item;
    });

    setData(sortedData);
  };

  // update data when chartData changes
  useEffect(() => {
    if (chartData) setData(chartData?.bpi);
  }, [chartData]);

  return (
    <div className="basis-1/2 flex flex-col shadow-box-shadow bg-white h-fit min-h-[400px] px-6 items-center justify-center">
      {loading ? (
        <Loading />
      ) : (
        <table className="min-w-full text-left text-sm font-light">
          <caption className="text-start  py-4 border-b border-neutral-200">
            <h3 className="text-xl font-bold ">Bitcoin Price Table</h3>
          </caption>
          <thead className="border-b font-medium">
            <tr className="flex-col sm:flex-row">
              <TableHead
                title={"Code"}
                filterKey="code"
                searchData={searchData}
                sortData={sortData}
                setCurrentFilter={setCurrentFilter}
                currentFilter={currentFilter}
              />
              <TableHead
                title={"Rate"}
                filterKey="rate_float"
                searchData={searchData}
                sortData={sortData}
                setCurrentFilter={setCurrentFilter}
                currentFilter={currentFilter}
              />
              <TableHead
                title={"Description"}
                filterKey="description"
                searchData={searchData}
                sortData={sortData}
                setCurrentFilter={setCurrentFilter}
                currentFilter={currentFilter}
              />
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key) => (
              <tr key={key}>
                <td className="px-6 py-4">{chartData.bpi[key].code}</td>
                <td className="px-6 py-4">{chartData.bpi[key].rate_float}</td>
                <td className="px-6 py-4">{chartData.bpi[key].description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CoinTable;
