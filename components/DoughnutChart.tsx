"use client"

import {Chart as ChartJS,ArcElement,Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(ArcElement,Tooltip, Legend);

const DoughnutChart = ({accounts}:DoughnutChartProps)=>{
    
    const datas = {
        datasets:[
            {
                label: 'Banks',
                data:[1250, 500, 250],
                backgroundColor: ['#0747b6','#2265d8','#2f91fa']
            }
        ],
        labels: ['Bank of','Chase','Wells Fargo']
    }
    return  <Doughnut 
    
    data={datas} 
    options={
        {
            cutout: ' 60%',
            plugins: {
                legend:{
                    display:false,
                }
            }
        }
    }
    
    />
    
}

export default DoughnutChart
