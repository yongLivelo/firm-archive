import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import { ChartData, Chart as ChartJS } from "chart.js";
import { useRef, useState, useEffect, useContext } from "react";
import { PostContext } from "../Statistics";
import { Flow } from "@/interface/Flow";

export default function CashDistribution() {
  const chartRef = useRef<ChartJS<"pie"> | null>(null);
  const datas = useContext(PostContext) || [];
  const [data, setData] = useState<ChartData<"pie">>({
    labels: [],
    datasets: [],
  });
  const [type, setType] = useState<string>("Flow");

  /**
   * Render data based on flow (Revenue and Loss).
   */
  const renderFlow = () => {
    const counter = [0, 0]; // [Revenue, Loss]

    datas.forEach((row: { flow: string; amount: number }) => {
      if (row.flow === Flow.Expense) counter[1] += row.amount;
      if (row.flow === Flow.Sale) counter[0] += row.amount;
    });

    setData({
      labels: ["Sales", "Expenses"],
      datasets: [
        {
          data: counter,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    });
  };

  /**
   * Render data based on payment modes (Cash, BPI, Gcash).
   */
  const renderMode = () => {
    const counter = [0, 0, 0]; // [Cash, BPI, Gcash]

    datas.forEach((row: { mode: string; amount: number }) => {
      if (row.mode === "Cash") counter[0] += row.amount;
      if (row.mode === "BPI") counter[1] += row.amount;
      if (row.mode === "Gcash") counter[2] += row.amount;
    });

    setData({
      labels: ["Cash", "BPI", "Gcash"],
      datasets: [
        {
          data: counter,
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 49, 122, 1)",
          ],
          borderWidth: 1,
        },
      ],
    });
  };

  /**
   * Handle data rendering based on the selected type.
   */
  useEffect(() => {
    console.log(datas);
    if (type === "Flow") renderFlow();
    if (type === "Mode") renderMode();
  }, [type, datas]);

  const downloadChart = () => {
    try {
      if (chartRef.current) {
        const url = chartRef.current.toBase64Image();
        const link = document.createElement("a");
        link.href = url;
        link.download = "cash_distribution_chart.png";
        link.click();
      }
    } catch (error) {
      console.error("Failed to download chart", error);
    }
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
        <div
          style={{
            width: "100%",
            height: "400px",
            margin: "0 auto",
          }}
        >
          {data.labels?.length ? (
            <Pie ref={chartRef} data={data} options={options} />
          ) : (
            <h1>No data</h1>
          )}
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-wrap justify-content-between">
          <Button onClick={downloadChart}>Download</Button>
          <Controls type={type} setType={setType} />
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Toggle controls for chart type.
 */
interface ControlsProps {
  type: string;
  setType: (type: string) => void;
}

function Controls({ type, setType }: ControlsProps) {
  const types = ["Flow", "Mode"];

  return (
    <ButtonGroup>
      {types.map((option, index) => (
        <ToggleButton
          key={index}
          id={`type-${index}`}
          type="radio"
          variant={"primary"}
          value={option}
          checked={option === type}
          onChange={(e) => setType(e.currentTarget.value)}
        >
          {option}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
