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
import { useEffect, useRef, useState } from "react";

ChartJS.register();

function CashFlow() {
  // Define chartRef with correct type for Chart.js instance
  const chartRef = useRef<ChartJS | null | any>(null);

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

  const timeIntervalOptions = ["m", "h", "d", "mo", "y"];

  const [timeInterval, setTimeInterval] = useState<string>("m");

  useEffect(() => {
    console.log(timeInterval);
  }, [timeInterval]);
  return (
    <Card>
      <CardHeader>Cash Flow</CardHeader>
      <CardBody>
        <div style={{ height: "700px" }}>
          <Line ref={chartRef} data={data} options={options} />
        </div>
      </CardBody>
      <CardFooter>
        <div className="d-flex flex-wrap justify-content-between">
          <div>
            <Button onClick={download}>Download</Button>
          </div>
          <div>
            <ButtonGroup>
              {timeIntervalOptions.map((radio, id) => (
                <ToggleButton
                  key={id}
                  id={`timeInterval-${id}`}
                  type="radio"
                  value={`${radio}`}
                  checked={radio === timeInterval}
                  onChange={(e: any) => {
                    setTimeInterval(`${e.currentTarget.value}`);
                  }}
                >
                  1{radio}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CashFlow;
