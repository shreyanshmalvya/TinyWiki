import axios from 'axios';
import React from 'react'
import './lineGraph.css'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';



const LineGraph = () => {
  ChartJS.register(...registerables);
  //declaring states
  const [showGraph, setShowGraph] = React.useState(false);
  const [label, setlabel] = React.useState([]);
  const [data, setdata] = React.useState([]);
  //fetching token from local storage
  const token = localStorage.getItem('token')
  //functions to assign data
  const searchDataFetch = async () => {
    const response = await axios.get('https://tinywiki-v1.herokuapp.com/data/search', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    const result = await response;
    setdata(result.data.count);
    setlabel(result.data.labels);
    setShowGraph(true);
  }

  const readDataFetch = async () => {
    const response = await axios.get('https://tinywiki-v1.herokuapp.com/data/read', {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    const result = await response;
    setdata(result.data.count);
    setlabel(result.data.labels);
    setShowGraph(true);
  };

  return (
    <div className='graphWrapper'>
      <div className="welcomeMessage">
        Welcome Admin
      </div>
      {
        showGraph ?
          <div>
            <Doughnut data={{
              labels: label,
              datasets: [{
                label: 'keywords Comparison',
                data: data,
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(86, 255, 137)',
                  'rgb(86, 255, 137)',
                  'rgb(255, 86, 156)',
                  'rgb(227, 86, 255)',
                  'rgb(106, 255, 86)',
                ],
                hoverOffset: 4
              }]
            }} />
          </div> :
          'Click any button to show graph'
      }
      <div className="buttonWrapper">
        <button onClick={() => searchDataFetch()}>Graph for Search</button>
        <button onClick={() => readDataFetch()}>Graph for Read</button>
      </div>
    </div>
  )
}

export default LineGraph;