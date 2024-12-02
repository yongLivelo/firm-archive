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
import { ChartData, Chart as ChartJS } from "chart.js/auto";
import { useRef, useState, useEffect, useContext } from "react";
import { PostContext } from "../Statistics";
import { Flow } from "@/interface/Flow";

ChartJS.register();

export default function CashDistribution() {
  const chartRef = useRef<ChartJS | any>(null);
  const datas = useContext(PostContext);
  const counter = [0, 0];
  const processData = datas?.map((row, i) => {
    if (row.flow === Flow.Expense) {
      counter[1]++;
    }

    if (row.flow === Flow.Sale) {
      counter[0]++;
    }
  });
  console.log(counter);
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
        data: [...counter],
        backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows resizing based on container
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const [type, setType] = useState<string>("Flow");

  // Trigger a resize when the component mounts or when the container size changes
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.resize();
    }
  }, []); // Empty dependency array ensures this runs once after mount

  return (
    <Card>
      <CardHeader>Cash Distribution</CardHeader>
      <CardBody>
        <div
          style={{
            width: "100%",
            height: "400px", // Fixed height to control aspect
            margin: "0 auto",
          }}
        >
          <Pie ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-wrap justify-content-between">
          <div>
            <Button onClick={download}>Download</Button>
          </div>
          <div>
            <Controls type={type} setType={setType} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

interface ControlsProps {
  type: string;
  setType: (interval: string) => void;
}

function Controls({ type, setType }: ControlsProps) {
  const types = ["Flow", "Mode"];

  return (
    <ButtonGroup>
      {types.map((radio, id) => (
        <ToggleButton
          key={id}
          id={`type-${id}`}
          type="radio"
          value={radio}
          checked={radio === type}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setType(e.currentTarget.value)
          }
        >
          {radio}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
