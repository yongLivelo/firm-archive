import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useRef } from "react";

ChartJS.register();

function CashFlow() {
  // Define chartRef with correct type for Chart.js instance
  const chartRef = useRef<ChartJS | null>(null);

  // Function to download chart as PNG
  const download = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image(); // Get chart image as base64
      const a = document.createElement("a");
      a.href = url;
      a.download = "chart.png"; // Set the name of the file to download
      a.click(); // Trigger the download
    }
  };

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [400, 300, 500, 700, 600, 800],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // for smooth curves
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Sales Over Time",
      },
    },
  };

  return (
    <Card>
      <CardHeader>Cash Flow</CardHeader>
      <CardBody>
        <div style={{ height: "700px" }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={download}>Download</Button>
      </CardFooter>
    </Card>
  );
}

export default CashFlow;
