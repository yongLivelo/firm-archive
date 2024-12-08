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
import { useContext, useRef, useState, useEffect } from "react";
import { PostContext } from "../Statistics";
import { Flow } from "@/interface/Flow";

ChartJS.register();

function IncomeAndExpense() {
  const datas = useContext(PostContext) || [];
  const chartRef = useRef<ChartJS | null | any>(null);
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expense",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  });

  const download = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const a = document.createElement("a");
      a.href = url;
      a.download = "income_and_expense_chart.png";
      a.click();
    }
  };

  const groupDataByInterval = (interval: string) => {
    if (!datas) return;

    const groupByTime: { [key: string]: [number, number] } = datas?.reduce(
      (acc: { [key: string]: [number, number] }, entry) => {
        let key: string;
        switch (interval) {
          case "Monthly":
            key = entry.date.slice(0, 7);
            break;
          case "Semi-Annually":
            const month = new Date(entry.date).getMonth();
            const year = entry.date.slice(0, 4);
            key = `${year}-H${month < 6 ? "1" : "2"}`;
            break;
          case "Yearly":
            key = entry.date.slice(0, 4);
            break;
          default:
            key = entry.date.slice(0, 7);
            break;
        }

        if (!acc[key]) {
          acc[key] = [0, 0];
        }

        if (entry.flow === Flow.Sale) {
          acc[key][0] += entry.amount;
        } else if (entry.flow === Flow.Expense) {
          acc[key][1] += entry.amount;
        }

        return acc;
      },
      {}
    );

    const sortedGroupByTime = Object.entries(groupByTime).sort(
      ([keyA], [keyB]) => keyA.localeCompare(keyB)
    );

    const labels = sortedGroupByTime.map(([date]) => date);
    const incomeData = sortedGroupByTime.map(([, [sales]]) => sales);
    const expenseData = sortedGroupByTime.map(([, [, expenses]]) => expenses);

    setData({
      labels: labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
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
    });
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

  const [timeInterval, setTimeInterval] = useState<string>("Monthly");

  useEffect(() => {
    groupDataByInterval(timeInterval);
  }, [timeInterval]);

  return (
    <Card>
      <CardHeader>Income and Expense</CardHeader>
      <CardBody>
        <div
          style={{ minHeight: "300px", maxHeight: "400px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-wrap justify-content-between">
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

// Controls Component
interface ControlsProps {
  timeInterval: string;
  setTimeInterval: (interval: string) => void;
}

function Controls({ timeInterval, setTimeInterval }: ControlsProps) {
  const timeIntervalOptions = ["Monthly", "Semi-Annually", "Yearly"];

  return (
    <ButtonGroup className="d-flex justify-content-between flex-wrap">
      {timeIntervalOptions.map((interval, id) => (
        <ToggleButton
          className="d-flex align-items"
          style={{ width: "100px" }}
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
