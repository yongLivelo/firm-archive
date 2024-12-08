import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useContext, useEffect, useRef, useState } from "react";
import { PostContext } from "../Statistics";
import { Flow } from "@/interface/Flow";
ChartJS.register();

export default function CashFlow() {
  const chartRef = useRef<ChartJS | null | any>(null);
  const datas = useContext(PostContext);
  const [data, setData] = useState<any>({
    labels: [], // Default empty labels
    datasets: [
      {
        label: "Amount",
        data: [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  }); // Initialize with empty chart data
  const download = () => {
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const a = document.createElement("a");
      a.href = url;
      a.download = "chart.png";
      a.click();
    }
  };

  const [timeInterval, setTimeInterval] = useState<string>("1m");

  const groupDataByInterval = (interval: string) => {
    if (!datas) return;
    const groupByTime: { [key: string]: number } = datas?.reduce(
      (acc: { [key: string]: number }, entry) => {
        let key: string;
        switch (interval) {
          case "1m":
            key = entry.date.slice(0, 16); // Minute level grouping
            break;
          case "1h":
            key = entry.date.slice(0, 13); // Hour level grouping
            break;
          case "1d":
            key = entry.date.slice(0, 10); // Day level grouping
            break;
          default:
            key = entry.date.slice(0, 10); // Default to day level grouping
            break;
        }

        acc[key] =
          (acc[key] || 0) +
          (entry.flow === Flow.Sale ? entry.amount : -entry.amount);
        return acc;
      },
      {}
    );

    const sortedGroupByTime = Object.entries(groupByTime).sort(
      ([keyA], [keyB]) => keyA.localeCompare(keyB) // Sorting by key (date string)
    );

    const sortedData = sortedGroupByTime.map(([key, value]) => ({
      date: key,
      amount: value,
    }));

    return {
      labels: sortedData.map((item) => item.date),
      datasets: [
        {
          label: "Amount",
          data: sortedData.map((item) => item.amount),
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.4,
        },
      ],
    };
  };

  useEffect(() => {
    if (datas) {
      const newData = groupDataByInterval(timeInterval);
      setData(newData);
    }
  }, [datas, timeInterval]);
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
        <div style={{ height: "500px" }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-wrap justify-content-between">
          <div>
            <Button onClick={download}>Download</Button>
          </div>
          <div>
            <Controls
              timeInterval={timeInterval}
              setTimeInterval={setTimeInterval}
            />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

interface ControlsProps {
  timeInterval: string;
  setTimeInterval: (interval: string) => void;
}

function Controls({ timeInterval, setTimeInterval }: ControlsProps) {
  const timeIntervalOptions = ["1m", "1h", "1d"];

  return (
    <ButtonGroup className="d-flex justify-content-between flex-wrap">
      {timeIntervalOptions.map((radio, id) => (
        <ToggleButton
          style={{ width: "80px" }}
          key={id}
          id={`timeInterval-${id}`}
          type="radio"
          value={radio}
          checked={radio === timeInterval}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTimeInterval(e.currentTarget.value)
          }
        >
          {radio}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
