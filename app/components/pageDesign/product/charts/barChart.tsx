import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(...registerables);

type BarChartProps = {
  labels: Array<string>;
  datasets: Array<{label:string,data:number[]}>;
};

export const BarChart = ({ labels, datasets }: BarChartProps) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label:datasets[0].label,
        backgroundColor: 'rgba(222, 222, 222, 1)',
        borderColor: 'rgba(222, 222, 222, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(222, 222, 222, 1)',
        hoverBorderColor: 'rgba(222, 222, 222, 1)',
        data: datasets[0].data,
      },

      {
        label:datasets[1].label,
        backgroundColor: 'rgba(17, 17, 17, 1)',
        borderColor: 'rgba(17, 17, 17, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(17, 17, 17, 1)',
        hoverBorderColor: 'rgba(17, 17, 17, 1)',
        data: datasets[1].data,
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
