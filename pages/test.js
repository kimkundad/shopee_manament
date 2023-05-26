import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartPage = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const pieLabelLine = {
      id: "pieLabelLine",
      afterDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;
    
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y, startAngle, endAngle } = datapoint.getProps(["x", "y", "startAngle", "endAngle"]);
    
            const radius = datapoint.outerRadius;
            const midAngle = (startAngle + endAngle) / 2;
            const x1 = Math.cos(midAngle) * radius + datapoint.x;
            const y1 = Math.sin(midAngle) * radius + datapoint.y;
    
            const xLine = x1 >= width / 2 ? x1 + 15 : x1 - 15;
            const yLine = y1 >= height / 2 ? y1 + 15 : y1 - 15;
            const extraLine = x1 >= width / 2 ? 15 : -15;
    
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine + extraLine, yLine);
            ctx.strokeStyle = dataset.borderColor[index];
            ctx.stroke();
    
            const textWidth = ctx.measureText(chart.data.labels[index]).width;
            ctx.font = "12px Arial";
    
            const textXPosition = x1 >= width / 2 ? "left" : "right";
            const plushFivePx = x1 >= width / 2 ? 5 : -5;
            ctx.textAlign = textXPosition;
            ctx.textBaseline = "middle";
            ctx.fillStyle = dataset.borderColor[index];
            ctx.fillText(
              chart.data.labels[index],
              xLine + extraLine + plushFivePx,
              yLine
            );
          });
        });
      },
    };
    
    const config = {
      type: "pie",
      data,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [pieLabelLine],
    };

    const chart = new Chart(chartRef.current, config);

    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, []);

  const chartRefa = useRef(null);

  useEffect(() => {
    const dataa = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Suna"],
      datasets: [
        {
          label: "Weekly Sales",
          data: [18, 12, 6, 9, 12, 3, 9],
          backgroundColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderColor: [
            "rgba(255, 26, 104, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(0, 0, 0, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    const pieLabelLinea = {
      id: "pieLabelLinea",
      afterDraw(chart, args, options) {
        const {
          ctx,
          chartArea: { top, bottom, left, right, width, height },
        } = chart;
    
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((datapoint, index) => {
            const { x, y, startAngle, endAngle } = datapoint.getProps(["x", "y", "startAngle", "endAngle"]);
    
            const radius = datapoint.outerRadius;
            const midAngle = (startAngle + endAngle) / 2;
            const x1 = Math.cos(midAngle) * radius + datapoint.x;
            const y1 = Math.sin(midAngle) * radius + datapoint.y;
    
            const xLine = x1 >= width / 2 ? x1 + 15 : x1 - 15;
            const yLine = y1 >= height / 2 ? y1 + 15 : y1 - 15;
            const extraLine = x1 >= width / 2 ? 15 : -15;
    
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(xLine, yLine);
            ctx.lineTo(xLine + extraLine, yLine);
            ctx.strokeStyle = dataset.borderColor[index];
            ctx.stroke();
    
            const textWidth = ctx.measureText(chart.data.labels[index]).width;
            ctx.font = "12px Arial";
    
            const textXPosition = x1 >= width / 2 ? "left" : "right";
            const plushFivePx = x1 >= width / 2 ? 5 : -5;
            ctx.textAlign = textXPosition;
            ctx.textBaseline = "middle";
            ctx.fillStyle = dataset.borderColor[index];
            ctx.fillText(
              chart.data.labels[index],
              xLine + extraLine + plushFivePx,
              yLine
            );
          });
        });
      },
    };
    
    const configa = {
      type: "pie",
      dataa,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [pieLabelLinea],
    };

    const chart = new Chart(chartRefa.current, configa);

    // Clean up the chart when the component unmounts
    return () => {
      chart.destroy();
    };
  }, []);
  return (
    <>
    <div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
    <div>
    <div className="chartCard">
      <div className="chartBox">
        <canvas ref={chartRefa}></canvas>
      </div>
    </div>
  </div>
  </>
  );
};

export default ChartPage;
