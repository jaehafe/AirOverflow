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

import { Chart, Line } from 'react-chartjs-2';
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

function StationChart({ sortedDataItems }) {
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const labels = sortedDataItems?.map((item) => {
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
        label: '미세먼지(PM10) 농도',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        data: sortedDataItems?.map((item) => item.pm10Value),
      },
      {
        label: '초미세먼지(PM2.5) 농도',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: sortedDataItems?.map((item) => item.pm25Value),
        // type: 'line',
      },
    ],
  };

  const options = {
    responsive: true,
    // plugins: {
    //   legend: {
    //     position: 'top',
    //   },
    //   title: {
    //     display: false,
    //   },
    // },
    plugins: {
      title: {
        display: true,
        text: '미세먼지 현황',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: '단위 ㎍/㎥',
        },
      },
    },
  };

  return (
    <S.Container>
      {sortedDataItems.length > 0 ? (
        <Chart type="bar" data={data} options={options} />
      ) : (
        <EmptyData props={EmptyChartDataProps} />
      )}
    </S.Container>
  );
}

export default StationChart;
