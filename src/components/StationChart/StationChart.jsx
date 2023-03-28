import React from 'react';
import * as S from './StationChart.style';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import EmptyData from '../EmptyData/EmptyData';
import { EmptyChartDataProps } from '../../utils/EmptyDataUtils';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

function StationChart({ stationDataItems }) {
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const labels = stationDataItems?.map((item) => {
    const dateTimeString = item.dataTime; // "2023-03-28 15:00"
    const [dateString, timeString] = dateTimeString.split(' '); // ["2023-03-28", "15:00"]
    const date = new Date(dateString);
    const hours = timeString.split(':')[0];
    return `${date.getMonth() + 1}/${date.getDate()} ${hours}시`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: '미세먼지',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: stationDataItems?.map((item) => item.pm10Value),
      },
      {
        label: 'KhaiGrade',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: stationDataItems?.map((item) => item.khaiGrade),
      },
    ],
  };

  return (
    <S.Container>
      {stationDataItems ? (
        <Chart type="bar" data={data} />
      ) : (
        <EmptyData props={EmptyChartDataProps} />
      )}
    </S.Container>
  );
}

export default StationChart;
