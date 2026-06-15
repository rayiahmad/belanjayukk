"use client";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
  }>;
}
const chartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true, // Mengubah kotak menjadi bulat
          pointStyle: 'circle', // Membuat label berbentuk bulat
        },
      },
    },
  };

const DonutChart = ({ chartData }: { chartData: ChartData }) => {
  return (
    <div className="w-[280px] h-[320px] bg-white p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Best Selling Categories</h2>
      <Pie data={chartData} options={chartOptions}/>
    </div>
  );
};

export default DonutChart;
