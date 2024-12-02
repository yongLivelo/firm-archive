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

ChartJS.register();

export default function CashFlow() {
  const chartRef = useRef<ChartJS | null | any>(null);

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
        tension: 0.4,
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

  const [timeInterval, setTimeInterval] = useState<string>("1s");

  useEffect(() => {
    console.log(timeInterval);
  }, [timeInterval]);

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
  const timeIntervalOptions = [
    "1s",
    "15m",
    "1h",
    "4h",
    "1d",
    "3d",
    "1mo",
    "6mo",
    "1y",
  ];

  return (
    <ButtonGroup>
      {timeIntervalOptions.map((radio, id) => (
        <ToggleButton
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
