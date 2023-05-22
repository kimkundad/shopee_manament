import React, { useEffect } from 'react';
import Chart from 'chart.js';


const ChartPage = () => {
  useEffect(() => {
    // Chart configuration object
    const chartConfig = {
      type: 'outlabeledPie',
      data: {
        labels: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'],
        datasets: [
          {
            backgroundColor: [
              '#FF3784',
              '#36A2EB',
              '#4BC0C0',
              '#F77825',
              '#9966FF',
            ],
            data: [1, 2, 3, 4, 5],
          },
        ],
      },
      options: {
        plugins: {
          legend: false,
          outlabels: {
            text: '%l %p',
            color: 'white',
            stretch: 35,
            font: {
              resizable: true,
              minSize: 12,
              maxSize: 18,
            },
          },
        },
      },
    };

    // Chart rendering logic
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, chartConfig);
  }, []);

  return <canvas id="myChart" width="400" height="400"></canvas>;
};

export default ChartPage;
