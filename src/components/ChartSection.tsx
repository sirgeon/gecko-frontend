"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartSection() {
  // set mock data first
  const [chartData, setChartData] = useState({
    labels: [
      "00:00",
      "00:10",
      "00:20",
      "00:30",
      "00:40",
      "00:50",
      "01:00",
      "01:10",
      "01:20",
      "01:30",
      "01:40",
      "01:50",
      "02:00",
      "02:10",
      "02:20",
      "02:30",
      "02:40",
      "02:50",
      "03:00",
    ],
    datasets: [
      {
        label: "Temperature (°C)",
        data: [
          22, 23, 22.5, 24, 23.5, 23, 22.8, 23.2, 24, 23.7, 23.3, 22.9, 23.1,
          22.7, 23, 23.5, 23.8, 23.2, 22.6,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Humidity (%)",
        data: [
          45, 50, 48, 52, 50, 49, 47, 48, 51, 50, 48, 47, 49, 48, 50, 51, 50,
          49, 48,
        ],
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  });

  const retrieveEnvironmentalData = async () => {
    try {
      const response = await axios.get(
        "https://gecko-api.vegewa.dev/environmental_data"
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function writeEnvironmentalDataToChart() {
      const fetchedData: any = await retrieveEnvironmentalData();
      const dataArray = fetchedData.data;

      const results = [];

      const firstTimestamp = parseInt(dataArray[0].timestamp.$date.$numberLong);
      const lastTimestamp = parseInt(
        dataArray[dataArray.length - 1].timestamp.$date.$numberLong
      );

      let currentTimestamp = firstTimestamp;
      const interval = 60 * 1000;

      while (currentTimestamp <= lastTimestamp) {
        const closestDataPoint = dataArray.reduce(
          (
            closest: { timestamp: { $date: { $numberLong: string } } },
            dataPoint: { timestamp: { $date: { $numberLong: string } } }
          ) => {
            const timestamp = parseInt(dataPoint.timestamp.$date.$numberLong);
            const closestTimestamp = parseInt(
              closest.timestamp.$date.$numberLong
            );

            const diffCurrent = Math.abs(timestamp - currentTimestamp);
            const diffClosest = Math.abs(closestTimestamp - currentTimestamp);

            return diffCurrent < diffClosest ? dataPoint : closest;
          }
        );

        const timestampCEST = new Date(currentTimestamp).toLocaleString(
          "en-US",
          {
            timeZone: "Europe/Paris",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }
        );

        results.push({
          timestamp: timestampCEST,
          temperature: closestDataPoint.temperature,
          humidity: closestDataPoint.humidity,
        });

        currentTimestamp += interval;
      }

      let newData = {
        labels: results.map((e) => e.timestamp),
        datasets: [
          {
            label: "Temperature (°C)",
            data: results.map((e) => e.temperature),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
          },
          {
            label: "Humidity (%)",
            data: results.map((e) => e.humidity),
            borderColor: "rgba(153, 102, 255, 1)",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      };
      setChartData(newData);
    }

    setInterval(() => {
      writeEnvironmentalDataToChart();
    }, 1000);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: 700,
            family: "IBM Plex Mono, monospace",
          },
        },
      },
      title: {
        display: true,
        text: "Temperature and humidity readings",
        color: "#333",
        font: {
          size: 18,
          weight: 700,
          family: "IBM Plex Mono, monospace",
        },
      },
      tooltip: {
        enabled: true,
        mode: "index" as const,
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ddd",
        borderWidth: 1,
        titleFont: {
          family: "IBM Plex Mono, monospace",
          size: 14,
          weight: 700,
        },
        bodyFont: {
          family: "IBM Plex Mono, monospace",
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          font: {
            family: "IBM Plex Mono, monospace",
          },
        },
      },
      y: {
        grid: {
          color: "#eee",
        },
        ticks: {
          color: "#333",
          font: {
            family: "IBM Plex Mono, monospace",
          },
        },
        title: {
          display: true,
          text: "Value",
          color: "#333",
          font: {
            size: 14,
            weight: 700,
            family: "IBM Plex Mono, monospace",
          },
        },
      },
    },
  };

  return (
    <div id="environment" className="mt-[100px] pt-[100px] border-t">
      <h2 className="text-3xl font-bold text-center mb-4">
        Environmental Data
      </h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        Monitoring temperature and humidity levels to ensure optimal conditions.
      </p>
      <section className="max-w-[1000px] mx-auto border mt-16 p-8 bg-white rounded-lg">
        <div style={{ position: "relative", height: "60vh" }}>
          <Line data={chartData} options={options} />
        </div>
      </section>
    </div>
  );
}
