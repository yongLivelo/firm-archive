import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { ChartData, Chart as ChartJS } from "chart.js/auto";
import { useRef } from "react";

ChartJS.register();

function CashDistribution() {
  const chartRef = useRef<ChartJS | null>(null);

  const download = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const a = document.createElement("a");
      a.href = url;
      a.download = "cash_distribution_chart.png";
      a.click();
    }
  };

  const data: ChartData<"pie"> = {
    labels: ["Revenue", "Loss"],
    datasets: [
      {
        data: [900, 90],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
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
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader>Cash Distribution</CardHeader>
      <CardBody>
        <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
          <Pie ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={download}>Download</Button>{" "}
      </CardFooter>
    </Card>
  );
}

export default CashDistribution;
