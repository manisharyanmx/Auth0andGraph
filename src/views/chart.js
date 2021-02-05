import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const URL = "https://run.mocky.io/v3/cc4c350b-1f11-42a0-a1aa-f8593eafeb1e"

const Chart = () => {

  const [data, setData] = useState([])

const fetchData = async() => {
  return await fetch(`${URL}`)
  .then(res => res.json())
  .then(datafromURL => setData(datafromURL))
} 

    useEffect(()=>{
      fetchData()
    },[])

    let xAxis = [];
    let yAxis = [];
      data.forEach(d=>{
        let dateStr = d.date;
        let D = new Date(dateStr);
        let finalDate = `${D.getMonth() + 1}/${D.getFullYear()}`
         
        console.log("year is ",finalDate)
        
        yAxis.push(d.price)
        xAxis.push(finalDate)
      })
  
  return (
      <div className="cardContainer">
        <ReactApexChart options={{
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'IPC indicator (Índice de Precios y Cotizaciones)',
            align: 'center'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: xAxis,
            title: {
              text: 'Date'
            }
          },
          yaxis: {
            title: {
              text: 'Price'
            },
          },
        }} 
          series={[{
            name: "Price",
            data: yAxis
          }]} 
          type="line" height={500} width={600} />
      </div>
  )
}    
export default Chart;