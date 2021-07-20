import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import axios from 'axios';

  

const Crimes = () => {
   
    const [chartData, setChartData]  = useState({});
    const [date, setDate] = useState('2021-03');
    const [force, setForce] = useState('leicestershire');
    const [forces, setForces] = useState([]);

    
    const Chart = () => {

        let chartData = [];
        
        axios.get(`https://data.police.uk/api/crimes-no-location?category=all-crime&force=${force}&date=${date}`)
        .then(res => {
        for(const dataObj of res.data ){
            if (chartData.some(e => e.label === dataObj.category)) {

                const elem = (element) => element.label === dataObj.category;
                let index = chartData.findIndex(elem);
                let countNo = chartData[index].count+1;
                chartData[index] = {label:dataObj.category, count:countNo}
              }
            else{
            chartData.push(({label:dataObj.category, count:1}));
            }
            

        }
            
        let label = [];
        let count = [];
        for(const d of chartData){
            label.push(d.label);
            count.push(d.count);
        }
        

        setChartData({
            labels: label,
            datasets: [{
                                         label: 'Times happened',
                                         data: count,
                                         backgroundColor: [
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                             'rgba(255, 99, 132, 0.2)',
                                             'rgba(54, 162, 235, 0.2)',
                                             'rgba(255, 206, 86, 0.2)',
                                             'rgba(75, 192, 192, 0.2)',
                                             'rgba(153, 102, 255, 0.2)',
                                             'rgba(255, 159, 64, 0.2)',
                                         ],
                                         borderColor: [
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                             'rgba(255, 99, 132, 1)',
                                             'rgba(54, 162, 235, 1)',
                                             'rgba(255, 206, 86, 1)',
                                             'rgba(75, 192, 192, 1)',
                                             'rgba(153, 102, 255, 1)',
                                             'rgba(255, 159, 64, 1)',
                                         ],
                                         borderWidth: 1
                                     }]
        });
        
    })
    .catch(err =>{
        console.log(err);
    })
    
}

useEffect(() => {

    const fetchData = async () => {
        const result = await axios(`https://data.police.uk/api/forces`);
   
        setForces(result.data);
      };
   
      fetchData();

    Chart();
  }, [date, force]);

    
    return ( 
        <div>
            <h1 className="title">This is page for crimes in your county for that date</h1>


            <div className="search">
                <h3 className="title">Search will load automatically</h3>

                <form>
                    <label className="label">Write date here (YYYY-MM)</label>
                    <input 
                    className="input"
                    type="text"
                    maxLength='7'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    />
                    
                    <label className="label">Select Police Force</label>

                    <select
                        className="input"
                        value={force}
                        onChange={(e) => setForce(e.target.value)}
                    >
						
                        {forces.map((value) => (
							<option style={{color: 'black'}} value={value.id} key={value.id}>
								{value.name}
							</option>
						))}
                        
                    </select>
                </form>
            </div>


<div>
              <h1>Crimes Chart</h1>
              <div>
                  <Bar
                    data={chartData}
                    options={{
                        responsive:true,
                        title: { text: "Units", display: true },
                        scales:{
                            yAxes:[ {
                                ticks:{
                                    beginAtZero: true
                                }
                            }
                            ]
                        }
                    }}
                  />
              </div>
          </div>
        </div>
    )}
 
export default Crimes;