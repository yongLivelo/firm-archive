import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { ChartData, Chart as ChartJS } from "chart.js/auto";
import { useContext, useRef } from "react";
import { PostContext } from "../Statistics";

ChartJS.register();

function IncomeAndExpense() {
  const datas = useContext(PostContext);
  console.log(datas);
  // Create a reference for the chart instance
  const chartRef = useRef<ChartJS | null | any>(null);

  const download = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const a = document.createElement("a");
      a.href = url;
      a.download = "income_and_expense_chart.png";
      a.click();
    }
  };

  const data: ChartData<"bar"> = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Income",
        data: [200, 300, 400],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: [20, 30, 40],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
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
      <CardHeader>Income and Expense</CardHeader>
      <CardBody>
        <div style={{ height: "400px" }}>
          {/* Bar chart with reference to access chart instance */}
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={download}>Download</Button>{" "}
        {/* Download button triggers chart download */}
      </CardFooter>
    </Card>
  );
}

export default IncomeAndExpense;
