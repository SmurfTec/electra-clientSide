import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

type BarChartProps = {
  labels: Array<string>;
  datasets: { label: string; data: number[] };
};

export const BarChart = ({ labels, datasets }: BarChartProps) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: datasets.label,
        backgroundColor: '#383837',
        borderColor: '#383837',
        borderWidth: 1,
        hoverBackgroundColor: '#383837',
        hoverBorderColor: '#383837',
        data: datasets.data,
      },
    ],
  };
  return (
    <Bar
      style={{ width: '100%' }}
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};
