import React from "react";
import Chart from 'react-apexcharts';

const convertedLocalDate = (data, hours = false) => {
    if (hours) {
      return new Date(data).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return new Date(data).toLocaleDateString('ru', {
      month: 'short',
      day: 'numeric',
    });
  };

  function ForecastChart({forecast}) {
    console.log(forecast.list[0]);

    if(forecast !== null && forecast !== undefined){
        const list =  forecast.list.slice(0, 24);
    const weatherTemp =list.map(function(item){
        return item.main.temp;
   } );
    const hours = list.map(function(item){
        return item.dt_txt.substring(10,16);
   } );

    const data = {
        series: [
          {
            name: 't °C',
            data: weatherTemp,
          },
        ],
        options: {
          chart: {
            type: 'area',
            height: 'auto',
            parentHeightOffset: 0,
            zoom: {
              enabled: false,
            },
            toolbar: {
              show: false,
            },
          },
          fill: {
            colors: ['#fff'],
            type: 'gradient',
          },
    
          dataLabels: {
            enabled: true,
            textAnchor: 'middle',
            offsetY: -5,
            style: {
              fontSize: '12px',
              colors: ['#333', '#999'],
            },
            background: {
              enabled: false,
            },
          },
          stroke: {
            curve: 'smooth',
            colors: ['#46c2ff'],
            width: 2,
          },
    
          legend: {
            show: false,
          },
          grid: {
            show: true,
          },
          tooltip: {
            x: {
              show: false,
            },
    
            fixed: {
              enabled: true,
            },
          },
          xaxis: {
            type: 'numeric ',
            categories: hours,
            crosshairs: {
              show: false,
            },
            tooltip: {
              enabled: false,
            },
          },
          yaxis: {
            show: true,
            max: (weatherTemp) => {
              return weatherTemp + 5;
            },
            min: (weatherTemp) => {
              return weatherTemp - 1;
            },
            labels: {
              offsetX: -10,
            },
          },
        },
      };
      return (
        <div className='ChartWeather'>
          <h3>Тemprature °C</h3>
          <Chart options={data.options} series={data.series} type='area' height={350} />
        </div>
      );
    }else{
        console.log(error);
    }
    
  };

  export default ForecastChart;