"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const useGetData = () => {
  const [chartData, setChartData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    console.log("fetched data");
    const response = await axios.get(
      "https://api.coindesk.com/v1/bpi/currentprice.json"
    );
    const data = response.data;
    setChartData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const fetchInterval = setInterval(() => {
      getData();
    }, 5000);
    return () => clearInterval(fetchInterval);
  }, []);

  return { chartData, loading };
};

export default useGetData;
