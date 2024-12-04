import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ChartData } from "chart.js/auto";
import { useContext, useRef, useState } from "react";
import { PostContext } from "../Statistics";
import { Flow } from "@/interface/Flow";

ChartJS.register();

function IncomeAndExpense() {
  const datas = useContext(PostContext) || [];
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

  // Filter and map data safely
  const expenseData = datas
    .filter((row) => row.flow === Flow.Expense)
    .map((row) => row.amount);

  const salesData = datas
    .filter((row) => row.flow === Flow.Sale)
    .map((row) => row.amount);

  const data: ChartData<"bar"> = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Income",
        data: salesData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: expenseData,
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

  const [timeInterval, setTimeInterval] = useState<string>("Daily");

  return (
    <Card>
      <CardHeader>Income and Expense</CardHeader>
      <CardBody>
        <div
          style={{ minHeight: "300px", maxHeight: "400px" }}
          className="d-flex justify-content-center align-items-center"
        >
          {datas.length ? (
            <Bar ref={chartRef} data={data} options={options} />
          ) : (
            <h1 className="">No Data</h1>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-wrap justify-content-between ">
          <Button onClick={download}>Download</Button>
          <Controls
            timeInterval={timeInterval}
            setTimeInterval={setTimeInterval}
          />
        </div>
      </CardFooter>
    </Card>
  );
}

export default IncomeAndExpense;

interface ControlsProps {
  timeInterval: string;
  setTimeInterval: (interval: string) => void;
}

function Controls({ timeInterval, setTimeInterval }: ControlsProps) {
  const timeIntervalOptions = [
    "Daily",
    "Weekly",
    "Monthly",
    "Semi-Annually",
    "Annually",
  ];

  return (
    <ButtonGroup>
      {timeIntervalOptions.map((interval, id) => (
        <ToggleButton
          key={id}
          id={`timeIntervals-${id}`}
          type="radio"
          value={interval}
          checked={interval === timeInterval}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTimeInterval(e.currentTarget.value)
          }
        >
          {interval}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
